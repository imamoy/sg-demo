import { Clock3, TrendingUp } from "lucide-react";

export default function PredictionCard({ card, toneClassName }) {
  return (
    <article className={`prediction-card ${toneClassName}`}>
      <div className="prediction-header">
        <div className="prediction-header-main">
          <img className="prediction-avatar" src={card.avatarUrl} alt="" />
          <h3 className="prediction-title">{card.title}</h3>
        </div>
      </div>

      <div className="prediction-middle">
        <div className="prediction-side">
          <div className="prediction-progress-header">
            <span className="prediction-side-label">是</span>
            <div className="prediction-percent-group">
              <span className="prediction-yes">{card.yes}</span>
              <span className="prediction-percent-sign">%</span>
            </div>
          </div>
          <div className="prediction-progress-track prediction-progress-track-yes" aria-hidden="true" />
        </div>
        <div className="prediction-side prediction-side-right">
          <div className="prediction-progress-header prediction-progress-header-right">
            <span className="prediction-side-label">否</span>
            <div className="prediction-percent-group">
              <span className="prediction-no">{card.no}</span>
              <span className="prediction-percent-sign">%</span>
            </div>
          </div>
          <div className="prediction-progress-track prediction-progress-track-no" aria-hidden="true" />
        </div>
      </div>

      <div className="prediction-stats">
        <div className="prediction-stat-item">
          <TrendingUp className="h-3 w-3" />
          <span>{card.volume}</span>
        </div>
        <div className="prediction-stat-item">
          <Clock3 className="h-3 w-3" />
          <span>{card.time}</span>
        </div>
      </div>
    </article>
  );
}
