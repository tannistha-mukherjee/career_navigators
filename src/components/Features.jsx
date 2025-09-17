import { BarChart, PieChart, LineChart, ChevronRight } from "lucide-react";

const features = [
  {
    id: 1,
    icon: BarChart,
    title: "Analytics",
    description: "Track your data in real-time with our advanced analytics.",
    stats: "120+ reports",
    action: "View",
    color: "bg-blue-500",
    delay: "animate-fadeIn delay-100",
  },
  {
    id: 2,
    icon: PieChart,
    title: "Reports",
    description: "Generate detailed reports with a single click.",
    stats: "50+ templates",
    action: "Explore",
    color: "bg-green-500",
    delay: "animate-fadeIn delay-200",
  },
  {
    id: 3,
    icon: LineChart,
    title: "Growth",
    description: "Visualize your business growth with clear charts.",
    stats: "24/7 insights",
    action: "See",
    color: "bg-purple-500",
    delay: "animate-fadeIn delay-300",
  },
];

export default function Features() {
  return (
    <section className="pt-20 ml-64 px-6 lg:px-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div key={feature.id} className={`group cursor-pointer ${feature.delay}`}>
              <div className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                <div
                  className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">{feature.stats}</span>
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                    {feature.action}
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
