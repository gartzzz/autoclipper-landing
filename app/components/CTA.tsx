export default function CTA() {
  return (
    <section className="ac-section ac-section--cta" id="descargar">
      <div className="ac-section__inner">
        <div className="ac-cta-block" data-reveal="scale">
          <span className="ac-heading--eyebrow">Deja de perder el tiempo</span>
          <h2 className="ac-heading ac-heading--2">
            Tus mejores momentos ya estan en el video.
            <br />
            <span className="ac-highlight">
              Solo necesitas quien los encuentre.
            </span>
          </h2>
          <p
            className="ac-text ac-text--lead"
            style={{ textAlign: "center" }}
          >
            No es cuestion de talento. Tu contenido ya es bueno. El problema
            es que los mejores 30 segundos se te escapan enterrados en 40
            minutos de timeline. AutoClipper los encuentra, los marca, les
            pone titulo y los deja listos para subir. La pregunta no es si
            funciona. Es cuanto tiempo mas vas a seguir haciendolo a mano.
          </p>
          <div className="ac-cta-block__actions">
            <a
              href="https://github.com/gartzzz/autoclipper"
              className="ac-button ac-button--primary ac-button--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargalo gratis
              <span className="ac-button__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#como-funciona" className="ac-button ac-button--ghost">
              Ver como funciona
            </a>
          </div>
          <p className="ac-cta-block__subtext">
            Sin tarjeta &middot; $0 para empezar &middot; Setup en 2 minutos
          </p>
        </div>
      </div>
    </section>
  );
}
