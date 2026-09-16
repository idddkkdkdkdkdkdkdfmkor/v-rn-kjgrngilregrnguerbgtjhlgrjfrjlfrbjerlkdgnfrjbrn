import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/forms.body');
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // user restored from session, if token not in memory we wait for user to re-auth
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get Google access token');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Creates a dedicated Google Form for collecting bulk student or employee ID data
 * using the Google Forms API v1
 */
export const createGoogleFormForIDCards = async (
  accessToken: string,
  institutionName: string,
  category: string
): Promise<{ formId: string; responderUri: string; editUri: string }> => {
  const formTitle = `${institutionName || 'Institution'} - ID Card Information Collection Form`;

  // Step 1: Create empty form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
        documentTitle: formTitle,
      },
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to create Google Form');
  }

  const formData = await createRes.json();
  const formId = formData.formId;
  const responderUri = formData.responderUri;

  // Step 2: Add standard ID card fields to the form (batchUpdate)
  const batchUpdateUrl = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
  const requests = [
    {
      createItem: {
        item: {
          title: 'Full Name (as to appear on ID Card)',
          description: 'Enter your official name in capital letters',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false },
            },
          },
        },
        location: { index: 0 },
      },
    },
    {
      createItem: {
        item: {
          title: category === 'Education' ? 'Admission / Roll Number' : 'Employee ID Number',
          description: 'Your unique identifier assigned by the organization',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false },
            },
          },
        },
        location: { index: 1 },
      },
    },
    {
      createItem: {
        item: {
          title: category === 'Education' ? 'Class & Section / Degree' : 'Department & Designation',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false },
            },
          },
        },
        location: { index: 2 },
      },
    },
    {
      createItem: {
        item: {
          title: 'Blood Group',
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: 'RADIO',
                options: [
                  { value: 'A+' },
                  { value: 'A-' },
                  { value: 'B+' },
                  { value: 'B-' },
                  { value: 'O+' },
                  { value: 'O-' },
                  { value: 'AB+' },
                  { value: 'AB-' },
                ],
              },
            },
          },
        },
        location: { index: 3 },
      },
    },
    {
      createItem: {
        item: {
          title: 'Emergency Contact Mobile Number',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false },
            },
          },
        },
        location: { index: 4 },
      },
    },
    {
      createItem: {
        item: {
          title: 'Photo Drive Link or Instructions',
          description: 'Provide a link to your passport size photograph with plain white background',
          questionItem: {
            question: {
              required: false,
              textQuestion: { paragraph: true },
            },
          },
        },
        location: { index: 5 },
      },
    },
  ];

  await fetch(batchUpdateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests,
      includeFormInResponse: false,
    }),
  });

  return {
    formId,
    responderUri: responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`,
    editUri: `https://docs.google.com/forms/d/${formId}/edit`,
  };
};

/**
 * Fetches user contacts from Google Contacts (People API)
 */
export const fetchGoogleContacts = async (
  accessToken: string
): Promise<Array<{ name: string; email: string; phone: string; organization: string }>> => {
  const url =
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations&pageSize=25';

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to fetch contacts');
  }

  const data = await res.json();
  const connections = data.connections || [];

  return connections.map((person: any) => {
    const name = person.names?.[0]?.displayName || 'Unnamed Contact';
    const email = person.emailAddresses?.[0]?.value || '';
    const phone = person.phoneNumbers?.[0]?.value || '';
    const organization = person.organizations?.[0]?.name || '';

    return { name, email, phone, organization };
  });
};
