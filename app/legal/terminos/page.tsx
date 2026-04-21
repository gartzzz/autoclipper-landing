import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y condiciones — AutoClipper",
  description:
    "Terminos y condiciones de uso de AutoClipper, plugin de Adobe Premiere Pro.",
};

const lastUpdated = "21 de abril de 2026";

const h2: React.CSSProperties = {
  fontFamily: "var(--ac-font-sans)",
  fontSize: "var(--ac-text-xl)",
  fontWeight: "var(--ac-weight-semibold)",
  color: "var(--ac-text-primary)",
  marginTop: "var(--ac-space-8)",
  marginBottom: "var(--ac-space-3)",
};

const p: React.CSSProperties = {
  fontFamily: "var(--ac-font-sans)",
  fontSize: "var(--ac-text-md)",
  color: "var(--ac-text-secondary)",
  marginBottom: "var(--ac-space-4)",
};

const ul: React.CSSProperties = {
  ...p,
  paddingLeft: "var(--ac-space-5)",
};

export default function TerminosPage() {
  return (
    <article>
      <span className="ac-heading--eyebrow">Legal</span>
      <h1
        className="ac-heading ac-heading--2"
        style={{ marginTop: "var(--ac-space-3)" }}
      >
        Terminos y condiciones
      </h1>
      <p
        className="ac-text ac-text--small"
        style={{ marginTop: "var(--ac-space-2)", opacity: 0.6 }}
      >
        Ultima actualizacion: {lastUpdated}
      </p>

      <h2 style={h2}>1. Identificacion del titular</h2>
      <p style={p}>
        El presente sitio web y el producto AutoClipper (en adelante, el
        &quot;Producto&quot;) son titularidad de:
      </p>
      <ul style={ul}>
        <li>Titular: Mikel Gomez Garcia</li>
        <li>NIF: 78994007R</li>
        <li>Domicilio fiscal: Arestiortu 1, Elorrio, Bizkaia, Espana</li>
        <li>Email de contacto: hola@elestudioeme.com</li>
        <li>Actividad: desarrollo y comercializacion de software</li>
      </ul>

      <h2 style={h2}>2. Objeto</h2>
      <p style={p}>
        Los presentes terminos regulan la adquisicion y el uso de AutoClipper,
        una extension (plugin) para Adobe Premiere Pro que analiza
        transcripciones de video mediante inteligencia artificial local (Ollama
        + Gemma) y sugiere cortes de clip. La compra se realiza mediante un
        unico pago y otorga una licencia de uso perpetua sobre la version
        adquirida, sin caracter de suscripcion.
      </p>

      <h2 style={h2}>3. Formalizacion de la compra y entrega</h2>
      <p style={p}>
        El proceso de compra se completa a traves de la plataforma Stripe. Una
        vez confirmado el pago, el comprador recibira en la direccion de correo
        electronico facilitada un mensaje con el enlace de descarga del
        Producto y las instrucciones de instalacion. La entrega se considera
        realizada en el momento en que dicho correo es enviado.
      </p>

      <h2 style={h2}>4. Licencia de uso</h2>
      <p style={p}>
        AutoClipper se licencia, no se vende. La compra otorga al usuario una
        licencia no exclusiva, personal, intransferible, valida para una unica
        persona fisica, con las siguientes limitaciones:
      </p>
      <ul style={ul}>
        <li>
          Puede instalarse en los equipos personales del comprador que use de
          forma habitual.
        </li>
        <li>
          Queda prohibida la reventa, redistribucion, sublicencia, cesion o
          puesta a disposicion de terceros del Producto o de sus archivos.
        </li>
        <li>
          Queda prohibida la ingenieria inversa, descompilacion o extraccion
          del codigo mas alla de lo permitido por la ley aplicable.
        </li>
        <li>
          Las actualizaciones de la misma version principal (v1.x) se
          proporcionan sin coste adicional a los usuarios con licencia valida.
          Versiones principales posteriores (v2.x, v3.x) pueden requerir una
          compra adicional.
        </li>
      </ul>

      <h2 style={h2}>5. Propiedad intelectual</h2>
      <p style={p}>
        Todos los derechos de propiedad intelectual e industrial del Producto,
        incluyendo su codigo fuente, interfaz, textos, graficos, marca y
        cualquier otro elemento, son titularidad de Mikel Gomez Garcia o de sus
        licenciantes. Ninguna disposicion de estos terminos supone cesion de
        dichos derechos al usuario mas alla del alcance de la licencia de uso
        descrita en el punto 4.
      </p>

      <h2 style={h2}>6. Requisitos tecnicos</h2>
      <p style={p}>
        AutoClipper requiere una version compatible de Adobe Premiere Pro
        (indicada en el manifest del plugin) y una instalacion local de Ollama
        con un modelo Gemma 4 descargado. El rendimiento y la calidad de los
        resultados dependen del hardware del usuario (RAM, CPU, GPU/VRAM) y del
        modelo seleccionado. El titular no garantiza el funcionamiento del
        Producto en configuraciones de hardware o software distintas a las
        documentadas.
      </p>

      <h2 style={h2}>7. Limitacion de responsabilidad</h2>
      <p style={p}>
        AutoClipper se proporciona &quot;tal cual&quot;. El titular no garantiza
        que los resultados de la IA sean adecuados para un fin concreto, ni que
        los clips sugeridos tengan una calidad o potencial viral determinado.
        La decision editorial final corresponde siempre al usuario. En la
        maxima medida permitida por la ley, el titular no sera responsable de
        danos indirectos, lucro cesante, perdida de datos o perjuicios
        derivados del uso o imposibilidad de uso del Producto. La
        responsabilidad total del titular en caso de reclamacion quedara
        limitada al importe efectivamente pagado por el usuario por la
        licencia.
      </p>

      <h2 style={h2}>8. Politica de no-reembolso</h2>
      <p style={p}>
        Al tratarse de un producto digital de descarga inmediata, una vez
        iniciada la descarga el usuario renuncia expresamente al derecho de
        desistimiento conforme al articulo 103.m del RDL 1/2007. Consulta la{" "}
        <a
          href="/legal/reembolso"
          style={{ color: "var(--ac-cyan)", textDecoration: "underline" }}
        >
          politica de no-reembolso
        </a>{" "}
        para los detalles y las excepciones previstas.
      </p>

      <h2 style={h2}>9. Modificaciones</h2>
      <p style={p}>
        El titular podra modificar los presentes terminos por razones legales,
        fiscales o de evolucion del Producto. Los cambios se publicaran en esta
        misma URL con la fecha de ultima actualizacion visible. El uso
        continuado del Producto tras la publicacion implica aceptacion de la
        nueva version.
      </p>

      <h2 style={h2}>10. Ley aplicable y jurisdiccion</h2>
      <p style={p}>
        Los presentes terminos se rigen por la legislacion espanola. Para la
        resolucion de cualquier controversia, las partes se someten a los
        juzgados y tribunales del domicilio del titular, salvo que la
        normativa aplicable al consumidor disponga un fuero distinto
        obligatorio.
      </p>

      <p
        className="ac-text ac-text--small"
        style={{ marginTop: "var(--ac-space-10)", opacity: 0.6 }}
      >
        Dudas sobre estos terminos? Escribe a hola@elestudioeme.com.
      </p>
    </article>
  );
}
