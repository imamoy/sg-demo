import { startTransition, useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import { HeroLayout, SidebarLayout } from "./components/StyleLayouts";
import { HERO_SLIDES, STYLE_OPTIONS } from "./siteData";

const AUTO_PLAY_MS = 5000;
const COLOR_MODE_STORAGE_KEY = "sg-color-mode";

function getStyleById(styleId) {
  return STYLE_OPTIONS.find((option) => option.id === styleId) ?? STYLE_OPTIONS[0];
}

function getInitialColorMode() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);

  if (savedMode === "light" || savedMode === "dark") {
    return savedMode;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function App() {
  const [activeStyleId, setActiveStyleId] = useState(STYLE_OPTIONS[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(STYLE_OPTIONS[0].dropdownOpenByDefault);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [colorMode, setColorMode] = useState(getInitialColorMode);

  const activeStyle = getStyleById(activeStyleId);
  const activeSlide = HERO_SLIDES[currentSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % HERO_SLIDES.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
  }, [colorMode]);

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

  function handleColorModeToggle() {
    startTransition(() => {
      setColorMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
    });
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
    <div className={`theme-shell ${activeStyle.themeClass} theme-mode-${colorMode}`}>
      <div className="page-frame">
        <Header
          activeStyle={activeStyle}
          colorMode={colorMode}
          isDropdownOpen={isDropdownOpen}
          onColorModeToggle={handleColorModeToggle}
          onDropdownToggle={() => setIsDropdownOpen((open) => !open)}
          onStyleSelect={handleStyleSelect}
        />

        {activeStyle.layout === "sidebar" ? (
          <SidebarLayout {...layoutProps} />
        ) : (
          <HeroLayout {...layoutProps} />
        )}
      </div>
      <BottomNav />
    </div>
  );
}
