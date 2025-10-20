import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, Shield, Target, TrendingUp, Wallet, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Brain,
    title: "Adaptive Budget Engine",
    description:
      "AI learns your spending patterns and optimizes your budget in real-time.",
    benefit: "Users save ₹18,500/year on average",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    icon: Shield,
    title: "Loan Intelligence Layer",
    description:
      "Automatically identifies opportunities to reduce debt and optimize EMIs.",
    benefit: "Saves ₹2.3L in interest over 3 years",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    icon: Target,
    title: "Goal Synthesis AI",
    description:
      "Transforms your dreams into actionable, AI-optimized savings plans.",
    benefit: "82% goal achievement rate",
    color: "from-cyan-400 to-teal-500",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Risk DNA Profiler",
    description:
      "Deep analysis of your risk tolerance to build the perfect portfolio.",
    benefit: "15% higher returns vs. traditional",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    icon: Wallet,
    title: "Cross-Asset Allocator",
    description:
      "Intelligently distributes investments across stocks, gold, crypto, and more.",
    benefit: "Optimizes for 18% annual growth",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: 6,
    icon: Zap,
    title: "Behavioral Nudge System",
    description: "AI-powered reminders and insights that keep you on track.",
    benefit: "3x better adherence to plans",
    color: "from-cyan-500 to-cyan-600",
  },
];

export const FeatureOrbit = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            The <span className="text-gradient-primary">Finora Cortex</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Six neural nodes working in harmony to revolutionize your financial
            future
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredId === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(feature.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative"
              >
                <div
                  className={`
                    glass-panel rounded-2xl p-5 sm:p-6 md:p-8 h-full transition-all duration-500
                    ${isHovered ? "scale-105 glow-cyan" : ""}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                    w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-xl bg-gradient-to-br ${feature.color} 
                    flex items-center justify-center mb-4 sm:mb-5 md:mb-6 
                    group-hover:scale-110 transition-transform duration-300
                  `}
                  >
                    <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* AI Benefit */}
                  <div
                    className={`
                    mt-auto pt-3 sm:pt-4 border-t border-primary/20
                    transition-all duration-500
                    ${isHovered ? "opacity-100" : "opacity-70"}
                  `}
                  >
                    <p className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5 sm:gap-2">
                      <Zap className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span>{feature.benefit}</span>
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color}
                    opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none
                  `}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
