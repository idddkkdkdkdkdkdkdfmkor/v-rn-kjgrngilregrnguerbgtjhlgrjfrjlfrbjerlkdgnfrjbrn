import React, { useState } from 'react';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Download,
  Database,
  Users,
  ShieldCheck,
  FileCheck,
  ExternalLink,
  LogIn,
  Layers,
  AlertCircle,
} from 'lucide-react';
import {
  googleSignIn,
  getAccessToken,
  createGoogleFormForIDCards,
  fetchGoogleContacts,
  auth,
} from '../lib/firebaseAuth';

export const BulkDataCollection: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [createdFormUrl, setCreatedFormUrl] = useState<string | null>(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [formInstitutionName, setFormInstitutionName] = useState('Delhi Public School');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [contactsCount, setContactsCount] = useState<number | null>(null);

  const handleGoogleConnect = async () => {
    try {
      setIsAuthorizing(true);
      setStatusMessage(null);
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setStatusMessage('Connected with Google Workspace! You can now generate forms and sync contacts.');
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Connection failed: ' + (err.message || 'Please check popup settings.'));
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleCreateGoogleForm = async () => {
    try {
      setIsCreatingForm(true);
      setStatusMessage(null);
      let token = await getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        token = res?.accessToken || null;
        if (res) setUser(res.user);
      }
      if (!token) {
        throw new Error('Google authentication required to create Google Form');
      }

      const res = await createGoogleFormForIDCards(token, formInstitutionName, 'Student');
      setCreatedFormUrl(res.responderUri);
      setStatusMessage('Google Form generated in your Google Drive! Students/staff can now submit photos & details.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Form creation error: ' + (err.message || 'Please verify Google Workspace permissions.'));
    } finally {
      setIsCreatingForm(false);
    }
  };

  const handleImportContacts = async () => {
    try {
      setStatusMessage('Querying Google Contacts API...');
      let token = await getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        token = res?.accessToken || null;
        if (res) setUser(res.user);
      }
      if (!token) {
        throw new Error('Google authentication required to access contacts');
      }

      const contacts = await fetchGoogleContacts(token);
      setContactsCount(contacts.length);
      setStatusMessage(`Successfully imported ${contacts.length} institutional contacts!`);
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Contacts fetch error: ' + (err.message || 'Could not access contacts.'));
    }
  };

  const handleDownloadCsvTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Roll_No,Full_Name,Father_Name,Class_Or_Department,Section_Or_Designation,Blood_Group,Emergency_Phone,Address,Photo_Filename\n' +
      'DPS-101,Jagjeet Singh,Gurdeep Singh,Class X,Sec A,B +ve,9811234567,"DLF Phase 4, Gurugram",jagjeet_singh.jpg\n' +
      'DPS-102,Ananya Patel,Rajesh Patel,Class X,Sec A,O +ve,9822334455,"Sector 56, Gurugram",ananya_patel.jpg\n' +
      'DPS-103,Rohan Verma,Manoj Verma,Class X,Sec B,AB +ve,9877889900,"Sohna Road, Gurugram",rohan_verma.jpg\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'IDCRAFT_Institutional_Roster_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint border border-brand-mint text-brand-dark text-xs font-bold uppercase tracking-wider mb-3">
            <Database className="w-3.5 h-3.5 text-brand-primary" />
            Seamless Onboarding Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How We Collect 1,000+ Student & Staff Records in Hours
          </h2>
          <p className="mt-3 text-base text-slate-600">
            No more manual typing or mismatched photos. Choose between instant Excel/CSV roster
            uploads or auto-generate a custom Google Form for direct student/parent photo submissions.
          </p>
        </div>

        {/* 3 Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Method 1: Excel / CSV Roster */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Excel / CSV Roster</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Download our pre-structured Excel template. Enter student/staff IDs, blood groups,
                addresses, and map photo filenames (e.g. <code>DPS-101.jpg</code>).
              </p>

              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/70 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Supports ERP exports (Fedena, Entab, SAP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automatic spelling & duplicate detection</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadCsvTemplate}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel Template</span>
            </button>
          </div>

          {/* Method 2: Google Forms Auto-Generation (Google Workspace Integration) */}
          <div className="p-6 rounded-2xl bg-brand-mint/70 border border-brand-mint flex flex-col justify-between ring-1 ring-brand-primary/20">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center mb-4 shadow-sm shadow-brand-primary/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-mint text-blue-800 text-[10px] font-bold uppercase mb-1">
                Google Workspace Powered
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Auto-Generate Google Form</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Generate an official, branded Google Form linked to your Google Account. Share the
                link with parents or staff via WhatsApp to collect photos and details straight into
                Google Sheets!
              </p>

              {/* Institution Name Input */}
              <div className="mt-4">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Institution Name for Form Header
                </label>
                <input
                  type="text"
                  value={formInstitutionName}
                  onChange={(e) => setFormInstitutionName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-brand-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint0"
                />
              </div>

              {createdFormUrl && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-between">
                  <span className="font-semibold truncate">Form is Live!</span>
                  <a
                    href={createdFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold flex items-center gap-1 shrink-0 ml-2"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={handleCreateGoogleForm}
                disabled={isCreatingForm}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-md shadow-brand-primary/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCreatingForm ? 'Creating Form...' : 'Generate Google Form Now'}</span>
              </button>
            </div>
          </div>

          {/* Method 3: Google Contacts & ERP Sync */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Sync Google Contacts</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Import staff directories directly from Google Workspace Contacts API to eliminate
                repetitive data entry for teachers, doctors, and executive teams.
              </p>

              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/70 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Direct read-only Google Contacts API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Syncs email, phone & designation automatically</span>
                </div>
              </div>

              {contactsCount !== null && (
                <div className="mt-3 p-2 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold">
                  Found {contactsCount} contacts in your directory.
                </div>
              )}
            </div>

            <button
              onClick={handleImportContacts}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span>Import Staff from Contacts</span>
            </button>
          </div>
        </div>

        {/* Status Message Notification Bar */}
        {statusMessage && (
          <div className="max-w-xl mx-auto p-3 rounded-xl bg-brand-mint border border-brand-mint text-xs text-blue-900 text-center font-medium shadow-xs">
            {statusMessage}
          </div>
        )}
      </div>
    </section>
  );
};
