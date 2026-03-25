import { useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  Languages,
  LayoutGrid,
  MoonStar,
  Search,
  SunMedium,
  UserRound,
  X,
} from "lucide-react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import { NAV_ITEMS, STYLE_OPTIONS } from "../siteData";

export default function Header({
  activeStyle,
  colorMode,
  isDropdownOpen,
  onColorModeToggle,
  onDropdownToggle,
  onStyleSelect,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const ColorModeIcon = colorMode === "dark" ? SunMedium : MoonStar;
  const colorModeLabel =
    colorMode === "dark" ? "切換為淺色模式" : "切換為深色模式";
  const colorModeLogo = colorMode === "dark" ? logoDark : logoLight;

  function handleMobileStyleSelect(id) {
    onStyleSelect(id);
    setIsMobileDropdownOpen(false);
  }

  return (
    <header
      className={`header-shell ${activeStyle.headerShellClassName ?? ""} ${activeStyle.headerHeightClassName} ${activeStyle.headerPaddingClassName}`}
    >
      <div className="header-inner">
        <div className="header-side-left">
          <div className="brand-mark-shell">
            <img
              className="brand-logo-image"
              src={colorModeLogo}
              alt="Predict Go"
            />
          </div>
        </div>

        {/* Desktop center nav */}
        <nav className={`header-nav-center ${activeStyle.navGapClassName}`}>
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              className={`nav-item ${activeStyle.navTextClassName} ${
                index === 0 ? "nav-item-active" : ""
              }`}
              type="button"
            >
              <span>{item}</span>
              {index === 0 ? (
                <span
                  className={`nav-underline ${activeStyle.navUnderlineWidthClassName}`}
                />
              ) : null}
            </button>
          ))}
        </nav>

        {/* Mobile search bar overlay */}
        {isSearchOpen && (
          <div className="mobile-search-bar">
            <button
              className="mobile-search-cancel"
              type="button"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-[18px] w-[18px]" />
            </button>
            <div className="mobile-search-input-shell">
              <input
                className="mobile-search-input"
                type="search"
                placeholder="搜尋活動..."
                autoFocus
              />
            </div>
            <button
              className="mobile-search-sort"
              type="button"
              aria-label="排序"
            >
              <ArrowUpDown className="h-[18px] w-[18px]" />
            </button>
          </div>
        )}

        <div
          className={`header-side-right ${activeStyle.headerRightGapClassName}${isSearchOpen ? " mobile-hidden" : ""}`}
        >
          {/* Desktop switcher — hidden on mobile via CSS */}
          <div className="desktop-switcher relative">
            <button
              className="switcher-button"
              type="button"
              onClick={onDropdownToggle}
            >
              <span className="switcher-button-label">
                <LayoutGrid className="h-4 w-4 text-[var(--accent)]" />
                <span>{activeStyle.label}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[var(--ink-soft)] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen ? (
              <div className="switcher-menu">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`switcher-option ${
                      option.id === activeStyle.id ? "switcher-option-active" : ""
                    }`}
                    type="button"
                    onClick={() => onStyleSelect(option.id)}
                  >
                    <span>{option.label}</span>
                    {option.id === activeStyle.id ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Mobile style switcher — hidden on desktop via CSS */}
          <div className="mobile-style-switcher relative">
            <button
              className="mobile-style-btn"
              type="button"
              onClick={() => setIsMobileDropdownOpen((o) => !o)}
            >
              <LayoutGrid className="h-[15px] w-[15px]" />
              <span className="mobile-style-label">切換樣式</span>
              <ChevronDown
                className={`h-[11px] w-[11px] transition-transform duration-200 ${
                  isMobileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMobileDropdownOpen ? (
              <div className="switcher-menu switcher-menu-mobile-left">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`switcher-option ${
                      option.id === activeStyle.id ? "switcher-option-active" : ""
                    }`}
                    type="button"
                    onClick={() => handleMobileStyleSelect(option.id)}
                  >
                    <span>{option.label}</span>
                    {option.id === activeStyle.id ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            className="theme-toggle-button"
            type="button"
            aria-label={colorModeLabel}
            title={colorModeLabel}
            onClick={onColorModeToggle}
          >
            <ColorModeIcon className="h-4 w-4" />
          </button>

          <div className="lang-chip">
            <Languages className="h-4 w-4" />
            <span className="whitespace-nowrap">中文</span>
          </div>

          {/* Desktop user button */}
          <button
            className="user-chip desktop-user-btn"
            type="button"
            aria-label="會員"
          >
            <UserRound className="h-4 w-4" />
          </button>

          {/* Mobile search button */}
          <button
            className="user-chip mobile-search-btn"
            type="button"
            aria-label="搜尋"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
