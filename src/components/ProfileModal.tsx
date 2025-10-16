import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Plus, X, Home, GraduationCap, Plane, Shield, Car, Building } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const goalTypes = [
  { id: "home", label: "Buying a Home", icon: Home },
  { id: "education", label: "Child's Education", icon: GraduationCap },
  { id: "vacation", label: "Dream Vacation", icon: Plane },
  { id: "safety", label: "Emergency Fund", icon: Shield },
  { id: "car", label: "Buying a Car", icon: Car },
  { id: "business", label: "Start Business", icon: Building },
];

const investmentOptions = [
  "Gold",
  "Stocks", 
  "Mutual Funds",
  "ETFs",
  "Government Bonds",
  "Real Estate",
  "Cryptocurrency",
];

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { saveProfile } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Income & Expenses
  const [income, setIncome] = useState("");
  const [rent, setRent] = useState("");
  const [groceries, setGroceries] = useState("");
  const [health, setHealth] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [customExpenses, setCustomExpenses] = useState<{ name: string; amount: string }[]>([]);

  // Step 2: Liabilities
  const [loans, setLoans] = useState<{ amount: string; duration: string; interestRate: string }[]>([]);

  // Step 3: Goals
  const [goals, setGoals] = useState<{ type: string; targetAmount: string; timeline: string }[]>([]);

  // Step 4: Risk Appetite
  const [riskAppetite, setRiskAppetite] = useState<"low" | "medium" | "high">("medium");

  // Step 5: Investment Preferences
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>([]);
  const [otherInvestment, setOtherInvestment] = useState("");

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Validation
    if (!income) {
      toast.error("Please enter your monthly income");
      setStep(1);
      return;
    }

    const profileData = {
      income,
      expenses: {
        rent,
        groceries,
        health,
        miscellaneous,
        entertainment,
        custom: customExpenses,
      },
      loans,
      goals,
      riskAppetite,
      investmentPreferences: otherInvestment 
        ? [...investmentPreferences, otherInvestment]
        : investmentPreferences,
    };

    saveProfile(profileData);
    toast.success("Profile saved successfully!");
  };

  const addCustomExpense = () => {
    setCustomExpenses([...customExpenses, { name: "", amount: "" }]);
  };

  const removeCustomExpense = (index: number) => {
    setCustomExpenses(customExpenses.filter((_, i) => i !== index));
  };

  const updateCustomExpense = (index: number, field: "name" | "amount", value: string) => {
    const updated = [...customExpenses];
    updated[index][field] = value;
    setCustomExpenses(updated);
  };

  const addLoan = () => {
    setLoans([...loans, { amount: "", duration: "", interestRate: "" }]);
  };

  const removeLoan = (index: number) => {
    setLoans(loans.filter((_, i) => i !== index));
  };

  const updateLoan = (index: number, field: keyof typeof loans[0], value: string) => {
    const updated = [...loans];
    updated[index][field] = value;
    setLoans(updated);
  };

  const addGoal = () => {
    setGoals([...goals, { type: "", targetAmount: "", timeline: "" }]);
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const updateGoal = (index: number, field: keyof typeof goals[0], value: string) => {
    const updated = [...goals];
    updated[index][field] = value;
    setGoals(updated);
  };

  const toggleInvestment = (option: string) => {
    setInvestmentPreferences(prev =>
      prev.includes(option)
        ? prev.filter(p => p !== option)
        : [...prev, option]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-primary/20 max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="h-1 bg-muted sticky top-0 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Income & Expenses */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Income & Expenses</h2>
                  <p className="text-muted-foreground">Let's understand your cash flow</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="income">Monthly Income (₹) *</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="65,000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="bg-input border-primary/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rent">Rent (₹)</Label>
                      <Input
                        id="rent"
                        type="number"
                        placeholder="15,000"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        className="bg-input border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groceries">Groceries (₹)</Label>
                      <Input
                        id="groceries"
                        type="number"
                        placeholder="8,000"
                        value={groceries}
                        onChange={(e) => setGroceries(e.target.value)}
                        className="bg-input border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="health">Health (₹)</Label>
                      <Input
                        id="health"
                        type="number"
                        placeholder="3,000"
                        value={health}
                        onChange={(e) => setHealth(e.target.value)}
                        className="bg-input border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="miscellaneous">Miscellaneous (₹)</Label>
                      <Input
                        id="miscellaneous"
                        type="number"
                        placeholder="5,000"
                        value={miscellaneous}
                        onChange={(e) => setMiscellaneous(e.target.value)}
                        className="bg-input border-primary/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="entertainment">Entertainment (₹)</Label>
                      <Input
                        id="entertainment"
                        type="number"
                        placeholder="4,000"
                        value={entertainment}
                        onChange={(e) => setEntertainment(e.target.value)}
                        className="bg-input border-primary/30"
                      />
                    </div>
                  </div>

                  {customExpenses.map((expense, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Category name"
                        value={expense.name}
                        onChange={(e) => updateCustomExpense(index, "name", e.target.value)}
                        className="bg-input border-primary/30"
                      />
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={(e) => updateCustomExpense(index, "amount", e.target.value)}
                        className="bg-input border-primary/30"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCustomExpense(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomExpense}
                    className="w-full border-primary/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Category
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Liabilities */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Liabilities / Loans</h2>
                  <p className="text-muted-foreground">Tell us about your outstanding debts</p>
                </div>

                <div className="space-y-4">
                  {loans.map((loan, index) => (
                    <div key={index} className="glass-panel p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="font-semibold">Loan {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLoan(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label>Amount (₹)</Label>
                          <Input
                            type="number"
                            placeholder="1,00,000"
                            value={loan.amount}
                            onChange={(e) => updateLoan(index, "amount", e.target.value)}
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <div>
                          <Label>Duration (years)</Label>
                          <Input
                            type="number"
                            placeholder="3"
                            value={loan.duration}
                            onChange={(e) => updateLoan(index, "duration", e.target.value)}
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <div>
                          <Label>Interest Rate (%)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="8.5"
                            value={loan.interestRate}
                            onChange={(e) => updateLoan(index, "interestRate", e.target.value)}
                            className="bg-input border-primary/30"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLoan}
                    className="w-full border-primary/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Loan
                  </Button>

                  {loans.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-8">
                      No loans? Great! Skip to the next step.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Life Goals</h2>
                  <p className="text-muted-foreground">What are you working towards?</p>
                </div>

                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="glass-panel p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="font-semibold">Goal {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeGoal(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>Goal Type</Label>
                        <select
                          value={goal.type}
                          onChange={(e) => updateGoal(index, "type", e.target.value)}
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-input text-sm"
                        >
                          <option value="">Select a goal</option>
                          {goalTypes.map((gt) => (
                            <option key={gt.id} value={gt.label}>
                              {gt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Target Amount (₹)</Label>
                          <Input
                            type="number"
                            placeholder="10,00,000"
                            value={goal.targetAmount}
                            onChange={(e) => updateGoal(index, "targetAmount", e.target.value)}
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <div>
                          <Label>Timeline (years)</Label>
                          <Input
                            type="number"
                            placeholder="3"
                            value={goal.timeline}
                            onChange={(e) => updateGoal(index, "timeline", e.target.value)}
                            className="bg-input border-primary/30"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGoal}
                    className="w-full border-primary/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Risk Appetite */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Risk Appetite</h2>
                  <p className="text-muted-foreground">How comfortable are you with investment risk?</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {(["low", "medium", "high"] as const).map((risk) => (
                    <button
                      key={risk}
                      type="button"
                      onClick={() => setRiskAppetite(risk)}
                      className={`
                        glass-panel p-6 rounded-xl text-center transition-all duration-300
                        ${riskAppetite === risk ? "ring-2 ring-primary glow-cyan scale-105" : "hover:scale-105"}
                      `}
                    >
                      <div className="text-2xl font-bold mb-2 capitalize">{risk}</div>
                      <p className="text-sm text-muted-foreground">
                        {risk === "low" && "Preserve capital, minimal risk"}
                        {risk === "medium" && "Balanced growth & safety"}
                        {risk === "high" && "Maximize returns, accept volatility"}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Investment Preferences */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">Investment Preferences</h2>
                  <p className="text-muted-foreground">Where would you like to invest?</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {investmentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleInvestment(option)}
                      className={`
                        glass-panel p-4 rounded-lg text-left transition-all duration-300
                        ${investmentPreferences.includes(option) 
                          ? "ring-2 ring-primary bg-primary/10" 
                          : "hover:bg-primary/5"}
                      `}
                    >
                      <span className="font-semibold">{option}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <Label htmlFor="other">Other (specify)</Label>
                  <Input
                    id="other"
                    placeholder="e.g., Art, Collectibles..."
                    value={otherInvestment}
                    onChange={(e) => setOtherInvestment(e.target.value)}
                    className="bg-input border-primary/30"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
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
              {step === totalSteps ? "Save & Continue" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
