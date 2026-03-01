export default function Footer() {
  return (
    <footer className="ac-footer">
      <div className="ac-footer__inner">
        <div className="ac-footer__brand">
          <span className="ac-footer__logo">AutoClipper</span>
          <p className="ac-text ac-text--small">
            Detecta momentos virales con IA. Directo en Premiere Pro.
          </p>
        </div>
        <div className="ac-footer__links">
          <a
            href="https://github.com/gartzzz/autoclipper"
            className="ac-footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#como-funciona" className="ac-footer__link">
            Como funciona
          </a>
          <a href="#features" className="ac-footer__link">
            Features
          </a>
        </div>
        <div className="ac-footer__copy">
          <p className="ac-text ac-text--small">
            &copy; {new Date().getFullYear()} AutoClipper. Hecho para creadores
            que no tienen tiempo que perder.
          </p>
        </div>
      </div>
    </footer>
  );
}
