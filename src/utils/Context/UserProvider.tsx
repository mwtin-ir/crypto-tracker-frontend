// contexts/UserContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import toast from "react-hot-toast";
export interface ITransaction {
  coin: string;
  amount: number;
  price: number;
  type: "buy" | "sell";
  date: Date;
}

export interface IAsset {
  coin: string;
  amount: number;
}

export interface IWallet {
  balance: number;
  assets: IAsset[];
}

export interface IUserProfile {
  verified: boolean;
  joinDate: Date;
  notifications?: boolean;
}

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password?: string;
  provider: "local" | "google" | "github";
  googleId?: string;
  avatar?: string;
  githubId?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  wallet: IWallet;
  transactions: ITransaction[];
  profile?: IUserProfile;
  likedCoins: string[];
  bookmarkedCoins: string[];
  addTransaction: (tx: ITransaction) => Promise<void>;
  reload: () => Promise<IUser>;
}
interface IUserContext {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3120/api/users/me/profile",
        {
          withCredentials: true,
        }
      );
      setUser(res.data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3120/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.data.user);
      toast.success("با موفقیت وارد شدید");
    } catch (error) {
      let message = "خطا در ورود کاربر";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    const res = await axios.post(
      "http://localhost:3120/api/users/logout",
      {},
      { withCredentials: true }
    );
    return res.status;
    redirect("/");
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

// هوک برای استفاده راحت
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
