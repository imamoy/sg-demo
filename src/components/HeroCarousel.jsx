import { Clock3, TrendingUp, UsersRound } from "lucide-react";

function HeroContent({ slide }) {
  return (
    <div className="hero-content">
      <div className="hero-hot-pill">
        <span className="text-[12px]">🔥</span>
        <span>{slide.hotLabel}</span>
      </div>

      <div className="hero-text-stack">
        <p className="hero-category">{slide.category}</p>
        <h2 className="hero-title">{slide.title}</h2>
      </div>

      <div className="hero-bottom-stack">
        <div className="hero-yes-no-shell">
          <div className={`hero-yes-bar ${slide.yesBarClass}`}>
            <span className="hero-bar-label">是</span>
            <span className="hero-bar-value">{slide.yes}%</span>
          </div>
          <div className={`hero-no-bar ${slide.noBarClass}`}>
            <span className="hero-bar-value">{slide.no}%</span>
            <span className="hero-bar-label">否</span>
          </div>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{slide.volume}</span>
          </div>
          <div className="hero-stat-item">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{slide.resolution}</span>
          </div>
          <div className="hero-stat-item">
            <UsersRound className="h-3.5 w-3.5" />
            <span>{slide.traders}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSlide({ slide, className = "" }) {
  return (
    <article className={className}>
      <img className="hero-image" src={slide.imageUrl} alt="" />
      <div className="hero-overlay" />
      <HeroContent slide={slide} />
    </article>
  );
}

export function SidebarHero({ activeSlide, heroClassName }) {
  return (
    <section className={`${heroClassName} relative overflow-hidden`}>
      <HeroSlide slide={activeSlide} className="h-full w-full" />
    </section>
  );
}
