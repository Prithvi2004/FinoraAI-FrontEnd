import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Plus,
  X,
  Home,
  GraduationCap,
  Plane,
  Shield,
  Car,
  Building,
  Sparkles,
  TrendingUp,
  Target,
  Wallet,
  PiggyBank,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
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

export const ProfileModal = ({
  isOpen,
  onClose,
  isEditing = false,
}: ProfileModalProps) => {
  const { saveProfile, profile } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Income & Expenses
  const [income, setIncome] = useState("");
  const [rent, setRent] = useState("");
  const [groceries, setGroceries] = useState("");
  const [health, setHealth] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [customExpenses, setCustomExpenses] = useState<
    { id: string; name: string; amount: string }[]
  >([]);

  // Step 2: Liabilities
  const [loans, setLoans] = useState<
    { amount: string; duration: string; interestRate: string }[]
  >([]);

  // Step 3: Goals
  const [goals, setGoals] = useState<
    {
      type: string;
      customType?: string;
      targetAmount: string;
      timeline: string;
    }[]
  >([]);

  // Step 4: Risk Appetite
  const [riskAppetite, setRiskAppetite] = useState<"low" | "medium" | "high">(
    "medium"
  );

  // Step 5: Investment Preferences
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>(
    []
  );
  const [otherInvestment, setOtherInvestment] = useState("");

  // Load existing profile data when editing
  useEffect(() => {
    if (isEditing && profile) {
      setIncome(profile.income || "");
      setRent(profile.expenses?.rent || "");
      setGroceries(profile.expenses?.groceries || "");
      setHealth(profile.expenses?.health || "");
      setMiscellaneous(profile.expenses?.miscellaneous || "");
      setEntertainment(profile.expenses?.entertainment || "");
      setCustomExpenses(
        (profile.expenses?.custom || []).map((exp: any) => ({
          id: exp.id || Date.now().toString() + Math.random(),
          name: exp.name || "",
          amount: exp.amount || "",
        }))
      );
      setLoans(profile.loans || []);
      setGoals(profile.goals || []);
      setRiskAppetite(profile.riskAppetite || "medium");
      setInvestmentPreferences(profile.investmentPreferences || []);
    }
  }, [isEditing, profile, isOpen]);

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

  const handleSubmit = async () => {
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

    try {
      await saveProfile(profileData);
      toast.success(
        isEditing
          ? "Profile updated successfully!"
          : "Profile created successfully! 🎉"
      );
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    }
  };

  const addCustomExpense = () => {
    setCustomExpenses([
      ...customExpenses,
      { id: Date.now().toString() + Math.random(), name: "", amount: "" },
    ]);
  };

  const removeCustomExpense = (index: number) => {
    setCustomExpenses(customExpenses.filter((_, i) => i !== index));
  };

  const updateCustomExpense = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    console.log("updateCustomExpense called:", { index, field, value });
    const updated = customExpenses.map((expense, i) =>
      i === index ? { ...expense, [field]: value } : expense
    );
    console.log("Updated expenses:", updated);
    setCustomExpenses(updated);
  };

  const addLoan = () => {
    setLoans([...loans, { amount: "", duration: "", interestRate: "" }]);
  };

  const removeLoan = (index: number) => {
    setLoans(loans.filter((_, i) => i !== index));
  };

  const updateLoan = (
    index: number,
    field: keyof (typeof loans)[0],
    value: string
  ) => {
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

  const updateGoal = (
    index: number,
    field: keyof (typeof goals)[0],
    value: string
  ) => {
    const updated = [...goals];
    updated[index][field] = value;
    setGoals(updated);
  };

  const toggleInvestment = (option: string) => {
    setInvestmentPreferences((prev) =>
      prev.includes(option)
        ? prev.filter((p) => p !== option)
        : [...prev, option]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-primary/20 max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Animated Header with Progress */}
        <div className="relative bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-8 border-b border-primary/10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">
                {isEditing ? "Edit Your Profile" : "Build Your Financial Twin"}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {step === 1 && "💰 Income & Spending"}
              {step === 2 && "💳 Debts & Liabilities"}
              {step === 3 && "🎯 Life Goals"}
              {step === 4 && "📊 Risk Profile"}
              {step === 5 && "🚀 Investment Style"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </motion.div>

          {/* Creative Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Income & Expenses - REDESIGNED */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Monthly Income - Featured */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-full bg-primary/20">
                        <Wallet className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="income" className="text-lg font-bold">
                          Monthly Income
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Your total monthly take-home salary
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="income"
                        type="number"
                        placeholder="65,000"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        onWheel={(e) => e.currentTarget.blur()}
                        className="pl-10 h-14 text-2xl font-bold bg-background/50 border-primary/30 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Monthly Expenses - Card Grid */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">Monthly Expenses</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        id: "rent",
                        label: "🏠 Rent",
                        value: rent,
                        setter: setRent,
                        placeholder: "15,000",
                      },
                      {
                        id: "groceries",
                        label: "🛒 Groceries",
                        value: groceries,
                        setter: setGroceries,
                        placeholder: "8,000",
                      },
                      {
                        id: "health",
                        label: "🏥 Healthcare",
                        value: health,
                        setter: setHealth,
                        placeholder: "3,000",
                      },
                      {
                        id: "entertainment",
                        label: "🎬 Entertainment",
                        value: entertainment,
                        setter: setEntertainment,
                        placeholder: "4,000",
                      },
                      {
                        id: "miscellaneous",
                        label: "📦 Miscellaneous",
                        value: miscellaneous,
                        setter: setMiscellaneous,
                        placeholder: "5,000",
                      },
                    ].map((expense) => (
                      <motion.div
                        key={expense.id}
                        whileHover={{ scale: 1.02 }}
                        className="glass-panel p-4 rounded-xl hover:border-primary/50 transition-all"
                      >
                        <Label
                          htmlFor={expense.id}
                          className="text-sm font-semibold mb-2 block"
                        >
                          {expense.label}
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₹
                          </span>
                          <Input
                            id={expense.id}
                            type="number"
                            placeholder={expense.placeholder}
                            value={expense.value}
                            onChange={(e) => expense.setter(e.target.value)}
                            onWheel={(e) => e.currentTarget.blur()}
                            className="pl-8 bg-background/50 border-primary/20"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Custom Expenses */}
                {customExpenses.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Custom Categories
                    </h4>
                    {customExpenses.map((expense, index) => (
                      <div key={expense.id} className="flex gap-2 items-center">
                        <Input
                          placeholder="Category name"
                          value={expense.name}
                          onChange={(e) =>
                            updateCustomExpense(index, "name", e.target.value)
                          }
                          className="bg-background/50 border-primary/20 flex-1"
                        />
                        <div className="relative flex-[1.5] min-w-[180px]">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
                            ₹
                          </span>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="Amount"
                            value={expense.amount}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^\d]/g,
                                ""
                              );
                              updateCustomExpense(index, "amount", value);
                            }}
                            className="pl-8 bg-background/50 border-primary/20"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCustomExpense(index)}
                          className="hover:bg-destructive/20 hover:text-destructive shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomExpense}
                  className="w-full border-dashed border-2 border-primary/30 font-semibold transition-all duration-200 shadow-sm alt-hover"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Category
                </Button>
              </motion.div>
            )}

            {/* Step 2: Liabilities - REDESIGNED */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Track your debts to plan better repayment strategies
                  </p>
                </div>

                <div className="space-y-4">
                  {loans.map((loan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-panel p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-destructive/20">
                            <CreditCard className="w-4 h-4 text-destructive" />
                          </div>
                          <Label className="text-lg font-semibold">
                            Loan {index + 1}
                          </Label>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLoan(index)}
                          className="hover:bg-destructive/20 hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1">
                            Loan Amount
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              type="number"
                              placeholder="1,00,000"
                              value={loan.amount}
                              onChange={(e) =>
                                updateLoan(index, "amount", e.target.value)
                              }
                              onWheel={(e) => e.currentTarget.blur()}
                              className="pl-8 bg-background/50 border-primary/20"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1">
                            Duration
                          </Label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="3"
                              value={loan.duration}
                              onChange={(e) =>
                                updateLoan(index, "duration", e.target.value)
                              }
                              onWheel={(e) => e.currentTarget.blur()}
                              className="bg-background/50 border-primary/20"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              yrs
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1">
                            Interest Rate
                          </Label>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="8.5"
                              value={loan.interestRate}
                              onChange={(e) =>
                                updateLoan(
                                  index,
                                  "interestRate",
                                  e.target.value
                                )
                              }
                              onWheel={(e) => e.currentTarget.blur()}
                              className="bg-background/50 border-primary/20"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {loans.length === 0 && (
                    <div className="text-center py-12 glass-panel rounded-2xl border-2 border-dashed border-primary/20">
                      <PiggyBank className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
                      <p className="text-muted-foreground mb-2">
                        No loans? That's great!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Click below if you have any debts to track
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLoan}
                    className="w-full border-dashed border-2 border-primary/30 font-semibold transition-all duration-200 shadow-sm alt-hover alt2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Loan
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Goals - REDESIGNED */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Define your financial aspirations and timelines
                  </p>
                </div>

                <div className="space-y-4">
                  {goals.map((goal, index) => {
                    const selectedGoalType = goalTypes.find(
                      (gt) => gt.label === goal.type
                    );
                    const GoalIcon = selectedGoalType?.icon || Target;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-primary/20">
                              <GoalIcon className="w-4 h-4 text-primary" />
                            </div>
                            <Label className="text-lg font-semibold">
                              Goal {index + 1}
                            </Label>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGoal(index)}
                            className="hover:bg-destructive/20 hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground mb-1">
                              What's your goal?
                            </Label>
                            <select
                              value={goal.type}
                              onChange={(e) => {
                                updateGoal(index, "type", e.target.value);
                                if (e.target.value !== "Other") {
                                  updateGoal(index, "customType", "");
                                }
                              }}
                              className="w-full h-11 px-4 py-2 rounded-lg border border-primary/20 bg-background/50 text-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                              <option value="">Select a goal</option>
                              {goalTypes.map((gt) => (
                                <option key={gt.id} value={gt.label}>
                                  {gt.label}
                                </option>
                              ))}
                              <option value="Other">
                                Other (enter your own)
                              </option>
                            </select>
                            {goal.type === "Other" && (
                              <Input
                                className="mt-2"
                                placeholder="Enter your goal type"
                                value={goal.customType || ""}
                                onChange={(e) =>
                                  updateGoal(
                                    index,
                                    "customType",
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs text-muted-foreground mb-1">
                                Target Amount
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  ₹
                                </span>
                                <Input
                                  type="number"
                                  placeholder="10,00,000"
                                  value={goal.targetAmount}
                                  onChange={(e) =>
                                    updateGoal(
                                      index,
                                      "targetAmount",
                                      e.target.value
                                    )
                                  }
                                  onWheel={(e) => e.currentTarget.blur()}
                                  className="pl-8 bg-background/50 border-primary/20"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground mb-1">
                                Timeline
                              </Label>
                              <div className="relative">
                                <Input
                                  type="number"
                                  placeholder="3"
                                  value={goal.timeline}
                                  onChange={(e) =>
                                    updateGoal(
                                      index,
                                      "timeline",
                                      e.target.value
                                    )
                                  }
                                  onWheel={(e) => e.currentTarget.blur()}
                                  className="bg-background/50 border-primary/20"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                  yrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {goals.length === 0 && (
                    <div className="text-center py-12 glass-panel rounded-2xl border-2 border-dashed border-primary/20">
                      <Target className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
                      <p className="text-muted-foreground mb-2">
                        No goals yet?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Start planning your financial future
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGoal}
                    className="w-full border-dashed border-2 border-primary/30 font-semibold transition-all duration-200 shadow-sm alt-hover"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Risk Appetite - REDESIGNED */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <p className="text-muted-foreground">
                    Choose your investment comfort level
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(["low", "medium", "high"] as const).map((risk) => (
                    <motion.button
                      key={risk}
                      type="button"
                      onClick={() => setRiskAppetite(risk)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        glass-panel p-8 rounded-2xl text-center transition-all duration-300 relative overflow-hidden
                        ${
                          riskAppetite === risk
                            ? "ring-2 ring-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg shadow-primary/20"
                            : "hover:border-primary/50"
                        }
                      `}
                    >
                      {riskAppetite === risk && (
                        <motion.div
                          layoutId="selected-risk"
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            risk === "low"
                              ? "bg-green-500/20"
                              : risk === "medium"
                              ? "bg-yellow-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {risk === "low" && (
                            <Shield className="w-8 h-8 text-green-500" />
                          )}
                          {risk === "medium" && (
                            <TrendingUp className="w-8 h-8 text-yellow-500" />
                          )}
                          {risk === "high" && (
                            <Sparkles className="w-8 h-8 text-red-500" />
                          )}
                        </div>
                        <div className="text-3xl font-bold mb-3 capitalize">
                          {risk}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {risk === "low" &&
                            "Preserve capital with minimal risk. Stable, secure investments."}
                          {risk === "medium" &&
                            "Balanced approach. Moderate risk for steady growth."}
                          {risk === "high" &&
                            "Maximize returns. Comfortable with market volatility."}
                        </p>
                        {riskAppetite === risk && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <span className="text-white text-xs">✓</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Investment Preferences - REDESIGNED */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Select all investment types that interest you
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {investmentOptions.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => toggleInvestment(option)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        glass-panel p-6 rounded-xl text-left transition-all duration-300 relative
                        ${
                          investmentPreferences.includes(option)
                            ? "ring-2 ring-primary bg-primary/10 border-primary"
                            : "hover:bg-primary/5 hover:border-primary/50"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{option}</span>
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            investmentPreferences.includes(option)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {investmentPreferences.includes(option) && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="pt-4">
                  <Label
                    htmlFor="other"
                    className="text-sm font-semibold mb-2 block"
                  >
                    Other Investment Types
                  </Label>
                  <Input
                    id="other"
                    placeholder="e.g., Art, Collectibles, Precious Metals..."
                    value={otherInvestment}
                    onChange={(e) => setOtherInvestment(e.target.value)}
                    className="bg-background/50 border-primary/30"
                  />
                </div>

                {investmentPreferences.length === 0 && !otherInvestment && (
                  <div className="text-center py-6 glass-panel rounded-xl border-2 border-dashed border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      Select at least one investment preference
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - REDESIGNED */}
          <div className="flex gap-4 mt-10 pt-6 border-t border-primary/10">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 border-primary/30 font-semibold transition-all duration-200 shadow-sm alt-hover alt2"
              >
                ← Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground group font-semibold text-lg btn-gradient-opposite"
              disabled={step === 1 && !income}
            >
              {step === totalSteps ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isEditing ? "Update Profile" : "Complete Setup"}
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
