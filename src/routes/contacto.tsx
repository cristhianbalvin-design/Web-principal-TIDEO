import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contacto")({
  component: Contacto,
  head: () => ({
    meta: [
      { title: "Contacto | TIDEO Tech & Strategy" },
      {
        name: "description",
        content:
          "Cuéntanos qué proceso quieres transformar. Auditoría gratuita y conversación estratégica con TIDEO.",
      },
    ],
  }),
});

const urgencias = [
  "Estoy explorando opciones",
  "Necesito resolverlo este mes",
  "Tengo un proyecto definido",
  "Quiero una auditoría inicial",
];

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-hairline py-3 text-base focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}

function Contacto() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-20">
        <section className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-6 h-px bg-primary/60" />
            Contacto
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-gradient">
            Cuéntanos qué proceso quieres{" "}
            <span className="font-serif-italic text-primary">transformar</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            No necesitas tener la solución clara. Basta con contarnos qué problema
            operativo, comercial o administrativo quieres resolver.
          </p>

          {sent ? (
            <div className="mt-16 rounded-2xl border border-hairline bg-surface/40 p-10">
              <h2 className="text-2xl font-semibold">Recibido. Gracias.</h2>
              <p className="mt-3 text-muted-foreground">
                Revisaremos tu mensaje y te escribiremos a la brevedad para coordinar
                la conversación inicial.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-16 grid gap-8 md:grid-cols-2">
              <Field label="Nombre" name="nombre" required />
              <Field label="Empresa" name="empresa" required />
              <Field label="Cargo" name="cargo" />
              <Field label="Correo" name="correo" type="email" required />
              <Field label="WhatsApp" name="whatsapp" />
              <Field label="Rubro de la empresa" name="rubro" />
              <div className="md:col-span-2">
                <Field
                  label="¿Qué proceso quieres mejorar?"
                  name="proceso"
                  textarea
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  label="¿Qué herramientas usas actualmente?"
                  name="herramientas"
                  textarea
                />
              </div>

              <div className="md:col-span-2">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  ¿Qué tan urgente es resolverlo?
                </span>
                <div className="flex flex-wrap gap-3">
                  {urgencias.map((u, i) => (
                    <label
                      key={u}
                      className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm cursor-pointer hover:bg-surface transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                    >
                      <input
                        type="radio"
                        name="urgencia"
                        value={u}
                        defaultChecked={i === 0}
                        className="sr-only"
                      />
                      {u}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 mt-4 flex items-center justify-between gap-6 flex-wrap">
                <p className="text-sm text-muted-foreground max-w-md">
                  Al enviar este formulario, recibirás respuesta directamente del
                  equipo de TIDEO en menos de 48 horas hábiles.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm font-medium hover:opacity-90 transition shadow-glow"
                >
                  Enviar proceso →
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
