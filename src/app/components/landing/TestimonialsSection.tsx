import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head of Talent",
      company: "TechCorp Inc.",
      image: "SJ",
      rating: 5,
      text: "TalentForge reduced our time-to-hire by 60%. The AI screening is incredibly accurate and saves our team countless hours. Best recruitment platform we've used.",
    },
    {
      name: "Michael Chen",
      role: "HR Director",
      company: "InnovateLabs",
      image: "MC",
      rating: 5,
      text: "The candidate quality has improved dramatically since we started using TalentForge. The smart matching feature consistently delivers excellent candidates.",
    },
    {
      name: "Emily Rodriguez",
      role: "Recruitment Manager",
      company: "GrowthStartup",
      image: "ER",
      rating: 5,
      text: "As a fast-growing startup, we needed a solution that could scale with us. TalentForge's automation features let us hire 50+ people in 6 months.",
    },
    {
      name: "David Park",
      role: "VP of People",
      company: "CloudSystems",
      image: "DP",
      rating: 5,
      text: "The analytics and insights have transformed how we approach recruitment. We can now make data-driven decisions and optimize our hiring funnel.",
    },
    {
      name: "Lisa Thompson",
      role: "Talent Acquisition Lead",
      company: "DataDrive",
      image: "LT",
      rating: 5,
      text: "Interview scheduling used to be a nightmare. TalentForge's automated calendar management has eliminated all the back-and-forth emails.",
    },
    {
      name: "James Wilson",
      role: "CEO",
      company: "NextGen Solutions",
      image: "JW",
      rating: 5,
      text: "We've hired over 100 people using TalentForge. The ROI is incredible - we've cut recruitment costs by 40% while improving candidate quality.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-teal-50 via-green-50 to-white"
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
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by
            <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              50,000+ Recruiters
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what recruitment professionals are saying about TalentForge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all"
            >
              <Quote className="w-10 h-10 text-teal-200 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-teal-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
