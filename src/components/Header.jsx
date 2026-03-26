import { useState } from "react";
import {
  ArrowUpDown,
  Languages,
  MoonStar,
  Search,
  SunMedium,
  UserRound,
  X,
} from "lucide-react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import { NAV_ITEMS } from "../siteData";

export default function Header({ activeStyle, colorMode, onColorModeToggle }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const ColorModeIcon = colorMode === "dark" ? SunMedium : MoonStar;
  const colorModeLabel =
    colorMode === "dark" ? "切換為淺色模式" : "切換為深色模式";
  const colorModeLogo = colorMode === "dark" ? logoDark : logoLight;

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
