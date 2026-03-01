const lines = [
  { time: "00:00:12", text: "Bueno pues hoy quiero hablaros de algo que me tiene loco desde hace semanas" },
  { time: "00:00:28", text: "basicamente estuve probando diferentes formatos y ninguno funcionaba como esperaba" },
  { time: "00:01:15", text: "y entonces me di cuenta de que el problema no era el contenido sino como lo presentaba" },
  { time: "00:02:03", text: "pero bueno eso ya lo sabeis los que lleveis tiempo por aqui" },
  { time: "00:03:47", text: "y nada pues seguimos con el tema que os decia antes de los formatos" },
  { time: "00:05:22", text: "aqui es donde se pone interesante porque fijaos en lo que paso cuando cambie" },
  { time: "00:06:01", text: "el engagement subio un 340 por ciento en una semana solo con este cambio" },
  { time: "00:07:14", text: "y eso que al principio pense que nadie se iba a dar cuenta de la diferencia" },
  { time: "00:08:30", text: "o sea literalmente pase de 200 views a 47 mil en el mismo tipo de video" },
  { time: "00:09:55", text: "bueno y luego esta la parte que no os he contado todavia que es la mejor" },
  { time: "00:11:02", text: "porque resulta que el algoritmo premia exactamente lo contrario de lo que pensamos" },
  { time: "00:12:18", text: "pero eso es tema para otro video que si no esto se hace eterno" },
  { time: "00:13:44", text: "vale pues resumiendo un poco todo lo que hemos visto hasta ahora" },
  { time: "00:15:01", text: "la clave esta en los primeros 3 segundos y en como cierras el loop" },
];

const HIGHLIGHT_INDEX = 6;

export default function TranscriptWall() {
  return (
    <div className="ac-transcript">
      <div className="ac-transcript__lines">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`ac-transcript__line${i === HIGHLIGHT_INDEX ? " ac-transcript__line--highlight" : ""}`}
            style={{ "--line-i": i } as React.CSSProperties}
          >
            <span className="ac-transcript__timestamp">{line.time}</span>
            <span className="ac-transcript__text">{line.text}</span>
          </div>
        ))}
      </div>
      <div className="ac-transcript__lost">
        El momento viral esta aqui. En alguna parte.
      </div>
    </div>
  );
}
