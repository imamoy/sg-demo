import { Briefcase, Home, User, Wallet } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { icon: Home, label: "首頁", active: true },
  { icon: Briefcase, label: "市場" },
  { icon: Wallet, label: "錢包" },
  { icon: User, label: "我的" },
];

export default function BottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      {BOTTOM_NAV_ITEMS.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`mobile-bottom-nav-item ${active ? "mobile-bottom-nav-item-active" : ""}`}
          type="button"
          aria-label={label}
        >
          <Icon className="h-6 w-6" strokeWidth={active ? 2.2 : 1.75} />
          {active && <span className="mobile-bottom-nav-dot" />}
        </button>
      ))}
    </nav>
  );
}
