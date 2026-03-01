import BeforeAfter from "./BeforeAfter";

export default function Solution() {
  return (
    <section className="ac-section ac-section--accent" id="solucion">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Antes vs. Ahora</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          AutoClipper edita por ti.
          <br />
          <span className="ac-highlight">Detecta. Marca. Titula. Exporta.</span>
        </h2>
        <p className="ac-text ac-text--lead" data-reveal>
          Un plugin de Premiere Pro que convierte tu transcripcion en clips
          virales listos para subir. Automaticamente.
        </p>

        <BeforeAfter />
      </div>
    </section>
  );
}
