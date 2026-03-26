import { startTransition, useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import { SidebarLayout } from "./components/StyleLayouts";
import { ACTIVE_STYLE, HERO_SLIDES } from "./siteData";

const AUTO_PLAY_MS = 5000;
const COLOR_MODE_STORAGE_KEY = "sg-color-mode";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [colorMode, setColorMode] = useState(getInitialColorMode);

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

  function handleSlideSelect(index) {
    setCurrentSlide(index);
  }

  function handleColorModeToggle() {
    startTransition(() => {
      setColorMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
    });
  }

  const layoutProps = {
    activeStyle: ACTIVE_STYLE,
    activeSlide,
    currentSlide,
    onSlideSelect: handleSlideSelect,
  };

  return (
    <div className={`theme-shell ${ACTIVE_STYLE.themeClass} theme-mode-${colorMode}`}>
      <div className="page-frame">
        <Header
          activeStyle={ACTIVE_STYLE}
          colorMode={colorMode}
          onColorModeToggle={handleColorModeToggle}
        />
        <SidebarLayout {...layoutProps} />
      </div>
      <BottomNav />
    </div>
  );
}
