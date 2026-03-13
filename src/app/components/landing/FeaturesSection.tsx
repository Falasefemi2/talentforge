import { motion } from "motion/react";
import { Brain, Zap, Target, Shield, Calendar, BarChart3 } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Screening",
      description:
        "Intelligent candidate evaluation with machine learning algorithms that analyze resumes, skills, and experience to find perfect matches.",
      color: "from-teal-600 to-green-600",
      bgColor: "from-teal-50 to-green-50",
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description:
        "Streamline your recruitment process with automated email sequences, interview scheduling, and candidate communications.",
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: Target,
      title: "Smart Matching",
      description:
        "Advanced matching algorithms connect you with candidates who perfectly fit your requirements and company culture.",
      color: "from-yellow-600 to-amber-600",
      bgColor: "from-yellow-50 to-amber-50",
    },
    {
      icon: Calendar,
      title: "Interview Management",
      description:
        "Coordinate interviews seamlessly with integrated calendar, video conferencing, and automated reminders.",
      color: "from-orange-600 to-yellow-600",
      bgColor: "from-orange-50 to-yellow-50",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Make data-driven decisions with comprehensive recruitment analytics, pipeline metrics, and performance tracking.",
      color: "from-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description:
        "Enterprise-grade security with GDPR compliance, data encryption, and role-based access control.",
      color: "from-teal-600 to-cyan-600",
      bgColor: "from-teal-50 to-cyan-50",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-teal-600">
              FEATURES
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Hire Smarter
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to transform your recruitment process and
            help you find the best talent faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all h-full">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon
                    className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                    style={{
                      WebkitTextFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
