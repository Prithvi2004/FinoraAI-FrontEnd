import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  onBuildProfile: () => void;
  isAuthenticated: boolean;
  hasProfile: boolean;
}

export const HeroSection = ({
  onBuildProfile,
  isAuthenticated,
  hasProfile,
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect-hero"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <linearGradient
            id="finnora-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter
            id="text-glow-hero"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Animated Mesh Gradient Background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#a78bfa", "#8b5cf6", "#6366f1", "#60a5fa"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#000000", "#ffffff", "#a78bfa", "#60a5fa"]}
        speed={0.2}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative border border-white/10"
            style={{
              filter: "url(#glass-effect-hero)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent rounded-full" />
            <Sparkles className="w-4 h-4 mr-2 text-purple-300" />
            <span className="text-white/90 text-sm font-medium relative z-10 tracking-wide">
              ✨ AI-Powered Financial Intelligence
            </span>
          </motion.div>

          {/* Main Headline - Premium Style */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="block font-light text-white/95 mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #a78bfa 40%, #60a5fa 80%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                filter: "url(#text-glow-hero)",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Meet Your Financial
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">
              Digital Twin
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Finnora uses deep-learning intelligence to turn your income, goals,
            and risk profile into a living investment strategy—automatically.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {isAuthenticated ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={onBuildProfile}
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-7 text-base font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border-0"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      <Sparkles className="w-5 h-5" />
                      {hasProfile ? "Edit Your Profile" : "Build Your Profile"}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>

                {hasProfile && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => navigate("/dashboard")}
                      className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-purple-400/50 px-10 py-7 text-base font-medium rounded-full backdrop-blur-sm transition-all duration-300"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Go to Dashboard
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-7 text-base font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border-0"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-purple-400/50 px-10 py-7 text-base font-medium rounded-full backdrop-blur-sm transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 flex items-center justify-center gap-3 text-sm"
          >
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          />
        </div>
      </motion.div>
    </section>
  );
};
