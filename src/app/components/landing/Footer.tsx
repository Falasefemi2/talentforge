import { Sparkles, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Integrations", "Updates"],
    Company: ["About Us", "Careers", "Blog", "Press Kit", "Partners"],
    Resources: [
      "Documentation",
      "Help Center",
      "Community",
      "Webinars",
      "Templates",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "GDPR",
      "Compliance",
    ],
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">TalentForge</span>
            </div>
            <p className="text-slate-400 mb-6">
              AI-powered recruitment platform helping companies find and hire
              the best talent faster.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 TalentForge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
