import { Home, FileText, Users, Settings } from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "Documents" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed top-16 bottom-0 left-0 overflow-y-auto p-4">
      <ul className="space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={item.label}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fadeIn"
            >
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
