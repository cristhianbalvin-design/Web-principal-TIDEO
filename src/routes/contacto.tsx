import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ChangeEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

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

const DIAGNOSTIC_CONTACT_STORAGE_KEY = "tideo:diagnostic-contact-prefill";

type ContactFormState = {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  whatsapp: string;
  rubro: string;
  proceso: string;
  herramientas: string;
};

const emptyForm: ContactFormState = {
  nombre: "",
  empresa: "",
  cargo: "",
  correo: "",
  whatsapp: "",
  rubro: "",
  proceso: "",
  herramientas: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: keyof ContactFormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}

function Contacto() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ContactFormState>(emptyForm);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("origen") !== "diagnostico") return;

    const stored = window.sessionStorage.getItem(DIAGNOSTIC_CONTACT_STORAGE_KEY);
    if (!stored) return;

    try {
      const prefill = JSON.parse(stored) as Partial<ContactFormState>;
      setForm((current) => ({
        ...current,
        nombre: prefill.nombre ?? "",
        empresa: prefill.empresa ?? "",
        correo: prefill.correo ?? "",
        whatsapp: prefill.whatsapp ?? "",
      }));
    } catch {
      window.sessionStorage.removeItem(DIAGNOSTIC_CONTACT_STORAGE_KEY);
    }
  }, []);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const urgencia = (e.currentTarget.elements.namedItem("urgencia") as HTMLInputElement)?.value ?? "";
    try {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ ...form, urgencia }),
        });
      }
    } catch (err) {
      console.error("send-contact-email failed:", err);
    } finally {
      setLoading(false);
      setSent(true);
    }
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
              <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleFieldChange} required />
              <Field label="Empresa" name="empresa" value={form.empresa} onChange={handleFieldChange} required />
              <Field label="Cargo" name="cargo" value={form.cargo} onChange={handleFieldChange} />
              <Field label="Correo" name="correo" value={form.correo} onChange={handleFieldChange} type="email" required />
              <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleFieldChange} />
              <Field label="Rubro de la empresa" name="rubro" value={form.rubro} onChange={handleFieldChange} />
              <div className="md:col-span-2">
                <Field
                  label="¿Qué proceso quieres mejorar?"
                  name="proceso"
                  value={form.proceso}
                  onChange={handleFieldChange}
                  textarea
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  label="¿Qué herramientas usas actualmente?"
                  name="herramientas"
                  value={form.herramientas}
                  onChange={handleFieldChange}
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
                  Te contactamos a la brevedad — habitualmente en menos de 2 horas.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm font-medium hover:opacity-90 transition shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando…" : "Enviar proceso →"}
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
