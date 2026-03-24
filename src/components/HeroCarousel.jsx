import { ArrowLeft, ArrowRight, Clock3, TrendingUp, UsersRound } from "lucide-react";

function HeroContent({ slide, ribbon = false }) {
  const progressShellClassName = ribbon ? "hero-yes-no-shell hero-yes-no-shell-ribbon" : "hero-yes-no-shell";
  const progressShellStyle = ribbon
    ? {
        gridTemplateColumns: `minmax(128px, ${Math.max(slide.yes, 1)}fr) minmax(128px, ${Math.max(slide.no, 1)}fr)`,
      }
    : undefined;

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
        <div className={progressShellClassName} style={progressShellStyle}>
          <div className={ribbon ? "hero-yes-bar" : `hero-yes-bar ${slide.yesBarClass}`}>
            <span className="hero-bar-label">是</span>
            <span className="hero-bar-value">{slide.yes}%</span>
          </div>
          <div className={ribbon ? "hero-no-bar" : `hero-no-bar ${slide.noBarClass}`}>
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

function HeroArrows({ onNext, onPrevious, ribbon }) {
  const previousClassName = ribbon
    ? "ribbon-arrow ribbon-arrow-prev"
    : "hero-arrow left-[-12px]";
  const nextClassName = ribbon
    ? "ribbon-arrow ribbon-arrow-next"
    : "hero-arrow right-[18px]";

  return (
    <>
      <button className={previousClassName} type="button" onClick={onPrevious}>
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button className={nextClassName} type="button" onClick={onNext}>
        <ArrowRight className="h-4 w-4" />
      </button>
    </>
  );
}

function HeroSlide({ slide, className = "", ribbon = false }) {
  return (
    <article className={className}>
      <img className="hero-image" src={slide.imageUrl} alt="" />
      <div className="hero-overlay" />
      <HeroContent slide={slide} ribbon={ribbon} />
    </article>
  );
}

export function SidebarHero({ activeSlide, heroClassName, onNext, onPrevious }) {
  return (
    <section className={`${heroClassName} relative overflow-hidden`}>
      <HeroSlide slide={activeSlide} className="h-full w-full" />
    </section>
  );
}

export function RibbonHeroCarousel({
  heroClassName,
  currentSlide,
  onNext,
  onPrevious,
  slides,
}) {
  const previousSlide =
    currentSlide === 0 ? slides[slides.length - 1] : slides[currentSlide - 1];
  const nextSlide =
    currentSlide === slides.length - 1 ? slides[0] : slides[currentSlide + 1];
  const visibleSlides = [previousSlide, slides[currentSlide], nextSlide];

  return (
    <section className={`${heroClassName} relative overflow-hidden`}>
      <div className="ribbon-track">
        {visibleSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            ribbon
            slide={slide}
            className={`ribbon-slide-shell ${index === 1 ? "ribbon-slide-main" : "ribbon-slide-preview"}`}
          />
        ))}
      </div>

      <div className="ribbon-shade-left" />
      <div className="ribbon-shade-right" />
      <HeroArrows onNext={onNext} onPrevious={onPrevious} ribbon />
    </section>
  );
}
