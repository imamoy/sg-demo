import { startTransition, useEffect, useState } from "react";
import Header from "./components/Header";
import { HeroLayout, SidebarLayout } from "./components/StyleLayouts";
import { HERO_SLIDES, STYLE_OPTIONS } from "./siteData";

const AUTO_PLAY_MS = 5000;

function getStyleById(styleId) {
  return STYLE_OPTIONS.find((option) => option.id === styleId) ?? STYLE_OPTIONS[0];
}

export default function App() {
  const [activeStyleId, setActiveStyleId] = useState(STYLE_OPTIONS[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(STYLE_OPTIONS[0].dropdownOpenByDefault);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeStyle = getStyleById(activeStyleId);
  const activeSlide = HERO_SLIDES[currentSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % HERO_SLIDES.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, []);

  function handleStyleSelect(styleId) {
    const nextStyle = getStyleById(styleId);

    startTransition(() => {
      setActiveStyleId(styleId);
      setIsDropdownOpen(nextStyle.dropdownOpenByDefault);
    });
  }

  function handlePrevious() {
    setCurrentSlide((previous) =>
      previous === 0 ? HERO_SLIDES.length - 1 : previous - 1,
    );
  }

  function handleNext() {
    setCurrentSlide((previous) => (previous + 1) % HERO_SLIDES.length);
  }

  function handleSlideSelect(index) {
    setCurrentSlide(index);
  }

  const layoutProps = {
    activeStyle,
    activeSlide,
    currentSlide,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onSlideSelect: handleSlideSelect,
    slides: HERO_SLIDES,
    toneClassName: activeStyle.heroTone,
  };

  return (
    <div className={`theme-shell ${activeStyle.themeClass}`}>
      <div className="page-frame">
        <Header
          activeStyle={activeStyle}
          isDropdownOpen={isDropdownOpen}
          onDropdownToggle={() => setIsDropdownOpen((open) => !open)}
          onStyleSelect={handleStyleSelect}
        />

        {activeStyle.layout === "sidebar" ? (
          <SidebarLayout {...layoutProps} />
        ) : (
          <HeroLayout {...layoutProps} />
        )}
      </div>
    </div>
  );
}
