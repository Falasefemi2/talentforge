import { motion } from "motion/react";
import { Users, TrendingUp, Clock, Award } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Recruiters",
      color: "from-teal-600 to-teal-700",
    },
    {
      icon: TrendingUp,
      value: "2M+",
      label: "Candidates Screened",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Clock,
      value: "70%",
      label: "Faster Hiring",
      color: "from-pink-600 to-pink-700",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "User Rating",
      color: "from-orange-600 to-orange-700",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
