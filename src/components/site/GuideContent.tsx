import { useEffect, useState } from "react";
import type { BloqueContenido, Publicacion } from "@/content/guias";
import { trackGuiaCTA, trackGuideViewContent } from "@/lib/meta-pixel";
import { ORG } from "@/lib/site";

/** Negritas (**texto**) y cursivas (*texto*) simples dentro del contenido. */
function Inline({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          part
        ),
      )}
    </>
  );
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      /* se intenta el método alternativo */
    }
  }
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
}

function Prompt({ texto, numero }: { texto: string; numero: number }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);
  return (
    <li className="rounded-xl border border-hairline bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-mono text-primary">{String(numero).padStart(2, "0")}</span>
        <button
          type="button"
          className="min-h-9 rounded-md border border-primary/30 px-3 text-xs font-medium text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
          onClick={async () => setCopied(await copyText(texto))}
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p className="mt-3 text-foreground">«{texto}»</p>
    </li>
  );
}

function Block({ block }: { block: BloqueContenido }) {
  if (block.tipo === "parrafo")
    return (
      <p>
        <Inline texto={block.texto} />
      </p>
    );
  if (block.tipo === "tabla")
    return (
      <div
        className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0"
        role="region"
        aria-label="Comparación entre tablero, asistente y agente"
        tabIndex={0}
      >
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr>
              {block.columnas.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-b border-primary/30 bg-surface px-4 py-4 font-semibold text-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.filas.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th
                      key={j}
                      scope="row"
                      className="border-b border-hairline px-4 py-4 font-medium text-primary"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={j}
                      className="border-b border-hairline px-4 py-4 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (block.tipo === "prompts")
    return (
      <ol className="grid gap-3">
        {block.items.map((item, i) => (
          <Prompt key={item} texto={item} numero={i + 1} />
        ))}
      </ol>
    );
  const Tag = block.ordenada ? "ol" : "ul";
  return (
    <Tag
      className={
        block.ordenada
          ? "list-decimal space-y-3 pl-6 marker:text-primary"
          : "list-disc space-y-3 pl-6 marker:text-primary"
      }
    >
      {block.items.map((item) => (
        <li key={item} className="pl-1">
          <Inline texto={item} />
        </li>
      ))}
    </Tag>
  );
}

export function GuideContent({ guide }: { guide: Publicacion }) {
  useEffect(() => {
    trackGuideViewContent(guide.slug);
  }, [guide.slug]);
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10">
      <div className="max-w-[68ch] space-y-5 text-base leading-[1.85] text-muted-foreground sm:text-lg">
        {guide.introduccion.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
      <nav
        aria-label="Índice de secciones"
        className="mt-12 rounded-2xl border border-hairline bg-surface/60 p-6 sm:p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-primary">En esta guía</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {guide.secciones.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="font-mono text-primary">{section.numero}</span>
                <span>{section.titulo}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mt-16 space-y-20 sm:mt-24">
        {guide.secciones.map((section) => (
          <section id={section.id} key={section.id} className="scroll-mt-24 max-w-[68ch]">
            <div className="flex items-start gap-4">
              <span className="pt-1 font-mono text-sm text-primary">{section.numero}</span>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {section.titulo}
              </h2>
            </div>
            <div className="mt-6 space-y-5 text-base leading-[1.85] text-muted-foreground sm:text-lg">
              {section.bloques.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-16 max-w-[68ch] border-t border-hairline pt-6 text-sm italic text-muted-foreground">
        {guide.nota}
      </p>
      <aside className="mt-14 max-w-3xl rounded-2xl border border-primary/30 bg-surface p-7 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          ¿Quieres que revisemos tu modelo de datos?
        </h2>
        <a
          href="/contacto?servicio=datos-bi"
          onClick={trackGuiaCTA}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-85"
        >
          Conversemos →
        </a>
      </aside>
      <p className="mt-8 text-sm text-muted-foreground">
        Síguenos en{" "}
        <a
          href={ORG.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          Instagram
        </a>{" "}
        y{" "}
        <a
          href={ORG.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          LinkedIn
        </a>{" "}
        para más casos de BI con IA agéntica.
      </p>
      <section
        className="mt-16 max-w-[68ch] border-t border-hairline pt-8"
        aria-labelledby="fuentes"
      >
        <h2 id="fuentes" className="text-xl font-semibold">
          Fuentes
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {guide.fuentes.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener"
                className="text-primary underline underline-offset-4 hover:text-foreground"
              >
                {source.titulo}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
