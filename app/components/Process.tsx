const steps = [
  {
    number: "01",
    title: "Pega la transcripcion",
    description:
      "Abre el panel de AutoClipper en Premiere. Pega el texto de tu video. Un campo, un boton. La IA analiza cada segundo de tu contenido y puntua los momentos del 0 al 100 en 7 factores virales.",
  },
  {
    number: "02",
    title: "Revisa y aprueba con el teclado",
    description:
      "Navega entre momentos virales con atajos de teclado. Flecha derecha aprueba, izquierda descarta, Espacio reproduce. Ves el score, el desglose de factores y decides en 2 segundos. Sin tocar el raton.",
  },
  {
    number: "03",
    title: "AutoClipper hace el resto",
    description:
      "Los clips aprobados se marcan en tu timeline automaticamente. AutoClipper les agrega titulos y subtitulos, y los deja listos para exportar a TikTok, Reels y Shorts. Tu solo le das al boton.",
  },
];

export default function Process() {
  return (
    <section className="ac-section" id="como-funciona">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Como funciona</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          3 pasos. Cero complicaciones.
          <br />
          Del video largo al clip viral en minutos.
        </h2>

        <div className="ac-process-steps ac-process-steps--horizontal" data-reveal-group>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`ac-process-step${i === 0 ? " ac-process-step--active" : ""}`}
              data-reveal-child
            >
              <div className="ac-process-step__number">{step.number}</div>
              <div className="ac-process-step__connector" />
              <div className="ac-process-step__content">
                <h3 className="ac-process-step__title">{step.title}</h3>
                <p className="ac-process-step__description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
