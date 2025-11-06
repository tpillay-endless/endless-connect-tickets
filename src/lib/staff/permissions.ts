// Shared role and permission helpers for staff accounts.

export const STAFF_ROLES = ['superadmin', 'admin', 'host', 'staff'] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

const ROLE_GROUPS = {
  manageAttendees: ['superadmin', 'admin'],
  deleteAttendee: ['superadmin', 'admin'],
  bulkDeleteAttendees: ['superadmin'],
  importExportTickets: ['superadmin', 'admin'],
  sendTickets: ['superadmin', 'admin'],
  rebuildTickets: ['superadmin'],
  rewards: ['superadmin', 'admin', 'host'],
  manualRegistration: ['superadmin', 'admin', 'staff'],
  checkIn: ['superadmin', 'admin', 'staff'],
  viewAttendeeList: ['superadmin', 'admin', 'staff'],
} as const satisfies Record<string, readonly StaffRole[]>;

const ROLE_GROUP_SETS: Record<keyof typeof ROLE_GROUPS, Set<StaffRole>> = Object.fromEntries(
  Object.entries(ROLE_GROUPS).map(([key, roles]) => [key as keyof typeof ROLE_GROUPS, new Set(roles)])
) as Record<keyof typeof ROLE_GROUPS, Set<StaffRole>>;

export type StaffPermission = keyof typeof ROLE_GROUPS;

export const STAFF_PERMISSION_GROUPS = ROLE_GROUPS;

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  superadmin: 'Super Admin',
  admin: 'Admin',
  host: 'Host',
  staff: 'Staff',
};

export function rolesWithPermissions(...permissions: StaffPermission[]): ReadonlyArray<StaffRole> {
  const set = new Set<StaffRole>();
  permissions.forEach((permission) => {
    STAFF_PERMISSION_GROUPS[permission].forEach((role) => set.add(role));
  });
  return Array.from(set) as ReadonlyArray<StaffRole>;
}

export function roleHasPermission(role: StaffRole | null | undefined, permission: StaffPermission) {
  if (!role) return false;
  return ROLE_GROUP_SETS[permission].has(role);
}

export function getRoleCapabilities(role: StaffRole | null | undefined) {
  return {
    canAccessAttendees: roleHasPermission(role, 'manageAttendees'),
    canDeleteAttendee: roleHasPermission(role, 'deleteAttendee'),
    canBulkDeleteAttendees: roleHasPermission(role, 'bulkDeleteAttendees'),
    canImportExport: roleHasPermission(role, 'importExportTickets'),
    canSendTickets: roleHasPermission(role, 'sendTickets'),
    canRebuildTickets: roleHasPermission(role, 'rebuildTickets'),
    canAccessRewards: roleHasPermission(role, 'rewards'),
    canUseManualRegistration: roleHasPermission(role, 'manualRegistration'),
    canAccessCheckIn: roleHasPermission(role, 'checkIn'),
    canViewAttendeeList: roleHasPermission(role, 'viewAttendeeList'),
  };
}

export function isStaffRole(value: string): value is StaffRole {
  return (STAFF_ROLES as readonly string[]).includes(value);
}

export const STAFF_ATTENDEE_PAGE_ROLES = rolesWithPermissions('manageAttendees', 'checkIn');
