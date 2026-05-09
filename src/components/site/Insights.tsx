import { SectionHeader } from "./SectionHeader";

const articles = [
  { cat: "Procesos", title: "Por qué digitalizar no es automatizar el caos" },
  { cat: "Software empresarial", title: "ERP estándar vs ERP a medida: cómo elegir sin perder flexibilidad" },
  { cat: "Inteligencia artificial", title: "Cómo usar IA en procesos administrativos sin perder control" },
  { cat: "Datos & BI", title: "El rol de Power BI cuando se quiere decidir con datos" },
];

export function Insights() {
  return (
    <section id="insights" className="py-28 md:py-36 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Insights"
          title={
            <>
              Ideas para empresas que quieren{" "}
              <span className="font-serif-italic text-primary">operar mejor</span>.
            </>
          }
          description="Compartimos análisis, guías y aprendizajes sobre transformación digital, automatización, IA, datos y sistemas empresariales."
        />

        <div className="mt-16 grid gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden md:grid-cols-2">
          {articles.map((a, i) => (
            <a
              key={a.title}
              href="#"
              className="group block bg-background p-8 md:p-10 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{a.cat}</span>
                <span className="font-mono">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight leading-snug max-w-md">
                {a.title}
              </h3>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Leer artículo →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
