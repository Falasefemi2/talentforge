import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { StatsSection } from "./StatsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { PricingSection } from "./PricingSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

interface LandingPageProps {
  onEnterApp: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onViewJobs: () => void;
}

export function LandingPage({
  onEnterApp,
  onLogin,
  onRegister,
  onViewJobs,
}: LandingPageProps) {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                TalentForge
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <button
                onClick={onViewJobs}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Jobs
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onLogin}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={onRegister}
                className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-lg hover:shadow-lg hover:bg-yellow-500 transition-all font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <HeroSection onEnterApp={onEnterApp} />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection onEnterApp={onRegister} />
      <CTASection onEnterApp={onRegister} />
      <Footer />
    </div>
  );
}
