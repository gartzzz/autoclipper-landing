export default function StatBar() {
  return (
    <div className="ac-stat-bar" data-reveal-group>
      <div className="ac-stat-bar__item" data-reveal-child>
        <div className="ac-stat">
          <span className="ac-stat__value">
            <span className="ac-text--accent-cyan">45 min</span>
            {" → "}
            <span className="ac-stat__value--cyan">5 min</span>
          </span>
          <span className="ac-stat__label">Tiempo de clipeo</span>
        </div>
      </div>
      <div className="ac-stat-bar__divider" data-reveal-child />
      <div className="ac-stat-bar__item" data-reveal-child>
        <div className="ac-stat">
          <span className="ac-stat__value">
            <span className="ac-text--accent-cyan">2 clips</span>
            {" → "}
            <span className="ac-stat__value--magenta">12 clips</span>
          </span>
          <span className="ac-stat__label">Clips por video</span>
        </div>
      </div>
      <div className="ac-stat-bar__divider" data-reveal-child />
      <div className="ac-stat-bar__item" data-reveal-child>
        <div className="ac-stat">
          <span className="ac-stat__value ac-stat__value--cyan">$49</span>
          <span className="ac-stat__label">Un solo pago</span>
        </div>
      </div>
    </div>
  );
}
