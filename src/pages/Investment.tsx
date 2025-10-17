import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentsVisualizationModal } from "@/components/AgentsVisualizationModal";
import {
  ArrowLeft,
  Send,
  Brain,
  Network,
  Activity,
  Zap,
  DollarSign,
  Lightbulb,
  Copy,
  Check,
  Loader2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

// Professional Fintech Loading Animation Component
const FintechLoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center gap-4 relative py-1">
      {/* Central Processing Hub */}
      <div className="relative w-10 h-10">
        {/* Central icon rotating */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Data flow rings */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-cyan-400/40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-blue-400/40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Processing Status Text */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            Analyzing Financial Data
          </span>
          {/* Animated processing indicators */}
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle progress indicator */}
        <div className="flex items-center gap-2 text-xs text-cyan-300/80">
          {/* Financial icons rotating through */}
          <div className="relative w-4 h-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {[
                { Icon: BarChart3, delay: 0 },
                { Icon: TrendingUp, delay: 1.2 },
                { Icon: PieChart, delay: 2.4 },
                { Icon: LineChart, delay: 3.6 },
              ].map(({ Icon, delay }, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: [0, 1, 1, 0],
                    transition: {
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 3.6,
                      delay: delay,
                    },
                  }}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <span>Processing 18 agents</span>
        </div>
      </div>

      {/* Data stream particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
            style={{
              left: "10%",
              top: "50%",
            }}
            animate={{
              x: [0, 200],
              y: [0, (i % 2 ? -1 : 1) * (10 + i * 5)],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Terminal output component
const TerminalOutput = ({ output }: { output: string[] }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400">
              finnora-ai-terminal v2.0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar w-full overflow-x-hidden"
      >
        <div className="space-y-1 w-full">
          <AnimatePresence mode="popLayout">
            {output.map((line, index) => (
              <motion.div
                key={`${index}-${line}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="flex items-start gap-2 group w-full"
              >
                <span className="text-cyan-400 select-none mt-0.5">❯</span>
                <span className="text-green-400 flex-1 leading-relaxed break-words whitespace-pre-wrap w-full">
                  {line}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {output.length === 0 && (
            <div className="flex items-center gap-2 text-slate-600">
              <Brain className="w-4 h-4" />
              <span className="italic">System ready. Awaiting input...</span>
            </div>
          )}
          {/* Blinking cursor */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-cyan-400">❯</span>
            <motion.div
              className="w-2 h-4 bg-cyan-400 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Investment = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "[INIT] Financial AI System initialized successfully",
    "[LOAD] Loading 18 specialized agents across 6 categories...",
    "[READY] All agents are online and ready for analysis",
    "[STATUS] Awaiting user input...",
  ]);

  useEffect(() => {
    if (!user || !profile) {
      navigate("/dashboard");
    }
  }, [user, profile, navigate]);

  // Calculate essential metrics
  const totalExpenses = profile
    ? Number(profile.expenses.rent || 0) +
      Number(profile.expenses.groceries || 0) +
      Number(profile.expenses.health || 0) +
      Number(profile.expenses.miscellaneous || 0) +
      Number(profile.expenses.entertainment || 0) +
      profile.expenses.custom.reduce(
        (sum: number, exp: any) => sum + Number(exp.amount || 0),
        0
      )
    : 0;

  const totalIncome = Number(profile?.income || 0);
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const totalLoans =
    profile?.loans.reduce((sum, loan) => sum + Number(loan.amount || 0), 0) ||
    0;

  // Structured data for AI agents (JSON format)
  const structuredUserData = profile
    ? {
        financial_snapshot: {
          monthly_income: Number(profile.income || 0),
          monthly_expenses: totalExpenses,
          net_monthly_savings: netSavings,
          savings_rate_percentage: parseFloat(savingsRate.toFixed(2)),
        },
        expense_breakdown: {
          housing: Number(profile.expenses.rent || 0),
          groceries: Number(profile.expenses.groceries || 0),
          healthcare: Number(profile.expenses.health || 0),
          entertainment: Number(profile.expenses.entertainment || 0),
          miscellaneous: Number(profile.expenses.miscellaneous || 0),
          custom_expenses: profile.expenses.custom.map((exp: any) => ({
            category: exp.name,
            amount: Number(exp.amount || 0),
          })),
        },
        liabilities: {
          total_loans: totalLoans,
          loan_details: profile.loans.map((loan: any) => ({
            amount: Number(loan.amount || 0),
            duration_months: Number(loan.duration || 0),
            interest_rate: Number(loan.interestRate || 0),
          })),
        },
        goals: {
          total_goals: profile.goals.length,
          goal_details: profile.goals.map((goal: any) => ({
            type: goal.type,
            target_amount: Number(goal.targetAmount || 0),
            timeline_months: Number(goal.timeline || 0),
          })),
        },
        risk_profile: {
          risk_appetite: profile.riskAppetite,
          investment_preferences: profile.investmentPreferences || [],
        },
      }
    : null;

  const formattedUserData = structuredUserData
    ? JSON.stringify(structuredUserData, null, 2)
    : "";

  const handleCopyData = () => {
    navigator.clipboard.writeText(formattedUserData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!structuredUserData || isLoading) return;

    setIsLoading(true);

    // Clear previous output and start fresh
    setTerminalOutput([
      "[REQUEST] New analysis request received",
      "[DATA] Processing user financial snapshot...",
      `[QUERY] ${userQuery || "General financial analysis"}`,
      "",
      "[ORCHESTRATOR] master_orchestrator activated",
      "[ORCHESTRATOR] Analyzing overall financial context...",
      "[DISPATCH] Delegating tasks to specialized agents...",
      "",
    ]);

    // Simulate agent processing
    const agentMessages = [
      "[ANALYSIS] life_context_agent: Evaluating life stage and priorities",
      "[ANALYSIS] clarity_agent: Identifying financial clarity gaps",
      "[PLANNING] action_pathfinder: Creating action roadmap",
      "[CASHFLOW] cash_flow_agent: Analyzing income and expense patterns",
      `[SAVINGS] Current savings rate: ${savingsRate.toFixed(1)}%`,
      "",
      "[STRATEGY] debt_strategist: Evaluating debt obligations",
      `[DEBT] Total liabilities: ₹${totalLoans.toLocaleString()}`,
      "[TAX] tax_optimizer: Identifying tax-saving opportunities",
      "[GOALS] goal_architect: Aligning goals with financial capacity",
      "",
      "[INVESTMENT] asset_allocator: Building optimal portfolio mix",
      "[INVESTMENT] tactical_agent: Analyzing market opportunities",
      "[INVESTMENT] alt_investments_agent: Exploring alternatives",
      "[ESG] esg_agent: Screening sustainable investment options",
      "",
      "[RISK] risk_intelligence: Assessing risk exposure",
      "[RISK] stress_tester: Running stress scenarios",
      "[COMPLIANCE] compliance_agent: Verifying regulatory alignment",
      "",
      "[EDUCATION] wellness_coach: Personal finance wellness check",
      "[EDUCATION] literacy_tutor: Knowledge gap identification",
      "[CAPABILITY] capability_builder: Skill development recommendations",
      "",
    ];

    setTimeout(() => {
      setTerminalOutput((prev) => [...prev, ...agentMessages]);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        "[SYNTHESIS] Aggregating insights from all agents...",
        "[COMPLETE] ✓ Analysis complete",
        "[COMPLETE] ✓ Recommendations generated",
        "[COMPLETE] ✓ Report ready",
        "",
        `[SUMMARY] Net Monthly Savings: ₹${netSavings.toLocaleString()}`,
        `[SUMMARY] Investment Capacity: ₹${Math.max(
          0,
          netSavings * 0.7
        ).toLocaleString()}`,
        `[SUMMARY] Emergency Fund Status: ${
          netSavings * 6 >= totalExpenses * 6 ? "Adequate" : "Needs Attention"
        }`,
        "",
        "[STATUS] System ready for next query",
      ]);
      setIsLoading(false);
    }, 3500);
  };

  if (!profile || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <header className="glass-panel border-b border-white/5 sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 md:py-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-foreground hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="hidden sm:block h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent truncate">
                    AI Investment Analysis Hub
                  </h1>
                  <p className="text-xs text-slate-500 truncate">
                    Powered by Multi-Agent Intelligence
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0 w-full md:w-auto justify-end">
              <motion.button
                onClick={() => setIsAgentsModalOpen(true)}
                className="relative flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 hover:border-green-400/70 transition-all duration-300 cursor-pointer group overflow-hidden shadow-lg hover:shadow-green-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                    "0 0 30px rgba(34, 197, 94, 0.5)",
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Animated background shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 bg-green-500/10 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Content */}
                <div className="relative flex items-center gap-2">
                  {/* Animated pulse indicator with ring */}
                  <div className="relative">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-500/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 8px rgba(34, 197, 94, 0.8)",
                          "0 0 12px rgba(34, 197, 94, 1)",
                          "0 0 8px rgba(34, 197, 94, 0.8)",
                        ],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </div>

                  <span className="text-xs md:text-sm font-bold text-green-300 group-hover:text-green-200 transition-colors flex items-center gap-1">
                    <motion.span
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      18 Agents Online
                    </motion.span>
                    <motion.span
                      className="text-[10px] text-green-400/80 hidden md:inline"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      • Click to view
                    </motion.span>
                  </span>

                  {/* Animated Network Icon */}
                  <motion.div>
                    <Network className="w-4 h-4 md:w-5 md:h-5 text-green-300 group-hover:text-green-200 drop-shadow-lg" />
                  </motion.div>

                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-[calc(100vh-140px)] md:h-[calc(100vh-140px)] overflow-hidden w-full">
          {/* Left Column - Terminal Output */}
          <div className="flex flex-col h-full overflow-hidden min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3 gap-2 sm:gap-0 flex-shrink-0 w-full">
              <h2 className="text-base md:text-lg font-bold flex items-center gap-2 truncate">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Live Analysis Terminal
                </span>
              </h2>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden w-full">
              <TerminalOutput output={terminalOutput} />
            </div>
          </div>

          {/* Right Column - User Data & Query Input */}
          <div className="flex flex-col gap-3 md:gap-4 h-full overflow-hidden min-w-0 w-full">
            {/* User Data Display */}
            <div className="flex flex-col space-y-2 md:space-y-3 flex-1 min-h-0 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-shrink-0 gap-2 sm:gap-0 w-full">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Your Financial Data
                  </span>
                </label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyData}
                  className="h-8 text-xs hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy JSON
                    </>
                  )}
                </Button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden w-full">
                <Textarea
                  value={formattedUserData}
                  readOnly
                  className="h-full w-full min-w-0 font-mono text-xs md:text-sm bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-slate-800 resize-none custom-scrollbar rounded-xl p-3 md:p-4 shadow-2xl overflow-y-auto"
                />
              </div>
            </div>

            {/* Query Input */}
            <div className="space-y-2 md:space-y-3 flex-shrink-0 w-full">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Your Query (Optional)
                </span>
              </label>
              <Textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask about investments, risk analysis, portfolio optimization, tax strategies, debt management, goal planning..."
                className="h-24 md:h-28 w-full min-w-0 bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-slate-800 focus:border-cyan-500 transition-colors resize-none rounded-xl p-3 md:p-4"
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full"
            >
              <Button
                onClick={handleSubmit}
                disabled={!structuredUserData || isLoading}
                className="w-full h-14 md:h-16 flex-shrink-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-base md:text-lg shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/50 rounded-xl disabled:cursor-not-allowed relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <FintechLoadingAnimation />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span className="text-lg">Run AI Analysis</span>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle animated background when loading */}
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Agents Visualization Modal */}
      <AgentsVisualizationModal
        isOpen={isAgentsModalOpen}
        onClose={() => setIsAgentsModalOpen(false)}
      />

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Investment;
