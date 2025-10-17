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
import { useState, useEffect, useRef } from "react";

interface AgentsVisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DataPulse {
  id: string;
  from: number;
  to: number;
  progress: number;
}

// Define 18 specialized financial agents with organic neural network positions
const agents = [
  {
    id: 1,
    name: "Master Orchestrator",
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    category: "Core",
    x: 50, // center
    y: 50,
  },
  {
    id: 2,
    name: "Life Context & Empathy",
    icon: Brain,
    color: "from-rose-500 to-pink-500",
    category: "Context",
    x: 30,
    y: 20,
  },
  {
    id: 3,
    name: "Financial Clarity",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    category: "Guidance",
    x: 70,
    y: 25,
  },
  {
    id: 4,
    name: "Action Pathfinder",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    category: "Planning",
    x: 85,
    y: 45,
  },
  {
    id: 5,
    name: "Cash Flow Architect",
    icon: Activity,
    color: "from-cyan-500 to-blue-500",
    category: "Planning",
    x: 80,
    y: 70,
  },
  {
    id: 6,
    name: "Debt Strategist",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    category: "Planning",
    x: 60,
    y: 85,
  },
  {
    id: 7,
    name: "Tax Optimizer",
    icon: DollarSign,
    color: "from-yellow-500 to-amber-500",
    category: "Planning",
    x: 35,
    y: 80,
  },
  {
    id: 8,
    name: "Life-Stage Architect",
    icon: BarChart3,
    color: "from-indigo-500 to-purple-500",
    category: "Planning",
    x: 15,
    y: 60,
  },
  {
    id: 9,
    name: "Asset Allocation",
    icon: PieChart,
    color: "from-violet-500 to-purple-500",
    category: "Investment",
    x: 20,
    y: 40,
  },
  {
    id: 10,
    name: "Market Timing",
    icon: LineChart,
    color: "from-teal-500 to-cyan-500",
    category: "Investment",
    x: 45,
    y: 25,
  },
  {
    id: 11,
    name: "Alternative Investments",
    icon: Globe,
    color: "from-emerald-500 to-green-500",
    category: "Investment",
    x: 65,
    y: 15,
  },
  {
    id: 12,
    name: "ESG Advisor",
    icon: CheckCircle,
    color: "from-green-600 to-emerald-600",
    category: "Investment",
    x: 90,
    y: 30,
  },
  {
    id: 13,
    name: "Risk Intelligence",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    category: "Risk",
    x: 92,
    y: 55,
  },
  {
    id: 14,
    name: "Compliance Officer",
    icon: Lock,
    color: "from-gray-500 to-slate-600",
    category: "Governance",
    x: 75,
    y: 90,
  },
  {
    id: 15,
    name: "Wellness Coach",
    icon: AlertCircle,
    color: "from-pink-500 to-rose-500",
    category: "Support",
    x: 50,
    y: 75,
  },
  {
    id: 16,
    name: "Literacy Tutor",
    icon: Database,
    color: "from-blue-600 to-indigo-600",
    category: "Education",
    x: 25,
    y: 90,
  },
  {
    id: 17,
    name: "Stress Tester",
    icon: Zap,
    color: "from-orange-600 to-yellow-600",
    category: "Analysis",
    x: 10,
    y: 75,
  },
  {
    id: 18,
    name: "Capability Builder",
    icon: Network,
    color: "from-cyan-600 to-teal-600",
    category: "Growth",
    x: 8,
    y: 50,
  },
];

export const AgentsVisualizationModal = ({
  isOpen,
  onClose,
}: AgentsVisualizationModalProps) => {
  const [dataPulses, setDataPulses] = useState<DataPulse[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random data pulses between nodes
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const fromId = Math.floor(Math.random() * agents.length) + 1;
      let toId = Math.floor(Math.random() * agents.length) + 1;

      // Ensure different nodes
      while (toId === fromId) {
        toId = Math.floor(Math.random() * agents.length) + 1;
      }

      const newPulse: DataPulse = {
        id: `${Date.now()}-${Math.random()}`,
        from: fromId,
        to: toId,
        progress: 0,
      };

      setDataPulses((prev) => [...prev.slice(-8), newPulse]); // Keep max 9 pulses
    }, 800);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Animate pulse progress
  useEffect(() => {
    if (dataPulses.length === 0) return;

    const interval = setInterval(() => {
      setDataPulses((prev) =>
        prev
          .map((pulse) => ({
            ...pulse,
            progress: pulse.progress + 0.02,
          }))
          .filter((pulse) => pulse.progress < 1)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [dataPulses.length]);

  const getNodePosition = (
    agent: (typeof agents)[0],
    containerWidth: number,
    containerHeight: number
  ) => {
    return {
      x: (agent.x / 100) * containerWidth,
      y: (agent.y / 100) * containerHeight,
    };
  };

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(16px)" }}
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
            {/* Solid gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-95" />

            {/* Subtle animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"
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

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-cyan-500/30">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Agentic Financial Intelligence
                </h2>
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

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-20 mx-6 mt-2 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-slate-300">
                      <span className="font-bold text-white">
                        {agents.length}
                      </span>{" "}
                      Agents Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">
                      <span className="font-bold text-white">
                        {dataPulses.length}
                      </span>{" "}
                      Data Streams
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">
                      Agentic Network Active
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Hover over nodes to view details
                </div>
              </div>
            </motion.div>

            {/* Neural Network Visualization */}
            <div
              ref={containerRef}
              className="relative z-10 w-full h-[calc(90vh-180px)] overflow-hidden mt-0"
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                {/* Static connection lines */}
                {agents.map((fromAgent) =>
                  agents
                    .filter((toAgent) => toAgent.id !== fromAgent.id)
                    .slice(0, 3) // Each node connects to 3 others
                    .map((toAgent) => {
                      const fromPos = getNodePosition(
                        fromAgent,
                        containerRef.current?.clientWidth || 1200,
                        containerRef.current?.clientHeight || 600
                      );
                      const toPos = getNodePosition(
                        toAgent,
                        containerRef.current?.clientWidth || 1200,
                        containerRef.current?.clientHeight || 600
                      );

                      return (
                        <line
                          key={`${fromAgent.id}-${toAgent.id}`}
                          x1={fromPos.x}
                          y1={fromPos.y}
                          x2={toPos.x}
                          y2={toPos.y}
                          stroke="rgba(34, 211, 238, 0.1)"
                          strokeWidth="1"
                        />
                      );
                    })
                )}

                {/* Animated data pulses */}
                {dataPulses.map((pulse) => {
                  const fromAgent = agents.find((a) => a.id === pulse.from);
                  const toAgent = agents.find((a) => a.id === pulse.to);

                  if (!fromAgent || !toAgent) return null;

                  const fromPos = getNodePosition(
                    fromAgent,
                    containerRef.current?.clientWidth || 1200,
                    containerRef.current?.clientHeight || 600
                  );
                  const toPos = getNodePosition(
                    toAgent,
                    containerRef.current?.clientWidth || 1200,
                    containerRef.current?.clientHeight || 600
                  );

                  const currentX =
                    fromPos.x + (toPos.x - fromPos.x) * pulse.progress;
                  const currentY =
                    fromPos.y + (toPos.y - fromPos.y) * pulse.progress;

                  return (
                    <g key={pulse.id}>
                      {/* Pulse line */}
                      <line
                        x1={fromPos.x}
                        y1={fromPos.y}
                        x2={currentX}
                        y2={currentY}
                        stroke="rgba(34, 211, 238, 0.6)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Pulse dot */}
                      <circle
                        cx={currentX}
                        cy={currentY}
                        r="4"
                        fill="#22d3ee"
                        filter="url(#glow)"
                      >
                        <animate
                          attributeName="r"
                          values="4;6;4"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* Glow filter for pulses */}
                <defs>
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Neural nodes */}
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                const isMaster = agent.id === 1;
                const isHovered = hoveredNode === agent.id;

                return (
                  <motion.div
                    key={agent.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${agent.x}%`,
                      top: `${agent.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isHovered ? 100 : isMaster ? 50 : 10,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: [0, Math.sin(index) * 3, 0],
                      y: [0, Math.cos(index) * 3, 0],
                    }}
                    transition={{
                      scale: { delay: index * 0.05, duration: 0.4 },
                      x: {
                        duration: 3 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: 4 + index * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => setHoveredNode(agent.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Node sphere */}
                    <motion.div
                      className={`relative ${
                        isMaster ? "w-20 h-20" : "w-16 h-16"
                      } rounded-full`}
                      animate={{
                        boxShadow: [
                          `0 0 20px rgba(34, 211, 238, 0.3)`,
                          `0 0 40px rgba(34, 211, 238, 0.6)`,
                          `0 0 20px rgba(34, 211, 238, 0.3)`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Node glow rings */}
                      {(isMaster || isHovered) && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className={`absolute rounded-full border-2 ${
                                isMaster
                                  ? "border-purple-400/40"
                                  : "border-cyan-400/40"
                              }`}
                              style={{
                                width: isMaster ? 100 : 80,
                                height: isMaster ? 100 : 80,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                              }}
                            />
                          ))}
                        </>
                      )}

                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${agent.color} opacity-90`}
                      />

                      {/* Glass shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon
                          className={`${
                            isMaster ? "w-10 h-10" : "w-8 h-8"
                          } text-white z-10`}
                        />
                      </div>

                      {/* Activity pulse */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>

                    {/* Node label (on hover or for master) */}
                    <AnimatePresence>
                      {(isHovered || isMaster) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        >
                          <div className="px-4 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/50 backdrop-blur-xl shadow-2xl">
                            <p className="text-sm font-bold text-white">
                              {agent.name}
                            </p>
                            <p className="text-xs text-cyan-400">
                              {agent.category}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
