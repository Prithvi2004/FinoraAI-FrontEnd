import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { AuthPage } from "@/components/ui/auth-page";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Welcome back to Finora!");
        navigate("/dashboard");
      } else {
        if (!name.trim()) {
          toast.error("Please enter your name");
          setLoading(false);
          return;
        }
        await signup(email, password, name);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <AuthPage
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      loading={loading}
      handleSubmit={handleSubmit}
      handleGoogleLogin={handleGoogleLogin}
      onBackToHome={handleBackToHome}
    />
  );
};

export default Auth;
