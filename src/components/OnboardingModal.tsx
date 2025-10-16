import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, Sparkles, Home, GraduationCap, Plane, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const goals = [
  { id: "home", label: "Home", icon: Home, color: "from-blue-500 to-cyan-500" },
  { id: "education", label: "Education", icon: GraduationCap, color: "from-purple-500 to-pink-500" },
  { id: "freedom", label: "Freedom", icon: Plane, color: "from-yellow-500 to-orange-500" },
  { id: "safety", label: "Safety Net", icon: Shield, color: "from-green-500 to-emerald-500" },
];

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [riskLevel, setRiskLevel] = useState([50]);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step - would normally save profile
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-primary/20 max-w-2xl p-0 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Income */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2">What lands in your account each month?</h2>
                <p className="text-muted-foreground mb-8">Let's understand your financial foundation</p>

                <div className="space-y-4">
                  <Label htmlFor="income" className="text-lg">Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="65,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="text-2xl h-14 bg-input border-primary/30 focus:border-primary"
                  />
                  {income && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-primary"
                    >
                      Based on your city, that's top 18% 🎯
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2">What future are we building?</h2>
                <p className="text-muted-foreground mb-8">Select your financial goals</p>

                <div className="grid grid-cols-2 gap-4">
                  {goals.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = selectedGoals.includes(goal.id);

                    return (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`
                          glass-panel rounded-xl p-6 text-left transition-all duration-300
                          ${isSelected ? "ring-2 ring-primary glow-cyan scale-105" : "hover:scale-105"}
                        `}
                      >
                        <div className={`
                          w-12 h-12 rounded-lg bg-gradient-to-br ${goal.color}
                          flex items-center justify-center mb-4
                        `}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{goal.label}</h3>
                        {isSelected && (
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            Selected
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Risk Profile */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2">What's your investment personality?</h2>
                <p className="text-muted-foreground mb-8">Let's find your comfort zone</p>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Preserve</span>
                      <span className="text-sm text-muted-foreground">Accelerate</span>
                    </div>
                    <Slider
                      value={riskLevel}
                      onValueChange={setRiskLevel}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="glass-panel rounded-xl p-6">
                    <h4 className="font-semibold mb-2">AI-Simulated Outcome</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Based on your risk level: {riskLevel[0]}%
                    </p>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-lg font-semibold text-primary">
                        Projected: ₹{Math.round((65000 * 12 * 10 * (1 + riskLevel[0] / 100)) / 100000)}L in 10 years
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan"
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-4">Finora Understands You</h2>
                <p className="text-xl text-muted-foreground mb-2">AI Confidence Score</p>
                <p className="text-6xl font-bold text-gradient-primary mb-8">92%</p>

                <div className="glass-panel rounded-xl p-6 mb-8 text-left">
                  <h4 className="font-semibold mb-4">Your Financial Digital Twin</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Income: ₹{income}/month</p>
                    <p>• Goals: {selectedGoals.length} selected</p>
                    <p>• Risk Profile: {riskLevel[0]}% aggressive</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">
                  Ready to activate your personalized investment strategy?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-primary/30"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground group"
              disabled={step === 1 && !income}
            >
              {step === totalSteps ? "Lock & Launch" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
