import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { HeroSection } from "@/components/HeroSection";
import { FeatureOrbit } from "@/components/FeatureOrbit";
import { ProfileModal } from "@/components/ProfileModal";
import { Button } from "@/components/ui/button";
import { Lock, Fingerprint, User, LogOut } from "lucide-react";

const Index = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user, logout, profile, hasProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient-primary"
          >
            Finnora
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {user ? (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center gap-3 px-4 py-2.5 glass-panel rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

                  {/* Avatar with Status Indicator */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center glow-cyan ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col">
                    <span className="font-semibold text group-hover:text-primary transition-colors duration-300">
                      {user.name}
                    </span>
                  </div>
                </motion.div>

                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-foreground hover:text-destructive hover:bg-destructive/10 group transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2 text-foreground group-hover:text-destructive transition-colors duration-300" />
                  <span className="transition-colors duration-300">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => navigate("/auth")}
                className="text-foreground hover:text-primary hover:bg-primary/10 group transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2 text-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="transition-colors duration-300">
                  Secure Login
                </span>
              </Button>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        onBuildProfile={() => {
          if (user) {
            setIsProfileModalOpen(true);
          } else {
            navigate("/auth");
          }
        }}
        isAuthenticated={!!user}
        hasProfile={hasProfile}
      />

      {/* Features Section */}
      <FeatureOrbit />

      {/* Trust & Privacy Section */}
      <section className="py-20 px-4 border-t border-primary/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-12 text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Zero-Data Policy</h3>
            <p className="text-lg text-muted-foreground mb-6">
              We train on patterns, never your identity. Your financial data is
              encrypted, anonymized, and yours alone.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-medium">Bank-grade encryption</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium">SOC 2 Type II certified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Finnora. Your Financial Digital Twin.</p>
        </div>
      </footer>

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          isEditing={hasProfile}
        />
      )}
    </div>
  );
};

export default Index;
