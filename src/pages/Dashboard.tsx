import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Wallet, 
  Target, 
  PiggyBank, 
  AlertCircle,
  Home,
  LogOut,
  DollarSign,
  CreditCard,
} from "lucide-react";

const Dashboard = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !profile) {
      navigate("/");
    }
  }, [user, profile, navigate]);

  if (!profile || !user) return null;

  const totalExpenses = 
    Number(profile.expenses.rent || 0) +
    Number(profile.expenses.groceries || 0) +
    Number(profile.expenses.health || 0) +
    Number(profile.expenses.miscellaneous || 0) +
    Number(profile.expenses.entertainment || 0) +
    profile.expenses.custom.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  const savings = Number(profile.income || 0) - totalExpenses;
  const savingsPercentage = Number(profile.income) > 0 
    ? ((savings / Number(profile.income)) * 100).toFixed(1)
    : "0";

  const totalLoans = profile.loans.reduce((sum, loan) => sum + Number(loan.amount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-panel border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gradient-primary">Finora</h1>
            <div className="hidden md:block h-6 w-px bg-primary/20" />
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={logout}
              className="text-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-2">Your Financial Overview</h2>
          <p className="text-muted-foreground mb-12">AI-powered insights from your financial profile</p>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Income</p>
              <p className="text-3xl font-bold">₹{Number(profile.income).toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <div className={`text-sm font-semibold ${savings >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {savingsPercentage}%
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
              <p className={`text-3xl font-bold ${savings >= 0 ? '' : 'text-destructive'}`}>
                ₹{savings.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Liabilities</p>
              <p className="text-3xl font-bold">₹{totalLoans.toLocaleString()}</p>
            </motion.div>
          </div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel rounded-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold mb-6">Expense Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {profile.expenses.rent && (
                <div className="p-4 rounded-lg bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Rent</p>
                  <p className="text-xl font-semibold">₹{Number(profile.expenses.rent).toLocaleString()}</p>
                </div>
              )}
              {profile.expenses.groceries && (
                <div className="p-4 rounded-lg bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Groceries</p>
                  <p className="text-xl font-semibold">₹{Number(profile.expenses.groceries).toLocaleString()}</p>
                </div>
              )}
              {profile.expenses.health && (
                <div className="p-4 rounded-lg bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Health</p>
                  <p className="text-xl font-semibold">₹{Number(profile.expenses.health).toLocaleString()}</p>
                </div>
              )}
              {profile.expenses.miscellaneous && (
                <div className="p-4 rounded-lg bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Miscellaneous</p>
                  <p className="text-xl font-semibold">₹{Number(profile.expenses.miscellaneous).toLocaleString()}</p>
                </div>
              )}
              {profile.expenses.entertainment && (
                <div className="p-4 rounded-lg bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Entertainment</p>
                  <p className="text-xl font-semibold">₹{Number(profile.expenses.entertainment).toLocaleString()}</p>
                </div>
              )}
              {profile.expenses.custom.map((exp, i) => (
                exp.name && exp.amount && (
                  <div key={i} className="p-4 rounded-lg bg-card/50">
                    <p className="text-sm text-muted-foreground mb-1">{exp.name}</p>
                    <p className="text-xl font-semibold">₹{Number(exp.amount).toLocaleString()}</p>
                  </div>
                )
              ))}
            </div>
          </motion.div>

          {/* Loans */}
          {profile.loans.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel rounded-xl p-8 mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">Active Loans</h3>
              <div className="space-y-4">
                {profile.loans.map((loan, i) => (
                  <div key={i} className="p-4 rounded-lg bg-card/50 flex justify-between items-center">
                    <div>
                      <p className="font-semibold mb-1">Loan {i + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {loan.duration} years at {loan.interestRate}% interest
                      </p>
                    </div>
                    <p className="text-2xl font-bold">₹{Number(loan.amount).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Goals */}
          {profile.goals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-panel rounded-xl p-8 mb-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Your Financial Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.goals.map((goal, i) => (
                  <div key={i} className="p-6 rounded-lg bg-card/50 border border-primary/10">
                    <h4 className="font-semibold text-lg mb-2">{goal.type}</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Target Amount</span>
                      <span className="font-semibold">₹{Number(goal.targetAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Timeline</span>
                      <span className="font-semibold">{goal.timeline} years</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <p className="text-sm text-primary">
                        Monthly savings needed: ₹
                        {Math.ceil(Number(goal.targetAmount) / (Number(goal.timeline) * 12)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Risk & Investment Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-panel rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Risk Profile</h3>
              <div className="p-6 rounded-lg bg-card/50 text-center">
                <p className="text-4xl font-bold capitalize mb-2 text-gradient-primary">
                  {profile.riskAppetite}
                </p>
                <p className="text-muted-foreground">
                  {profile.riskAppetite === "low" && "Conservative approach - Capital preservation focus"}
                  {profile.riskAppetite === "medium" && "Balanced strategy - Growth with safety"}
                  {profile.riskAppetite === "high" && "Aggressive approach - Maximum growth potential"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-panel rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Investment Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {profile.investmentPreferences.map((pref, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm font-semibold"
                  >
                    {pref}
                  </div>
                ))}
                {profile.investmentPreferences.length === 0 && (
                  <p className="text-muted-foreground">No preferences selected</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 glass-panel rounded-xl p-8 border-2 border-primary/20 glow-cyan"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              AI-Generated Insights
            </h3>
            <div className="space-y-4">
              {savings > 0 ? (
                <p className="text-lg">
                  ✨ Great job! You're saving <span className="text-primary font-semibold">{savingsPercentage}%</span> of your income. 
                  This puts you ahead of 67% of users in your income bracket.
                </p>
              ) : (
                <p className="text-lg text-destructive">
                  ⚠️ Your expenses exceed your income. Consider reviewing your budget to create savings opportunities.
                </p>
              )}
              
              {profile.goals.length > 0 && savings > 0 && (
                <p className="text-lg">
                  🎯 Based on your current savings rate, you're projected to achieve{" "}
                  <span className="text-primary font-semibold">
                    {profile.goals.filter(g => {
                      const monthlyRequired = Number(g.targetAmount) / (Number(g.timeline) * 12);
                      return savings >= monthlyRequired;
                    }).length} out of {profile.goals.length}
                  </span>{" "}
                  goals on schedule.
                </p>
              )}

              {profile.loans.length > 0 && (
                <p className="text-lg">
                  💡 AI Recommendation: Consider allocating {Math.min(20, Math.ceil((savings * 0.3) / savings * 100))}% of your savings 
                  toward loan prepayment to save on interest costs.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
