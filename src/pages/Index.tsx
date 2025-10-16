import { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { FeatureOrbit } from "@/components/FeatureOrbit";
import { OnboardingModal } from "@/components/OnboardingModal";
import { Button } from "@/components/ui/button";
import { Lock, Fingerprint } from "lucide-react";

const Index = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

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
            Finora
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary group"
            >
              <Fingerprint className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              <Lock className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              <span>Secure Login</span>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection onBuildProfile={() => setIsOnboardingOpen(true)} />

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
              We train on patterns, never your identity. Your financial data is encrypted, 
              anonymized, and yours alone.
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
          <p>© 2025 Finora. Your Financial Digital Twin.</p>
        </div>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
};

export default Index;
