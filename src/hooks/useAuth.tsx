import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserProfile {
  // Income & Expenses
  income: string;
  expenses: {
    rent: string;
    groceries: string;
    health: string;
    miscellaneous: string;
    entertainment: string;
    custom: { name: string; amount: string }[];
  };
  // Liabilities
  loans: {
    amount: string;
    duration: string;
    interestRate: string;
  }[];
  // Goals
  goals: {
    type: string;
    targetAmount: string;
    timeline: string;
  }[];
  // Risk & Investments
  riskAppetite: "low" | "medium" | "high";
  investmentPreferences: string[];
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  saveProfile: (profile: UserProfile) => void;
  hasProfile: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("finora_user");
    const storedProfile = localStorage.getItem("finora_profile");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const storedUsers = JSON.parse(localStorage.getItem("finora_users") || "[]");
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };

    setUser(userData);
    localStorage.setItem("finora_user", JSON.stringify(userData));
    
    // Load profile if exists
    const userProfile = localStorage.getItem(`finora_profile_${foundUser.id}`);
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      setProfile(parsedProfile);
      localStorage.setItem("finora_profile", userProfile);
    }

    navigate("/");
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    const storedUsers = JSON.parse(localStorage.getItem("finora_users") || "[]");
    
    if (storedUsers.find((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Math.random().toString(36).substring(7),
      email,
      password,
      name,
    };

    storedUsers.push(newUser);
    localStorage.setItem("finora_users", JSON.stringify(storedUsers));

    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    setUser(userData);
    localStorage.setItem("finora_user", JSON.stringify(userData));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("finora_user");
    localStorage.removeItem("finora_profile");
    navigate("/");
  };

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem("finora_profile", JSON.stringify(newProfile));
    if (user) {
      localStorage.setItem(`finora_profile_${user.id}`, JSON.stringify(newProfile));
    }
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        signup,
        logout,
        saveProfile,
        hasProfile: !!profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
