const stats = [
  { value: "10+", label: "años de experiencia" },
  { value: "3×", label: "procesos · tecnología · adopción" },
  { value: "24h", label: "programas formativos corporativos" },
  { value: "Semanas", label: "para lanzar MVPs funcionales" },
];

export function TrustBar() {
  return (
    <section className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <p className="text-sm text-muted-foreground max-w-3xl">
          Más de 10 años conectando operaciones, datos y tecnología para resolver
          problemas reales de negocio.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-hairline pl-4">
              <div className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
