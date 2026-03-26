import { useState } from "react";
import {
  Banknote,
  Bitcoin,
  ChevronRight,
  Cpu,
  FlaskConical,
  Globe,
  Landmark,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Zap,
  ChartColumnIncreasing,
} from "lucide-react";
import { PREDICTION_CARDS, SIDEBAR_ITEMS } from "../siteData";
import { SidebarHero } from "./HeroCarousel";
import PredictionCard from "./PredictionCard";

const SIDEBAR_ICONS = {
  banknote: Banknote,
  bitcoin: Bitcoin,
  chart: ChartColumnIncreasing,
  chevron: ChevronRight,
  cpu: Cpu,
  flask: FlaskConical,
  globe: Globe,
  grid: LayoutGrid,
  landmark: Landmark,
  star: Star,
  "trending-up": TrendingUp,
  zap: Zap,
};

function SearchRow({ activeStyle }) {
  const searchHeightClassName = activeStyle.searchFieldHeightClassName ?? "h-10";

  return (
    <div className="search-row-shell">
      <div className={`search-field-shell ${searchHeightClassName}`}>
        <Search className="h-4 w-4 text-[var(--ink-soft)]" />
        <span>搜尋活動...</span>
      </div>
    </div>
  );
}

function StatusDots({ currentSlide, onSlideSelect }) {
  const dotClassNames = ["w-[36px]", "w-[24px]", "w-[24px]"];

  return (
    <div className="flex items-center justify-center gap-[10px]">
      {dotClassNames.map((widthClassName, index) => (
        <button
          key={widthClassName + index}
          className={`status-dot ${widthClassName} ${currentSlide === index ? "status-dot-active" : ""}`}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSlideSelect(index)}
        />
      ))}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar-shell">
      <nav className="sidebar-menu" aria-label="分類">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = SIDEBAR_ICONS[item.icon];

          return (
            <button
              key={item.id}
              className={`sidebar-item ${item.active ? "sidebar-item-active" : ""} ${
                item.tone === "signal" ? "sidebar-item-signal" : ""
              }`}
              type="button"
            >
              <span className="sidebar-item-leading">
                <Icon className="sidebar-item-icon" strokeWidth={1.9} />
                <span className="sidebar-item-label">{item.label}</span>
              </span>
              {item.count ? <span className="sidebar-item-count">{item.count}</span> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function MobileCategoryTabs() {
  const [activeId, setActiveId] = useState("all");
  const activeItem = SIDEBAR_ITEMS.find((item) => item.id === activeId);
  const hasSubItems = activeItem?.subItems?.length > 0;

  return (
    <div className="mobile-cat-wrapper">
      <div className="mobile-cat-tabs-shell">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = SIDEBAR_ICONS[item.icon];
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`mobile-cat-tab ${isActive ? "mobile-cat-tab-active" : ""} ${item.tone === "signal" ? "mobile-cat-tab-signal" : ""}`}
              type="button"
              onClick={() => setActiveId(item.id)}
            >
              <Icon className="mobile-cat-tab-icon" strokeWidth={1.9} />
              <span className="mobile-cat-tab-label">{item.label}</span>
            </button>
          );
        })}
      </div>
      {hasSubItems && (
        <div className="mobile-cat-sub-row">
          {activeItem.subItems.map((sub, i) => (
            <button
              key={sub}
              className={`mobile-cat-sub-item ${i === 0 ? "mobile-cat-sub-item-active" : ""}`}
              type="button"
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CardGrid({ activeStyle }) {
  return (
    <div className={`card-grid ${activeStyle.gridClassName}`}>
      {PREDICTION_CARDS.map((card) => (
        <PredictionCard key={card.title} card={card} toneClassName={activeStyle.cardTone} />
      ))}
    </div>
  );
}

export function SidebarLayout({
  activeStyle,
  activeSlide,
  currentSlide,
  onSlideSelect,
}) {
  return (
    <>
      <MobileCategoryTabs />
      <div className={`site-body-grid ${activeStyle.sidebarGridClassName ?? ""}`}>
        <Sidebar />
        <main className="sidebar-main">
          <div className={`sidebar-content-stack ${activeStyle.sidebarStackClassName ?? "gap-6"}`}>
            <SidebarHero
              activeSlide={activeSlide}
              heroClassName={activeStyle.heroClassName}
            />
            <StatusDots currentSlide={currentSlide} onSlideSelect={onSlideSelect} />
            <SearchRow activeStyle={activeStyle} />
            <CardGrid activeStyle={activeStyle} />
          </div>
        </main>
      </div>
    </>
  );
}
