import {
  Sparkles,
  Brain,
  FileSearch,
  TrendingUp,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

import { Badge } from "./ui/badge";

export default function CardFeature() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms detect patterns and anomalies that humans might miss.",
      color: "text-blue-400",
    },
    {
      icon: FileSearch,
      title: "Deep Data Inspection",
      description:
        "Comprehensive scanning of every row, column, and cell to ensure complete data integrity.",
      color: "text-purple-400",
    },
    {
      icon: AlertTriangle,
      title: "Smart Issue Detection",
      description:
        "Automatically identify duplicates, missing values, format inconsistencies, and outliers.",
      color: "text-yellow-400",
    },
    {
      icon: TrendingUp,
      title: "Instant Recommendations",
      description:
        "Get actionable insights and suggested fixes to improve your data quality immediately.",
      color: "text-emerald-400",
    },
    {
      icon: BarChart3,
      title: "Visual Reports",
      description:
        "Beautiful, easy-to-understand dashboards showing the health of your datasets.",
      color: "text-pink-400",
    },
    {
      icon: Sparkles,
      title: "Auto-Enhancement",
      description:
        "One-click data cleaning and standardization powered by intelligent automation.",
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="border-t border border-dashed flex flex-col w-full ">
      <div className="ml-[154px] mr-[59px] border-l border-r pb-10">
        <div className="flex flex-col justify-center items-center py-10 ">
          <Badge variant="default" className="mb-3">
            <Sparkles />
            Powerful Features
          </Badge>
          <h1 className="text-xl font-semibold">
            Everything you need to trust your data
          </h1>
          <p className="text-xs text-muted-foreground">
            Comprehensive data quality analysis powered by cutting-edge AI
            technology
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-10/12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background/5 border border-emerald-900/30 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
