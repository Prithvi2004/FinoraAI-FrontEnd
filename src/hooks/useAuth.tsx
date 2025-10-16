import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import { GoogleAuthProvider } from "firebase/auth";

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified?: boolean;
  photoURL?: string;
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
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;
  hasProfile: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "",
          emailVerified: firebaseUser.emailVerified,
          photoURL: firebaseUser.photoURL || undefined,
        };
        setUser(userData);
        // Load profile from Firestore
        try {
          const profileDoc = await getDoc(
            doc(db, "userProfiles", firebaseUser.uid)
          );
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as UserProfile);
          } else {
            setProfile(null);
          }
        } catch {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveUserDetails = async (firebaseUser: FirebaseUser) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    await setDoc(
      userRef,
      {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || null,
        emailVerified: firebaseUser.emailVerified,
        lastLoginAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      await saveUserDetails(firebaseUser);
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "",
        emailVerified: firebaseUser.emailVerified,
        photoURL: firebaseUser.photoURL || undefined,
      });
      // Load profile
      const profileDoc = await getDoc(
        doc(db, "userProfiles", firebaseUser.uid)
      );
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as UserProfile);
      } else {
        setProfile(null);
      }
      navigate("/");
    } catch (error: any) {
      throw new Error(error.message || "Authentication failed");
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: name });
      await saveUserDetails(firebaseUser);
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name,
        emailVerified: firebaseUser.emailVerified,
        photoURL: firebaseUser.photoURL || undefined,
      });
      // Create empty profile
      await setDoc(doc(db, "userProfiles", firebaseUser.uid), {});
      setProfile(null);
      navigate("/");
    } catch (error: any) {
      throw new Error(error.message || "Signup failed");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      await saveUserDetails(firebaseUser);
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "",
        emailVerified: firebaseUser.emailVerified,
        photoURL: firebaseUser.photoURL || undefined,
      });
      // Create profile if not exists
      const profileDoc = await getDoc(
        doc(db, "userProfiles", firebaseUser.uid)
      );
      if (!profileDoc.exists()) {
        await setDoc(doc(db, "userProfiles", firebaseUser.uid), {});
        setProfile(null);
      } else {
        setProfile(profileDoc.data() as UserProfile);
      }
      navigate("/");
    } catch (error: any) {
      throw new Error(error.message || "Google login failed");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
    navigate("/");
  };

  const saveProfile = async (newProfile: UserProfile) => {
    if (!user) throw new Error("User not authenticated");
    await setDoc(doc(db, "userProfiles", user.id), newProfile);
    setProfile(newProfile);
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        signup,
        loginWithGoogle,
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
