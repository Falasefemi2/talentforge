import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  onEnterApp: () => void;
}

export function CTASection({ onEnterApp }: CTASectionProps) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-green-600 to-emerald-600"></div>

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [180, 0, 180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              GET STARTED TODAY
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Hiring Process?
          </h2>

          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join 50,000+ recruiters who are already hiring faster and smarter
            with TalentForge. Start your free trial today – no credit card
            required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onEnterApp}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 group font-semibold"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all">
              Schedule a Demo
            </button>
          </div>

          <p className="text-white/80 mt-8">
            ✓ 14-day free trial &nbsp;&nbsp; ✓ No credit card required
            &nbsp;&nbsp; ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
