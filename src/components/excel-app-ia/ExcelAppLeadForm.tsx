import { useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Honeypot } from "@/components/site/Honeypot";
import { submitLead } from "@/lib/leads";
import { trackLead } from "@/lib/meta-pixel";
import { SITE_URL } from "@/lib/site";
import { AI_EXPERIENCE, COURSE, formatPEN } from "@/content/excel-app-ia";
import { buildLeadNotes, type ExcelAppFormState as FormState } from "./lead-notes";
import { WA_URL, WhatsAppIcon } from "./shared";

const initial: FormState = {
  nombre: "",
  correo: "",
  whatsapp: "",
  ocupacion: "",
  problema: "",
  experiencia_ia: "",
  disponibilidad: "",
  acepta_datos: false,
  acepta_comercial: false,
};

const PROBLEM_MAX = 600;

const inputClass =
  "w-full rounded-xl bg-background/80 border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-academy focus:outline-none focus:ring-1 focus:ring-academy transition";
const labelClass = "block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2";
const choiceClass =
  "flex items-center gap-3 p-3.5 rounded-xl border border-hairline bg-background/60 cursor-pointer hover:border-academy/40 transition has-[:checked]:border-academy has-[:checked]:bg-academy/[0.08]";

function Req() {
  return (
    <span className="text-academy" aria-hidden>
      {" "}
      *
    </span>
  );
}

/** Secciones 17 (llamado final) y 18 (formulario de inscripción). */
export function ExcelAppLeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await submitLead({
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        telefono: form.whatsapp.trim(),
        cargo: form.ocupacion.trim(),
        fuente: "excel_app_ia_landing",
        canal: "excel_app_ia_landing",
        tipo_documento: "DNI",
        notas: buildLeadNotes(form),
        urgencia: form.disponibilidad === "si" ? "alta" : "media",
        website,
      });
      if (result.success) {
        trackLead("excel_app_ia");
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error al registrar lead:", err);
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Hubo un problema de conexión al registrar tus datos. Intenta nuevamente o escríbenos por WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="inscripcion"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-hairline"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] max-w-full h-[22rem] rounded-full bg-academy/10 blur-[120px] -z-10"
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* 17 · Llamado final */}
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-6 h-px bg-primary/60" />
            Primera cohorte
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-gradient">
            Tu próxima solución empresarial puede comenzar con una idea y{" "}
            <span className="font-serif-italic text-academy">seis sábados</span> de trabajo bien
            enfocado.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Conoces los problemas de tu negocio. Ahora aprende una manera práctica de comenzar a
            resolverlos construyendo tu propio software con ayuda de IA.
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            En <strong className="text-foreground">{COURSE.name}</strong> tendrás una metodología
            clara, una miniaplicación guiada, espacio para desarrollar tu propio MVP y asesoría
            individual dentro de un grupo reducido.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {[
              ["24 h", "en vivo"],
              ["12", "participantes máx."],
              [COURSE.startShort, "inicio"],
              [formatPEN(COURSE.priceFounder), "precio fundador"],
            ].map(([n, l]) => (
              <li key={l} className="rounded-xl border border-hairline bg-surface/40 p-4">
                <span className="block text-xl font-semibold text-foreground">{n}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </li>
            ))}
          </ul>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-academy transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Tengo una pregunta sobre mi proyecto →
          </a>
          <p className="mt-8 text-sm italic text-muted-foreground">
            AI Business Builder comienza aquí. Tu aplicación puede seguir creciendo contigo.
          </p>
        </div>

        {/* 18 · Formulario */}
        <div className="rounded-3xl border border-academy/30 bg-surface/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/60">
          {submitted ? (
            <div className="text-center py-8 animate-in fade-in zoom-in-95" role="status">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-academy/10 border border-academy/30">
                <CheckCircle2 className="h-10 w-10 text-academy" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                ¡Gracias por tu interés!
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Recibimos tu solicitud para{" "}
                <strong className="text-foreground">{COURSE.name}</strong>.
              </p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-6 py-3.5 text-sm font-semibold text-white transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                ¿Una duda? Escríbenos por WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative space-y-5">
              <Honeypot value={website} onChange={setWebsite} />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  Cuéntanos qué quieres construir
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Completa tus datos y comparte brevemente la idea de aplicación que te gustaría
                  desarrollar. Te contactaremos con los pasos para inscribirte y validaremos si el
                  alcance es apropiado para esta primera edición.
                </p>
              </div>

              <div>
                <label htmlFor="xa-nombre" className={labelClass}>
                  Nombre y apellido
                  <Req />
                </label>
                <input
                  id="xa-nombre"
                  required
                  name="nombre"
                  autoComplete="name"
                  value={form.nombre}
                  onChange={onChange}
                  placeholder="Ej. Sofía Mendoza"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="xa-correo" className={labelClass}>
                    Correo electrónico
                    <Req />
                  </label>
                  <input
                    id="xa-correo"
                    required
                    type="email"
                    name="correo"
                    autoComplete="email"
                    value={form.correo}
                    onChange={onChange}
                    placeholder="sofia@empresa.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="xa-whatsapp" className={labelClass}>
                    WhatsApp
                    <Req />
                  </label>
                  <input
                    id="xa-whatsapp"
                    required
                    type="tel"
                    name="whatsapp"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={onChange}
                    placeholder="+51 999 888 777"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="xa-ocupacion" className={labelClass}>
                  Ocupación o área de trabajo
                  <Req />
                </label>
                <input
                  id="xa-ocupacion"
                  required
                  name="ocupacion"
                  maxLength={120}
                  autoComplete="organization-title"
                  value={form.ocupacion}
                  onChange={onChange}
                  placeholder="Ej. Jefa de logística"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="xa-problema" className={labelClass}>
                  ¿Qué proceso o problema te gustaría convertir en una aplicación?
                  <Req />
                </label>
                <textarea
                  id="xa-problema"
                  required
                  name="problema"
                  rows={4}
                  maxLength={PROBLEM_MAX}
                  value={form.problema}
                  onChange={onChange}
                  placeholder="Ej. Controlamos las solicitudes de compra en un Excel compartido y nadie sabe en qué estado está cada una."
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-1.5 text-right text-[11px] text-muted-foreground/70">
                  {form.problema.length}/{PROBLEM_MAX}
                </p>
              </div>

              <div>
                <label htmlFor="xa-exp" className={labelClass}>
                  ¿Qué experiencia tienes utilizando herramientas de IA?
                  <Req />
                </label>
                <select
                  id="xa-exp"
                  required
                  name="experiencia_ia"
                  value={form.experiencia_ia}
                  onChange={onChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {AI_EXPERIENCE.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className={labelClass}>
                  ¿Cuentas con disponibilidad para las seis fechas?
                  <Req />
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={choiceClass}>
                    <input
                      type="radio"
                      required
                      name="disponibilidad"
                      value="si"
                      checked={form.disponibilidad === "si"}
                      onChange={onChange}
                      className="accent-academy"
                    />
                    <span className="text-sm text-foreground/90 font-medium">Sí</span>
                  </label>
                  <label className={choiceClass}>
                    <input
                      type="radio"
                      name="disponibilidad"
                      value="consultar"
                      checked={form.disponibilidad === "consultar"}
                      onChange={onChange}
                      className="accent-academy"
                    />
                    <span className="text-sm text-foreground/90 font-medium">
                      Necesito consultar
                    </span>
                  </label>
                </div>
              </fieldset>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    name="acepta_datos"
                    checked={form.acepta_datos}
                    onChange={onChange}
                    className="mt-1 accent-academy"
                  />
                  <span>
                    Acepto el tratamiento de mis datos para atender esta solicitud, según la{" "}
                    <a
                      href={`${SITE_URL}/privacidad`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-academy hover:underline"
                    >
                      Política de Privacidad
                    </a>
                    .<Req />
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    name="acepta_comercial"
                    checked={form.acepta_comercial}
                    onChange={onChange}
                    className="mt-1 accent-academy"
                  />
                  <span>
                    Acepto recibir comunicaciones comerciales de TIDEO sobre este y otros cursos
                    (opcional).
                  </span>
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-300 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <div className="leading-relaxed">
                    <p>{error}</p>
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-white underline font-semibold"
                    >
                      Escribir por WhatsApp →
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-academy px-8 py-4 text-base font-semibold text-background hover:bg-academy/90 transition-all duration-200 shadow-[0_0_35px_-6px_rgba(249,115,22,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar mi interés
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Vacantes limitadas a 12 personas por el modelo de acompañamiento personalizado.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
