import { SectionHeader } from "@/components/site/SectionHeader";
import { Terminal, Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    letter: "C",
    name: "Contexto",
    badge: "Paso 01",
    question: "¿Qué datos y relaciones existen?",
    detail:
      "Describes el modelo relacional, las tablas involucradas, las claves de unión y el propósito comercial del informe para que la IA no suponga estructuras inexistentes.",
    example:
      "Tengo una tabla Ventas relacionada con Productos, Clientes y Tiendas en un esquema estrella.",
  },
  {
    letter: "I",
    name: "Instrucción",
    badge: "Paso 02",
    question: "¿Cuál es el cálculo exacto que necesitas?",
    detail:
      "Defines la tarea analítica concreta con la terminología adecuada (medida DAX, columna calculada, script M, jerarquía o KPI ejecutivo).",
    example:
      "Necesito una medida DAX que calcule la participación porcentual de ventas por categoría respecto al total de la empresa.",
  },
  {
    letter: "A",
    name: "Aceptación",
    badge: "Paso 03",
    question: "¿Cuáles son las condiciones de validación?",
    detail:
      "Estableces las restricciones críticas de filtro, el manejo de valores nulos o división por cero y el formato esperado de salida numérica.",
    example:
      "Debe respetar los filtros activos de fecha, tienda y canal, manejar ceros con DIVIDE y devolver el valor formateado como porcentaje con dos decimales.",
  },
];

export function PowerBiCiaMethod() {
  const [copied, setCopied] = useState(false);

  const fullPrompt = `[CONTEXTO]
Tengo una tabla Ventas relacionada con Productos, Clientes y Tiendas en un esquema estrella.

[INSTRUCCIÓN]
Necesito una medida DAX que calcule la participación porcentual de ventas por categoría respecto al total de la empresa.

[ACEPTACIÓN]
Debe respetar los filtros activos de fecha, tienda y canal, manejar posibles ceros con la función DIVIDE y devolver el resultado formateado en porcentaje con dos decimales. Explica paso a paso el contexto de filtro aplicado.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="metodo-cia" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Metodología Exclusiva"
          title={
            <>
              El Método C.I.A.:{" "}
              <span className="font-serif-italic text-academy">cómo hablarle a la IA</span> sin
              ambigüedades.
            </>
          }
          description="La razón principal por la que la IA se equivoca al generar DAX es la falta de contexto en el prompt. Con nuestro framework C.I.A., transformarás cualquier necesidad de negocio en instrucciones técnicas infalibles."
        />

        {/* 3 Step Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.letter}
              className="relative rounded-2xl border border-hairline bg-surface/30 p-8 flex flex-col justify-between transition-all duration-300 hover:border-academy/40 hover:bg-surface/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-academy/15 text-2xl font-black font-mono text-academy border border-academy/30 shadow-[0_0_16px_-2px_rgba(249,115,22,0.3)]">
                    {s.letter}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {s.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{s.name}</h3>
                <p className="mt-1 text-xs font-mono text-academy">{s.question}</p>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-hairline/60 bg-background/50 rounded-xl p-4 border">
                <span className="block text-[11px] font-mono text-academy/90 uppercase tracking-wider mb-1.5">
                  Ejemplo práctico:
                </span>
                <p className="text-xs text-foreground/90 font-mono italic leading-relaxed">
                  "{s.example}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Unified Prompt Showcase Card */}
        <div className="mt-12 rounded-2xl border border-academy/30 bg-surface/40 p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hairline pb-4 mb-5">
            <div className="flex items-center gap-2 text-sm font-mono text-foreground font-semibold">
              <Terminal className="w-4 h-4 text-academy" />
              <span>Prompt C.I.A. Integrado — Listo para ejecutar</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-surface border border-hairline text-foreground hover:border-academy/50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copiado al portapapeles</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Copiar prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="font-mono text-xs md:text-sm text-foreground/90 leading-relaxed overflow-x-auto whitespace-pre-wrap bg-background/80 p-5 rounded-xl border border-hairline">
            {fullPrompt}
          </pre>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-academy" />
            <span>
              Resultado esperado: Medida DAX con función CALCULATE y ALLSELECTED con validación
              preventiva de contexto.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
