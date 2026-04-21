import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de privacidad — AutoClipper",
  description:
    "Como trata AutoClipper tus datos personales conforme al RGPD y la LSSI.",
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

export default function PrivacidadPage() {
  return (
    <article>
      <span className="ac-heading--eyebrow">Legal</span>
      <h1
        className="ac-heading ac-heading--2"
        style={{ marginTop: "var(--ac-space-3)" }}
      >
        Politica de privacidad
      </h1>
      <p
        className="ac-text ac-text--small"
        style={{ marginTop: "var(--ac-space-2)", opacity: 0.6 }}
      >
        Ultima actualizacion: {lastUpdated}
      </p>

      <h2 style={h2}>1. Responsable del tratamiento</h2>
      <ul style={ul}>
        <li>Responsable: Mikel Gomez Garcia</li>
        <li>NIF: 78994007R</li>
        <li>Domicilio: Arestiortu 1, Elorrio, Bizkaia, Espana</li>
        <li>Email: hola@elestudioeme.com</li>
      </ul>

      <h2 style={h2}>2. Datos que tratamos</h2>
      <p style={p}>Tratamos las siguientes categorias de datos:</p>
      <ul style={ul}>
        <li>
          <strong>Datos de compra</strong>: nombre, direccion de correo
          electronico y pais. Recogidos directamente del usuario en el
          checkout de Stripe.
        </li>
        <li>
          <strong>Datos de pago</strong>: los datos de la tarjeta o metodo de
          pago son procesados integramente por Stripe. No los almacenamos ni
          tenemos acceso a ellos; recibimos unicamente un identificador de
          transaccion y el importe.
        </li>
        <li>
          <strong>Datos de comunicacion</strong>: contenido de los correos y
          mensajes de soporte que el usuario nos envie.
        </li>
        <li>
          <strong>Datos de uso del sitio web</strong>: direccion IP truncada,
          tipo de navegador, paginas visitadas. Tratados con fines estadisticos
          agregados.
        </li>
      </ul>
      <p style={p}>
        <strong>IA local:</strong> AutoClipper procesa tus transcripciones
        localmente en tu equipo mediante Ollama. No se envian transcripciones,
        clips ni contenido de video a nuestros servidores ni a ningun
        proveedor externo.
      </p>

      <h2 style={h2}>3. Finalidades y base legal</h2>
      <ul style={ul}>
        <li>
          <strong>Entrega del Producto y gestion de la licencia</strong> — base
          legal: ejecucion del contrato.
        </li>
        <li>
          <strong>Soporte tecnico y atencion al cliente</strong> — base legal:
          ejecucion del contrato.
        </li>
        <li>
          <strong>Facturacion y obligaciones fiscales</strong> — base legal:
          cumplimiento de una obligacion legal.
        </li>
        <li>
          <strong>Envio de comunicaciones sobre actualizaciones del
          Producto</strong> — base legal: interes legitimo del responsable en
          informar a sus clientes.
        </li>
        <li>
          <strong>Envio de comunicaciones comerciales sobre otros productos</strong>{" "}
          — base legal: consentimiento expreso, revocable en cualquier momento.
        </li>
      </ul>

      <h2 style={h2}>4. Encargados del tratamiento</h2>
      <p style={p}>
        Para prestar el servicio recurrimos a proveedores tecnologicos que
        actuan como encargados del tratamiento:
      </p>
      <ul style={ul}>
        <li>
          <strong>Stripe Payments Europe Ltd.</strong> (procesamiento de
          pagos).
        </li>
        <li>
          <strong>LeadConnector / HighLevel Inc.</strong> (CRM, envio de email
          transaccional y marketing — GoHighLevel).
        </li>
        <li>
          <strong>Vercel Inc.</strong> (hosting del sitio web).
        </li>
      </ul>
      <p style={p}>
        Ollama y los modelos Gemma se ejecutan en el equipo del usuario; no
        hay transferencia de datos a terceros en esa operativa.
      </p>

      <h2 style={h2}>5. Transferencias internacionales</h2>
      <p style={p}>
        Algunos de los proveedores indicados (Stripe, HighLevel, Vercel) estan
        establecidos en Estados Unidos o almacenan datos en servidores fuera
        del EEE. Las transferencias se amparan en las Clausulas Contractuales
        Tipo (SCCs) aprobadas por la Comision Europea, junto con las medidas
        complementarias exigidas por la normativa aplicable.
      </p>

      <h2 style={h2}>6. Plazo de conservacion</h2>
      <p style={p}>
        Conservamos los datos durante el tiempo que dure la relacion con el
        usuario y, posteriormente, durante los plazos legalmente exigidos
        (principalmente fiscales y contables, 5 anos como regla general en
        Espana). Los datos de marketing se conservan hasta que el usuario
        revoque su consentimiento.
      </p>

      <h2 style={h2}>7. Derechos del usuario</h2>
      <p style={p}>
        Puedes ejercer en cualquier momento tus derechos de acceso,
        rectificacion, supresion, limitacion, portabilidad y oposicion al
        tratamiento, asi como a retirar el consentimiento prestado, escribiendo
        a <strong>hola@elestudioeme.com</strong> desde la direccion de correo
        con la que realizaste la compra o acompanando copia de un documento
        identificativo. Tambien tienes derecho a presentar una reclamacion ante
        la Agencia Espanola de Proteccion de Datos (www.aepd.es) si consideras
        que el tratamiento no se ajusta a la normativa vigente.
      </p>

      <h2 style={h2}>8. Cookies</h2>
      <p style={p}>
        El sitio web utiliza unicamente cookies tecnicas necesarias para su
        funcionamiento (preferencias de sesion, deteccion de sistema operativo
        en la pagina de instalacion) y, en su caso, cookies estadisticas
        agregadas. No utilizamos cookies de perfilado ni publicidad de
        terceros. Si en el futuro se incorporan, se publicara una politica de
        cookies especifica y se solicitara consentimiento previo.
      </p>

      <h2 style={h2}>9. Cambios en esta politica</h2>
      <p style={p}>
        Esta politica puede actualizarse cuando cambien los tratamientos, los
        proveedores o la normativa aplicable. La fecha de ultima actualizacion
        se indica al inicio del documento.
      </p>

      <p
        className="ac-text ac-text--small"
        style={{ marginTop: "var(--ac-space-10)", opacity: 0.6 }}
      >
        Dudas sobre privacidad? Escribe a hola@elestudioeme.com.
      </p>
    </article>
  );
}
