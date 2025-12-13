import { Upload, Cog, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Upload Your Data",
      description:
        "Import your Excel, CSV, JSON, or structured files with a single click.",
      details: [
        "Drag & drop support",
        "Multiple file formats",
        "Batch processing",
      ],
    },
    {
      number: "2",
      icon: Cog,
      title: "AI Quality Analysis",
      description:
        "Our AI scans for errors, inconsistencies, anomalies, and risks.",
      details: ["Pattern recognition", "Anomaly detection", "Smart validation"],
    },
    {
      number: "3",
      icon: Lightbulb,
      title: "Get Actionable Insights",
      description:
        "Receive detailed findings, scores, and recommendations to fix issues.",
      details: ["Visual reports", "Priority scoring", "Fix suggestions"],
    },
  ];

  const analysisItems = [
    {
      icon: CheckCircle,
      text: "Missing and null values",
      color: "text-red-400",
    },
    { icon: CheckCircle, text: "Duplicate records", color: "text-orange-400" },
    {
      icon: CheckCircle,
      text: "Invalid formats and patterns",
      color: "text-yellow-400",
    },
    {
      icon: CheckCircle,
      text: "Outliers and anomalies",
      color: "text-purple-400",
    },
    {
      icon: CheckCircle,
      text: "Consistency across columns",
      color: "text-blue-400",
    },
    {
      icon: CheckCircle,
      text: "Business rule violations",
      color: "text-pink-400",
    },
    {
      icon: CheckCircle,
      text: "Statistical and semantic data issues",
      color: "text-cyan-400",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden ml-[155px] mr-[60px] border-l border-r  ">
      {/* Quote Section */}
      <div className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-gray-400 text-lg italic">
              "Data you can't trust is data you can't use."
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-emerald-400">Scare Data</span>
                <span className="text-white">
                  {" "}
                  uses artificial intelligence to analyze, score, and explain
                  the quality of your datasets in minutes —{" "}
                </span>
                <span className="text-emerald-400">no setup, no coding</span>
                <span className="text-white">.</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                <span className="text-xs">Trusted by data teams worldwide</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl blur-2xl" />
            <div className="relative bg-[#0f2d3d]/80 backdrop-blur border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    98.7% data quality score
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    154 issues detected & fixed
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    Analysis completed in 1.2 min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4 text-xl font-semibold">
            How It Works
          </h2>
          <p className="text-gray-400">Three simple steps to trusted data</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-background/5 border border-emerald-900/30 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400">{step.number}</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-emerald-500/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* What We Analyze */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-4">What We Analyze</h2>
            <p className="text-gray-400 mb-8">
              Comprehensive data quality checks across multiple dimensions
            </p>
            <div className="bg-background/5 border border-emerald-500/30 rounded-xl p-6 inline-flex items-center gap-3">
              <Cog
                className="w-5 h-5 text-emerald-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span className="text-white">
                All powered by AI-driven intelligence
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {analysisItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#0f2d3d]/50 border border-emerald-900/30 rounded-lg p-4 flex items-center gap-3 hover:border-emerald-500/50 transition-all hover:transform hover:translate-x-2"
              >
                <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                <span className="text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
