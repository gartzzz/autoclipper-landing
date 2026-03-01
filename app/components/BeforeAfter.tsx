const beforeMetrics = [
  { value: "3+ horas", label: "scrubbing manual por video" },
  { value: "2-3 clips", label: "elegidos por intuicion" },
  { value: "0 datos", label: "sobre por que un clip funciona" },
  { value: "Manual", label: "titulos, subtitulos, exportacion" },
];

const afterMetrics = [
  { value: "5 min", label: "analisis completo con IA" },
  { value: "10-15 clips", label: "puntuados por potencial viral" },
  { value: "7 factores", label: "scoring desglosado por clip" },
  { value: "Automatico", label: "marcas, titulos, subs y export" },
];

export default function BeforeAfter() {
  return (
    <div className="ac-before-after" data-reveal="scale">
      <div className="ac-before-after__side ac-before-after__side--before">
        <span className="ac-before-after__label">Sin AutoClipper</span>
        <div className="ac-before-after__metrics">
          {beforeMetrics.map((m, i) => (
            <div key={i} className="ac-before-after__metric ac-before-after__metric--stagger" style={{ "--ba-i": i } as React.CSSProperties}>
              <span className="ac-before-after__metric-value">{m.value}</span>
              <span className="ac-before-after__metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ac-before-after__side ac-before-after__side--after">
        <span className="ac-before-after__label">Con AutoClipper</span>
        <div className="ac-before-after__metrics">
          {afterMetrics.map((m, i) => (
            <div key={i} className="ac-before-after__metric ac-before-after__metric--stagger" style={{ "--ba-i": i } as React.CSSProperties}>
              <span className="ac-before-after__metric-value">{m.value}</span>
              <span className="ac-before-after__metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
