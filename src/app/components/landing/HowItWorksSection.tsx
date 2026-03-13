import { motion } from "motion/react";
import { Upload, Brain, Users, CheckCircle2 } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Post Your Job",
      description:
        "Create compelling job listings with our AI-powered job description generator in minutes.",
      color: "from-teal-600 to-green-600",
      number: "01",
    },
    {
      icon: Brain,
      title: "AI Screens Candidates",
      description:
        "Our intelligent system automatically evaluates and ranks candidates based on your criteria.",
      color: "from-green-600 to-emerald-600",
      number: "02",
    },
    {
      icon: Users,
      title: "Review Top Matches",
      description:
        "Focus on pre-qualified candidates with detailed insights and compatibility scores.",
      color: "from-emerald-600 to-teal-600",
      number: "03",
    },
    {
      icon: CheckCircle2,
      title: "Schedule & Hire",
      description:
        "Coordinate interviews and extend offers seamlessly with automated workflows.",
      color: "from-teal-600 to-green-600",
      number: "04",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-green-600">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Hire in
            <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes hiring effortless, from posting to
            offer acceptance.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-green-200 to-emerald-200 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all">
                  {/* Number Badge */}
                  <div
                    className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {step.number}
                  </div>

                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
