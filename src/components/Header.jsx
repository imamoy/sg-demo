import {
  ChevronDown,
  Languages,
  LayoutGrid,
  MoonStar,
  SunMedium,
  UserRound,
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
              alt="JeetWin"
            />
          </div>
        </div>

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

        <div
          className={`header-side-right ${activeStyle.headerRightGapClassName}`}
        >
          <div className="relative">
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
                      option.id === activeStyle.id
                        ? "switcher-option-active"
                        : ""
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

          <button className="user-chip" type="button" aria-label="Profile">
            <UserRound className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
