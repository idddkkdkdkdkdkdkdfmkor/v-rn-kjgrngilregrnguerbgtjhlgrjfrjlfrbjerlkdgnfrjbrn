export type PortalRole = 'client' | 'superadmin';

export interface PortalSession {
  email: string;
  name: string;
  role: PortalRole;
  institution?: string;
}

const SESSION_KEY = 'idcraft_portal_session';

const SUPERADMIN_EMAILS = new Set([
  'admin@idcraftindia.com',
  'superadmin@idcraftindia.com',
]);

export function isSuperAdminEmail(email: string): boolean {
  return SUPERADMIN_EMAILS.has(email.toLowerCase().trim());
}

export function saveSession(session: PortalSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): PortalSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function createSessionFromLogin(
  email: string,
  institution?: string
): PortalSession {
  const normalized = email.toLowerCase().trim();
  const isSuperAdmin = isSuperAdminEmail(normalized);

  return {
    email: normalized,
    name: isSuperAdmin ? 'Admin' : institution?.split(' ')[0] || 'Client',
    role: isSuperAdmin ? 'superadmin' : 'client',
    institution: isSuperAdmin ? 'IDCraft India HQ' : institution,
  };
}
