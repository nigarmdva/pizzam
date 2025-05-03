import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuth: false,
      shortUrl: null,
      qrImage: null,

      login: (user, accessToken) => {
        set({
          isAuth: true,
          user,
          accessToken,
        });
      },
      logout: () => {
        set({ isAuth: false, user: null, accessToken: null });
        window.location.href = "/";
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        isAuth: state.isAuth,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
