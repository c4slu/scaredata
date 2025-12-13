import {
  MousePointer2,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "API", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Documentation", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
    resources: [
      { label: "Help Center", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Community", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
      { label: "Security", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-background/5 border-t border-emerald-900/30">
      {/* Newsletter Section */}
      <div className="container mx-auto px-6 py-12 border-b border-emerald-900/30">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-white mb-2">Stay updated</h3>
            <p className="text-gray-400 text-sm">
              Get the latest news, updates, and data quality tips delivered to
              your inbox.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#0f2d3d] border border-emerald-900/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MousePointer2 className="w-8 h-8 text-white" />
              <span className="text-white">Scare Data</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Turn raw data into trusted data with AI-powered quality analysis
              in minutes.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-[#0f2d3d] border border-emerald-900/30 rounded-lg flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                >
                  <social.icon className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white mb-4 text-sm">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Scare Data. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
              >
                Status
              </a>
              <a
                href="#"
                className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
              >
                Sitemap
              </a>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-gray-400 text-sm">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
