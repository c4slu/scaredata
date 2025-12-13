import { Clock, DollarSign, Users, Shield, Zap, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce data quality checks from days to minutes",
      metric: "95% faster",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      description: "Prevent costly mistakes caused by bad data",
      metric: "$2M+ saved",
      gradient: "from-emerald-500/20 to-green-500/20",
    },
    {
      icon: Users,
      title: "Empower Teams",
      description: "Enable everyone to work with trustworthy data",
      metric: "10x productivity",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Shield,
      title: "Ensure Compliance",
      description: "Meet regulatory standards and data governance requirements",
      metric: "100% compliant",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Zap,
      title: "Accelerate Decisions",
      description: "Make confident decisions based on reliable data",
      metric: "3x faster",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Target,
      title: "Improve Accuracy",
      description: "Achieve higher data quality scores across all datasets",
      metric: "99.9% accuracy",
      gradient: "from-pink-500/20 to-purple-500/20",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Files Analyzed" },
    { value: "1M+", label: "Issues Detected" },
    { value: "500+", label: "Happy Customers" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <section className=" relative overflow-hidden border-t  border-dashed  ">
      <div className=" py-20 border-r border-l ml-[155px] mr-[60px]">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Benefits Grid */}
          <div className="text-center mb-16">
            <h2 className="text-white mb-4 text-xl font-semibold">
              Why Choose Scare Data?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform your data quality process and unlock the full potential
              of your data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group border bg-background/5 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:transform hover:scale-105"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div className="mb-2">
                  <span className="text-emerald-400">{benefit.metric}</span>
                </div>
                <h3 className="text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="bg-linear-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-emerald-500/30 rounded-2xl p-8 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-emerald-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
