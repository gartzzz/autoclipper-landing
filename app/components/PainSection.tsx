import TranscriptWall from "./TranscriptWall";

export default function PainSection() {
  return (
    <section className="ac-section" id="problemas">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">El problema real</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          45 minutos de transcripcion.
          <br />
          El momento viral esta ahi. <span className="ac-highlight">En alguna parte.</span>
        </h2>

        <div data-reveal>
          <TranscriptWall />
        </div>

        <div className="stack stack--4" style={{ maxWidth: "60ch", marginTop: "var(--ac-space-8)" }} data-reveal>
          <p className="ac-text ac-text--body">
            Llevas una hora y media con el video abierto. Rebobinas. Escuchas.
            Rebobinas otra vez. Crees que en el minuto 23 dijiste algo bueno,
            pero no estas seguro. Avanzas. Retrocedes. Pones una marca. La
            borras. Pones otra.
          </p>
          <p className="ac-text ac-text--body">
            Al final eliges los que puedes, no los que deberias. Los subes. 200
            views. Y un creador con la mitad de tu talento sube 28 segundos
            perfectos y revienta. La diferencia no es el contenido. Es que el
            no busco a ciegas.
          </p>
        </div>
      </div>
    </section>
  );
}
