import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface AuthenticatedAdminUser {
  id: string;
  email: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  roles: string[];
  permissions: string[];
  status: string | null;
  last_login_at: string | null;
  must_change_password?: boolean;
}

export interface ProfileStoreStateType {
  appUser: AuthenticatedAdminUser | null;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated?: boolean) => void;
  setAppUser: (user: AuthenticatedAdminUser | null) => void;
  clearProfile: () => void;
}

const AUTH_STORAGE_KEY = "app-auth-storage";

interface AuthPersistedSnapshot {
  appIsLoggedIn?: boolean;
  appRefreshToken?: string | null;
  appSession?: { refresh_expires_at: string | null } | null;
}

const readAuthPersistedState = (): AuthPersistedSnapshot | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) ?? sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: AuthPersistedSnapshot } | AuthPersistedSnapshot;
    if (typeof parsed === "object" && parsed !== null && "state" in parsed && parsed.state) {
      return parsed.state;
    }
    return parsed as AuthPersistedSnapshot;
  } catch {
    return null;
  }
};

const isAuthSessionValid = (): boolean => {
  const auth = readAuthPersistedState();
  if (!auth?.appIsLoggedIn || !auth?.appRefreshToken) return false;
  if (auth.appSession?.refresh_expires_at) {
    const exp = new Date(auth.appSession.refresh_expires_at).getTime();
    if (Number.isFinite(exp) && exp <= Date.now()) return false;
  }
  return true;
};

const baseState = {
  appUser: null as AuthenticatedAdminUser | null,
  _hasHydrated: false,
};

const useProfileStore = create<ProfileStoreStateType>()(
  devtools(
    persist(
      (set) => ({
        ...baseState,
        setHasHydrated: (hasHydrated = true) => set(() => ({ _hasHydrated: hasHydrated })),
        setAppUser: (user: AuthenticatedAdminUser | null) => set(() => ({ appUser: user })),
        clearProfile: () => set(() => ({ appUser: null })),
      }),
      {
        name: "app-profile-storage",
        storage: createJSONStorage(() => ({
          getItem: (name) => {
            if (typeof window === "undefined") return null;
            return localStorage.getItem(name) ?? sessionStorage.getItem(name);
          },
          setItem: (name, value) => {
            if (typeof window === "undefined") return;
            // Mirror auth store: persistSession=true → localStorage, else sessionStorage
            if (localStorage.getItem(AUTH_STORAGE_KEY)) {
              localStorage.setItem(name, value);
              sessionStorage.removeItem(name);
            } else {
              sessionStorage.setItem(name, value);
              localStorage.removeItem(name);
            }
          },
          removeItem: (name) => {
            if (typeof window === "undefined") return;
            localStorage.removeItem(name);
            sessionStorage.removeItem(name);
          },
        })),
        partialize: (state) => ({ appUser: state.appUser }),
        merge: (persistedState, currentState) => {
          // If auth session is no longer valid, clear profile on hydration
          if (!isAuthSessionValid()) {
            return { ...currentState, appUser: null };
          }
          const storageState =
            typeof persistedState === "object" &&
              persistedState !== null &&
              "state" in persistedState &&
              typeof (persistedState as { state?: unknown }).state === "object"
              ? (persistedState as { state: Partial<ProfileStoreStateType> }).state
              : (persistedState as Partial<ProfileStoreStateType> | null);
          return {
            ...currentState,
            appUser: storageState?.appUser ?? null,
          };
        },
        onRehydrateStorage: () => {
          return (state: ProfileStoreStateType | undefined, error: unknown) => {
            if (error) {
              useProfileStore.persist.clearStorage();
            }
            (state ?? useProfileStore.getState()).setHasHydrated(true);
          };
        },
      },
    ),
  ),
);

export default useProfileStore;
