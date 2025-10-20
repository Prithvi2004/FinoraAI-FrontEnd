import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
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
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Brain,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Users,
  ChevronRight,
  TrendingDown,
} from "lucide-react";

// Floating particles animation component
const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/30 rounded-full"
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
      y: [0, Math.random() * -100, Math.random() * -200],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    }}
  />
);

// Premium metric card component
const MetricCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  gradient,
  delay,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`relative overflow-hidden rounded-2xl p-6 glass-panel border border-white/10 shadow-2xl group`}
  >
    {/* Gradient overlay */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
    />

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}
    </div>

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              trend === "up"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            <span className="text-xs font-bold">{trendValue}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-2 font-medium">{label}</p>
      <p className="text-3xl font-bold tracking-tight">{value}</p>

      {/* Animated underline */}
      <motion.div
        className={`h-1 bg-gradient-to-r ${gradient} rounded-full mt-4`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "details">(
    "overview"
  );

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
    profile.expenses.custom.reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );

  const savings = Number(profile.income || 0) - totalExpenses;
  const savingsPercentage =
    Number(profile.income) > 0
      ? ((savings / Number(profile.income)) * 100).toFixed(1)
      : "0";

  const totalLoans = profile.loans.reduce(
    (sum, loan) => sum + Number(loan.amount || 0),
    0
  );
  const expensePercentage =
    Number(profile.income) > 0
      ? ((totalExpenses / Number(profile.income)) * 100).toFixed(1)
      : "0";
  const riskLabel = profile.riskAppetite
    ? profile.riskAppetite.charAt(0).toUpperCase() +
      profile.riskAppetite.slice(1)
    : "Medium";

  // Dynamic greeting and user initials for premium welcome UI
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 18
      ? "Good afternoon"
      : "Good evening";
  const initials = (user?.name || "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Premium Header */}
      <header className="glass-panel border-b border-white/5 sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Finnora
                </h1>
              </motion.div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-2 sm:px-4"
                >
                  <Home className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-2 sm:px-4"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Banner moved from header to main */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-[0_10px_40px_rgba(2,6,23,0.45)]"
              role="region"
              aria-label={`Welcome ${user.name}`}
            >
              {/* Animated gradient sheen */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent, rgba(168,85,247,0.08), transparent)",
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Soft gradient blobs */}
              <motion.div
                className="pointer-events-none absolute -top-12 -left-10 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl"
                animate={{ x: [0, 10, 0], y: [0, 8, 0], scale: [1, 1.04, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-16 -right-12 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
                animate={{
                  x: [0, -12, 0],
                  y: [0, -10, 0],
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-[auto,1fr,auto] items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                {/* Avatar */}
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="relative">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl p-[2px] bg-gradient-to-br from-cyan-500 to-blue-600">
                      <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-base sm:text-lg font-bold text-cyan-200">
                        {initials || (
                          <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                        )}
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-cyan-400/30"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center lg:justify-start">
                    <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-cyan-300" />
                    <span className="text-xs text-cyan-200/80">
                      Personalized
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    {greeting}, {user.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Welcome back to your financial command center.
                  </p>
                </div>

                {/* Mini metrics */}
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-3">
                  <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5">
                    <TrendingUp className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span className="whitespace-nowrap">
                      Savings {savingsPercentage}%
                    </span>
                  </div>
                  <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5">
                    <DollarSign className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span className="whitespace-nowrap">
                      Expenses {Math.round(Number(expensePercentage))}%
                    </span>
                  </div>
                  <div className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5">
                    <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span className="whitespace-nowrap">{riskLabel} risk</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Financial Command Center
              </h2>

              {/* Enhanced AI Investment Button with Interactive Hover Effect */}
              <div className="relative group">
                {/* Animated glow effect */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-40 blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative flex items-center gap-4 p-1.5 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl">
                  {/* Brain icon with pulsing ring */}
                  <motion.div
                    className="relative ml-3"
                    animate={{ rotate: [0, 5.5, -5.5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
                      animate={{
                        scale: [1, 1.28, 1],
                        opacity: [0.85, 0, 0.85],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Text content */}
                  <div className="flex flex-col items-start">
                    <span className="text-base md:text-lg font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      AI Investment Hub
                    </span>
                    <motion.span
                      className="text-xs text-cyan-300/75 font-medium"
                      animate={{ opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      18 agents ready
                    </motion.span>
                  </div>

                  {/* Interactive Hover Button */}
                  <InteractiveHoverButton
                    text="Open"
                    onClick={() => navigate("/investment")}
                    className="w-28 h-11 text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500/50 text-white hover:from-cyan-500 hover:to-blue-500"
                    aria-label="Open AI Investment Hub"
                  />

                  {/* Sparkle indicator */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      scale: [0, 1.25, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6"
            >
              AI-powered analytics and real-time insights for smarter financial
              decisions
            </motion.p>

            {/* Tab Navigation */}
            <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("overview")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                    : "glass-panel text-muted-foreground hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <BarChart3 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  Overview
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("details")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                  activeTab === "details"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                    : "glass-panel text-muted-foreground hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Target className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  Details
                </div>
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <MetricCard
                    icon={Wallet}
                    label="Monthly Income"
                    value={`₹${Number(profile.income).toLocaleString()}`}
                    trend="up"
                    trendValue="+12.5%"
                    gradient="from-cyan-500 to-blue-600"
                    delay={0.1}
                  />
                  <MetricCard
                    icon={DollarSign}
                    label="Total Expenses"
                    value={`₹${totalExpenses.toLocaleString()}`}
                    trend={Number(expensePercentage) > 70 ? "down" : "up"}
                    trendValue={`${expensePercentage}%`}
                    gradient="from-orange-500 to-red-600"
                    delay={0.2}
                  />
                  <MetricCard
                    icon={PiggyBank}
                    label="Monthly Savings"
                    value={`₹${savings.toLocaleString()}`}
                    trend={savings > 0 ? "up" : "down"}
                    trendValue={`${savingsPercentage}%`}
                    gradient="from-emerald-500 to-green-600"
                    delay={0.3}
                  />
                  <MetricCard
                    icon={CreditCard}
                    label="Total Liabilities"
                    value={`₹${totalLoans.toLocaleString()}`}
                    gradient="from-purple-500 to-pink-600"
                    delay={0.4}
                  />
                </div>

                {/* Premium AI Insights Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-panel rounded-2xl p-8 mb-8 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          AI Financial Insights
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Powered by advanced analytics
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    {savings > 0 ? (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-400 mb-1">
                              Excellent Savings Rate!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              You're saving{" "}
                              <span className="text-green-400 font-bold">
                                {savingsPercentage}%
                              </span>{" "}
                              of your income. This puts you ahead of 67% of
                              users in your income bracket.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-red-400 mb-1">
                              Budget Alert
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Your expenses exceed your income. Consider
                              reviewing your budget to create savings
                              opportunities.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {profile.goals.length > 0 && savings > 0 && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-blue-400 mb-1">
                              Goals Progress
                            </p>
                            <p className="text-sm text-muted-foreground">
                              You're projected to achieve{" "}
                              <span className="text-blue-400 font-bold">
                                {
                                  profile.goals.filter((g) => {
                                    const monthlyRequired =
                                      Number(g.targetAmount) /
                                      (Number(g.timeline) * 12);
                                    return savings >= monthlyRequired;
                                  }).length
                                }{" "}
                                out of {profile.goals.length}
                              </span>{" "}
                              goals on schedule.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {profile.loans.length > 0 && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-purple-400 mb-1">
                              Smart Recommendation
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Consider allocating 20% of your savings toward
                              loan prepayment to save on interest costs.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Financial Health Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-panel rounded-2xl p-8 mb-8"
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    Financial Health Score
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient1)"
                            strokeWidth="3"
                            strokeDasharray={`${Math.abs(
                              Number(savingsPercentage)
                            )}, 100`}
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{
                              strokeDasharray: `${Math.abs(
                                Number(savingsPercentage)
                              )}, 100`,
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient
                              id="gradient1"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">
                            {Math.round(Math.abs(Number(savingsPercentage)))}
                          </span>
                        </div>
                      </div>
                      <p className="font-semibold">Savings Rate</p>
                      <p className="text-xs text-muted-foreground">
                        of monthly income
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient2)"
                            strokeWidth="3"
                            strokeDasharray={`${Number(
                              expensePercentage
                            )}, 100`}
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{
                              strokeDasharray: `${Number(
                                expensePercentage
                              )}, 100`,
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.2,
                            }}
                          />
                          <defs>
                            <linearGradient
                              id="gradient2"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">
                            {Math.round(Number(expensePercentage))}
                          </span>
                        </div>
                      </div>
                      <p className="font-semibold">Expense Ratio</p>
                      <p className="text-xs text-muted-foreground">
                        of monthly income
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient3)"
                            strokeWidth="3"
                            strokeDasharray="85, 100"
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: "85, 100" }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.4,
                            }}
                          />
                          <defs>
                            <linearGradient
                              id="gradient3"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">85</span>
                        </div>
                      </div>
                      <p className="font-semibold">Health Score</p>
                      <p className="text-xs text-muted-foreground">
                        overall rating
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Expense Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel rounded-2xl p-8 mb-8"
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-primary" />
                    Expense Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {profile.expenses.rent && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 cursor-pointer"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Rent
                        </p>
                        <p className="text-2xl font-bold">
                          ₹{Number(profile.expenses.rent).toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    {profile.expenses.groceries && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 cursor-pointer"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Groceries
                        </p>
                        <p className="text-2xl font-bold">
                          ₹{Number(profile.expenses.groceries).toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    {profile.expenses.health && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/5 border border-red-500/20 cursor-pointer"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Health
                        </p>
                        <p className="text-2xl font-bold">
                          ₹{Number(profile.expenses.health).toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    {profile.expenses.miscellaneous && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20 cursor-pointer"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Miscellaneous
                        </p>
                        <p className="text-2xl font-bold">
                          ₹
                          {Number(
                            profile.expenses.miscellaneous
                          ).toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    {profile.expenses.entertainment && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 cursor-pointer"
                      >
                        <p className="text-xs text-muted-foreground mb-2">
                          Entertainment
                        </p>
                        <p className="text-2xl font-bold">
                          ₹
                          {Number(
                            profile.expenses.entertainment
                          ).toLocaleString()}
                        </p>
                      </motion.div>
                    )}
                    {profile.expenses.custom.map(
                      (exp, i) =>
                        exp.name &&
                        exp.amount && (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-5 rounded-xl bg-gradient-to-br from-slate-500/10 to-gray-500/5 border border-slate-500/20 cursor-pointer"
                          >
                            <p className="text-xs text-muted-foreground mb-2">
                              {exp.name}
                            </p>
                            <p className="text-2xl font-bold">
                              ₹{Number(exp.amount).toLocaleString()}
                            </p>
                          </motion.div>
                        )
                    )}
                  </div>
                </motion.div>

                {/* Loans */}
                {profile.loans.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-8 mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-purple-400" />
                      Active Loans
                    </h3>
                    <div className="space-y-4">
                      {profile.loans.map((loan, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02, x: 10 }}
                          className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/20 flex justify-between items-center cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                              <span className="text-white font-bold">
                                {i + 1}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-lg mb-1">
                                Loan {i + 1}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{loan.duration} years</span>
                                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                <span className="text-purple-400 font-semibold">
                                  {loan.interestRate}% APR
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold">
                              ₹{Number(loan.amount).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Principal Amount
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Goals */}
                {profile.goals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-8 mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary animate-pulse" />
                      Your Financial Goals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.goals.map((goal, i) => {
                        const monthlyRequired = Math.ceil(
                          Number(goal.targetAmount) /
                            (Number(goal.timeline) * 12)
                        );
                        const progress =
                          savings > 0
                            ? Math.min((savings / monthlyRequired) * 100, 100)
                            : 0;

                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="font-bold text-lg">{goal.type}</h4>
                              <div className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                                {goal.timeline}Y
                              </div>
                            </div>

                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                  Target Amount
                                </span>
                                <span className="font-bold text-cyan-400">
                                  ₹{Number(goal.targetAmount).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                  Monthly Savings
                                </span>
                                <span className="font-semibold">
                                  ₹{monthlyRequired.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-muted-foreground">
                                  Progress
                                </span>
                                <span className="text-xs font-bold text-cyan-400">
                                  {Math.round(progress)}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                />
                              </div>
                            </div>

                            <div className="pt-3 border-t border-cyan-500/20">
                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <ChevronRight className="w-3 h-3 text-cyan-400" />
                                {progress >= 100
                                  ? "On track! Keep it up"
                                  : "Adjust savings to meet goal"}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Risk & Investment Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel rounded-2xl p-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-primary" />
                      Risk Profile
                    </h3>
                    <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/5 border border-primary/20 text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-5xl font-black capitalize mb-3 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                          {profile.riskAppetite}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {profile.riskAppetite === "low" &&
                            "Conservative approach - Capital preservation focus"}
                          {profile.riskAppetite === "medium" &&
                            "Balanced strategy - Growth with safety"}
                          {profile.riskAppetite === "high" &&
                            "Aggressive approach - Maximum growth potential"}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel rounded-2xl p-8"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      Investment Preferences
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {profile.investmentPreferences.map((pref, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/10 border border-primary/30 text-sm font-bold cursor-pointer"
                        >
                          {pref}
                        </motion.div>
                      ))}
                      {profile.investmentPreferences.length === 0 && (
                        <p className="text-muted-foreground">
                          No preferences selected
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-white/5 backdrop-blur-xl bg-slate-950/80 py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Finnora AI</p>
                <p className="text-xs text-muted-foreground">
                  Powered by advanced AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
