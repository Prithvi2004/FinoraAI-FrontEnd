import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Shield,
  Search,
  DollarSign,
  BarChart3,
  Activity,
  Zap,
  Target,
  LineChart,
  PieChart,
  Globe,
  Database,
  Lock,
  AlertCircle,
  CheckCircle,
  Cpu,
  Network,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentsVisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define 18 different agents with unique properties
const agents = [
  {
    id: 1,
    name: "Market Analyzer",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: "Risk Assessor",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    position: { x: 1, y: 0 },
  },
  {
    id: 3,
    name: "Data Miner",
    icon: Search,
    color: "from-purple-500 to-pink-500",
    position: { x: 2, y: 0 },
  },
  {
    id: 4,
    name: "Portfolio Optimizer",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    position: { x: 0, y: 1 },
  },
  {
    id: 5,
    name: "Sentiment Analyzer",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
    position: { x: 1, y: 1 },
  },
  {
    id: 6,
    name: "Price Predictor",
    icon: DollarSign,
    color: "from-yellow-500 to-amber-500",
    position: { x: 2, y: 1 },
  },
  {
    id: 7,
    name: "Chart Pattern",
    icon: BarChart3,
    color: "from-teal-500 to-cyan-500",
    position: { x: 0, y: 2 },
  },
  {
    id: 8,
    name: "Volatility Tracker",
    icon: Activity,
    color: "from-rose-500 to-red-500",
    position: { x: 1, y: 2 },
  },
  {
    id: 9,
    name: "Execution Engine",
    icon: Zap,
    color: "from-orange-500 to-yellow-500",
    position: { x: 2, y: 2 },
  },
  {
    id: 10,
    name: "Trend Forecaster",
    icon: LineChart,
    color: "from-blue-600 to-indigo-600",
    position: { x: 0, y: 3 },
  },
  {
    id: 11,
    name: "Asset Allocator",
    icon: PieChart,
    color: "from-violet-500 to-purple-500",
    position: { x: 1, y: 3 },
  },
  {
    id: 12,
    name: "Global Monitor",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    position: { x: 2, y: 3 },
  },
  {
    id: 13,
    name: "Data Aggregator",
    icon: Database,
    color: "from-emerald-500 to-green-500",
    position: { x: 0, y: 4 },
  },
  {
    id: 14,
    name: "Security Guard",
    icon: Lock,
    color: "from-gray-500 to-slate-500",
    position: { x: 1, y: 4 },
  },
  {
    id: 15,
    name: "Alert System",
    icon: AlertCircle,
    color: "from-red-600 to-orange-600",
    position: { x: 2, y: 4 },
  },
  {
    id: 16,
    name: "Validator",
    icon: CheckCircle,
    color: "from-green-600 to-emerald-600",
    position: { x: 0, y: 5 },
  },
  {
    id: 17,
    name: "Processing Core",
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    position: { x: 1, y: 5 },
  },
  {
    id: 18,
    name: "Network Sync",
    icon: Network,
    color: "from-cyan-600 to-teal-600",
    position: { x: 2, y: 5 },
  },
];

// Agent status messages
const agentStatuses = [
  "Analyzing market data...",
  "Processing signals...",
  "Computing patterns...",
  "Evaluating risks...",
  "Optimizing portfolio...",
  "Scanning trends...",
  "Validating data...",
  "Executing strategy...",
];

export const AgentsVisualizationModal = ({
  isOpen,
  onClose,
}: AgentsVisualizationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-gradient-to-br from-slate-950/95 to-slate-900/95 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-30">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-cyan-500/30">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AI Agents Neural Network
                </h2>
                <p className="text-slate-400 mt-1">
                  18 Specialized Agents Working in Harmony
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Main Visualization Area */}
            <div className="relative z-10 p-8 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
              {/* Central Hub */}
              <div className="relative flex items-center justify-center mb-12">
                <motion.div
                  className="relative w-48 h-48"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Central Brain */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  {/* Pulsing rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Text overlay */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-white font-bold text-xl mt-48">
                    Central Intelligence
                  </div>
                  <div className="text-cyan-400 text-sm">
                    Orchestrating 18 Agents
                  </div>
                </motion.div>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                {agents.map((agent, index) => {
                  const Icon = agent.icon;
                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="relative group"
                    >
                      {/* Connection line to center (visual effect) */}
                      <motion.div
                        className="absolute left-1/2 bottom-full h-20 w-0.5 bg-gradient-to-t from-cyan-500/50 to-transparent"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                      />

                      {/* Agent Card */}
                      <motion.div
                        className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden"
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        />

                        {/* Agent Icon */}
                        <motion.div
                          className="relative flex items-center justify-center mb-3"
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          {/* Status indicator */}
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>

                        {/* Agent Info */}
                        <div className="relative text-center">
                          <h3 className="text-xs font-semibold text-white mb-1">
                            {agent.name}
                          </h3>
                          <motion.p
                            className="text-[10px] text-cyan-400"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.1,
                            }}
                          >
                            {agentStatuses[index % agentStatuses.length]}
                          </motion.p>
                        </div>

                        {/* Data flow particles */}
                        <motion.div
                          className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-cyan-400"
                          animate={{
                            y: [0, 60],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Network Activity Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Processing Speed */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Processing Speed
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Queries/sec</span>
                      <motion.span
                        className="text-cyan-400 font-semibold"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        1,247
                      </motion.span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        animate={{ width: ["70%", "95%", "70%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Active Connections */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Network className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Neural Pathways
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Active Links</span>
                      <motion.span
                        className="text-purple-400 font-semibold"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        153
                      </motion.span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        animate={{ width: ["60%", "90%", "60%"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Data Throughput */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Data Throughput
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">MB/sec</span>
                      <motion.span
                        className="text-green-400 font-semibold"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        89.3
                      </motion.span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        animate={{ width: ["75%", "85%", "75%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Real-time Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/20 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Live Activity Stream
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {agents.slice(0, 8).map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      className="flex items-center gap-3 text-sm py-2 border-b border-slate-700/50"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                      <span className="text-slate-400 flex-1">
                        {agent.name}
                      </span>
                      <span className="text-cyan-400 text-xs">
                        {agentStatuses[index % agentStatuses.length]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
