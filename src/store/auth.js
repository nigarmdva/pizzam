import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  shortUrl: null,
  qrImage: null,

  login: (user, token) => { 
    set({ user, token });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/home";
  },
    
}));


export const useQrCodes = create((set) => ({
  qrCodes: [],
  setQrCodesImg: (qrCodes) => set({ qrCodes }),
}));

export default useAuthStore;
