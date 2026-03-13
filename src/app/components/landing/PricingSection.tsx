import { motion } from "motion/react";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";

interface PricingSectionProps {
  onEnterApp: () => void;
}

export function PricingSection({ onEnterApp }: PricingSectionProps) {
  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      price: "49",
      description: "Perfect for small teams and startups",
      features: [
        "Up to 5 active job postings",
        "100 candidate profiles/month",
        "Basic AI screening",
        "Email support",
        "Standard analytics",
        "Interview scheduling",
      ],
      color: "from-teal-600 to-green-600",
      popular: false,
    },
    {
      name: "Professional",
      icon: Zap,
      price: "149",
      description: "For growing companies with high-volume hiring",
      features: [
        "Unlimited job postings",
        "1,000 candidate profiles/month",
        "Advanced AI screening",
        "Priority support",
        "Advanced analytics",
        "Video interview integration",
        "Custom workflows",
        "Team collaboration",
      ],
      color: "from-green-600 to-emerald-600",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "Custom",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Unlimited candidate profiles",
        "Custom AI model training",
        "Dedicated account manager",
        "Custom integrations",
        "SSO & advanced security",
        "SLA guarantee",
        "White-label options",
      ],
      color: "from-emerald-600 to-teal-600",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
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
              PRICING
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing that scales with your hiring needs. Start with a
            14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 border-2 transition-all ${
                plan.popular
                  ? "border-transparent bg-gradient-to-br from-teal-600 to-green-600 text-white shadow-2xl"
                  : "border-gray-200 bg-white hover:border-teal-200 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    plan.popular
                      ? "bg-white/20"
                      : `bg-gradient-to-br ${plan.color}`
                  }`}
                >
                  <plan.icon
                    className={`w-7 h-7 ${plan.popular ? "text-white" : "text-white"}`}
                  />
                </div>
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`${plan.popular ? "text-white/80" : "text-gray-600"}`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  {plan.price !== "Custom" && (
                    <span
                      className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}
                    >
                      ${plan.price}
                    </span>
                  )}
                  {plan.price === "Custom" && (
                    <span
                      className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}
                    >
                      {plan.price}
                    </span>
                  )}
                  {plan.price !== "Custom" && (
                    <span
                      className={`${plan.popular ? "text-white/80" : "text-gray-600"}`}
                    >
                      /month
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-white" : "text-emerald-600"}`}
                    />
                    <span
                      className={`${plan.popular ? "text-white/90" : "text-gray-600"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onEnterApp}
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-teal-600 hover:bg-gray-50"
                    : "bg-yellow-400 text-gray-900 hover:shadow-lg hover:bg-yellow-500"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
