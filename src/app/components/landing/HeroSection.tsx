import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Brain,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HeroSectionProps {
  onEnterApp: () => void;
}

export function HeroSection({ onEnterApp }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-teal-200/30 to-green-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-200 mb-6">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-600">
                  AI-Powered Recruitment
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Find Your Perfect
              <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                {" "}
                Candidate
              </span>
              <br />
              in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Transform your hiring process with AI-powered screening, automated
              workflows, and intelligent candidate matching. Hire faster, hire
              better.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                onClick={onEnterApp}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group font-semibold hover:bg-yellow-500"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-teal-600 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              {[
                "No credit card required",
                "Free 14-day trial",
                "24/7 Support",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - HR Professional Image with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main HR Professional Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758598306980-c47a94c6708c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwc3VpdCUyMG9mZmljZSUyMGVudmlyb25tZW50JTIwY29ycG9yYXRlfGVufDF8fHx8MTc3MDkyMTE0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional HR Recruiter"
                  className="w-full h-auto"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/10 to-transparent"></div>
              </div>

              {/* Floating Stats Cards - 3 Total */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Success Rate
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      94%
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Time Saved
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      48h
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl shadow-2xl p-5 text-white backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-7 h-7" />
                  <div>
                    <div className="text-xs font-medium opacity-90 mb-1">
                      AI Powered
                    </div>
                    <div className="text-2xl font-bold">Smart</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
