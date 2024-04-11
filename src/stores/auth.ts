import { create } from "zustand";
import { User } from "../models";

interface Data {
  user: User;
  authenticated: boolean;
}

interface Actions {
  signin: (user: User) => void;
  signout: () => void;
}

const userInitialState: User = {
  id: "",
  customer_id: "",
  username: "",
  email: "",
  age: 0,
  role: "user",
  image_url: "",
  verified_email: false,
  created_at: "",
  updated_at: "",
};

export const useAuthStore = create<Data & Actions>((set, get) => ({
  user: userInitialState,
  authenticated: false,
  signin: (user: User) => set({ ...get(), user, authenticated: true }),
  signout: () =>
    set({ ...get(), user: userInitialState, authenticated: false }),
}));
