import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de reembolso — AutoClipper",
  description:
    "AutoClipper es un producto digital de descarga inmediata y no admite reembolsos salvo las excepciones indicadas.",
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

export default function ReembolsoPage() {
  return (
    <article>
      <span className="ac-heading--eyebrow">Legal</span>
      <h1
        className="ac-heading ac-heading--2"
        style={{ marginTop: "var(--ac-space-3)" }}
      >
        Politica de no-reembolso
      </h1>
      <p
        className="ac-text ac-text--small"
        style={{ marginTop: "var(--ac-space-2)", opacity: 0.6 }}
      >
        Ultima actualizacion: {lastUpdated}
      </p>

      <h2 style={h2}>Resumen</h2>
      <p style={p}>
        AutoClipper es un producto digital que se entrega mediante descarga
        inmediata. Al completar la compra y proceder a la descarga, el
        comprador renuncia expresamente a su derecho de desistimiento
        conforme al articulo 103.m del Real Decreto Legislativo 1/2007, de 16
        de noviembre, por el que se aprueba el texto refundido de la Ley
        General para la Defensa de los Consumidores y Usuarios.
      </p>
      <p style={p}>
        En consecuencia, con caracter general <strong>no se admiten
        reembolsos</strong> una vez realizada la descarga del Producto.
      </p>

      <h2 style={h2}>Aceptacion expresa</h2>
      <p style={p}>
        Al pulsar el boton de compra en la pagina de pago, el usuario declara:
      </p>
      <ul style={ul}>
        <li>
          Haber leido y aceptado los{" "}
          <a
            href="/legal/terminos"
            style={{ color: "var(--ac-cyan)", textDecoration: "underline" }}
          >
            Terminos y condiciones
          </a>{" "}
          y la{" "}
          <a
            href="/legal/privacidad"
            style={{ color: "var(--ac-cyan)", textDecoration: "underline" }}
          >
            Politica de privacidad
          </a>
          .
        </li>
        <li>
          Solicitar expresamente la entrega inmediata del Producto mediante
          descarga.
        </li>
        <li>
          Conocer y aceptar que, una vez iniciada la descarga, pierde el
          derecho de desistimiento en virtud del art. 103.m del RDL 1/2007.
        </li>
      </ul>

      <h2 style={h2}>Excepciones</h2>
      <p style={p}>
        Con independencia de lo anterior, procederemos a evaluar la posibilidad
        de un reembolso excepcional en los siguientes casos, siempre que el
        comprador contacte dentro de los <strong>14 dias naturales</strong>{" "}
        posteriores a la compra a traves de{" "}
        <strong>hola@elestudioeme.com</strong>:
      </p>
      <ul style={ul}>
        <li>
          <strong>No entrega</strong>: el correo con el enlace de descarga no
          ha llegado y tras la revision pertinente no es posible entregarlo.
        </li>
        <li>
          <strong>Producto defectuoso</strong>: el Producto descargado no
          funciona en un entorno que cumple los requisitos tecnicos
          documentados y no somos capaces de resolver la incidencia tras un
          intento razonable de soporte.
        </li>
        <li>
          <strong>Error en la transaccion</strong>: cargo duplicado,
          transaccion no autorizada u otros errores de pago imputables al
          procesador.
        </li>
      </ul>
      <p style={p}>
        Los reembolsos excepcionales se evaluan caso por caso, quedan a
        discrecion del titular y, de aceptarse, se realizan mediante el mismo
        medio de pago utilizado en la compra, en un plazo maximo de 14 dias
        desde la aceptacion.
      </p>

      <h2 style={h2}>Casos no cubiertos</h2>
      <p style={p}>
        Con caracter enunciativo y no limitativo, no procede reembolso cuando:
      </p>
      <ul style={ul}>
        <li>
          El hardware del comprador no cumple los requisitos minimos
          documentados para el modelo de IA seleccionado.
        </li>
        <li>
          El comprador no desea instalar Ollama o no puede ejecutar un modelo
          Gemma 4 en su equipo.
        </li>
        <li>
          Los clips sugeridos por la IA no coinciden con las expectativas
          subjetivas del comprador sobre lo que es un clip &quot;viral&quot;.
        </li>
        <li>
          El comprador ha adquirido el Producto por error o ha cambiado de
          opinion tras iniciar la descarga.
        </li>
      </ul>

      <h2 style={h2}>Contacto</h2>
      <p style={p}>
        Para cualquier cuestion relacionada con esta politica puedes escribir a{" "}
        <strong>hola@elestudioeme.com</strong> desde la direccion de correo con
        la que realizaste la compra.
      </p>
    </article>
  );
}
