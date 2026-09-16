import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, BookOpen, Clock } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { submitLead } from "@/lib/leads";

const WA_URL =
  "https://wa.me/51919102556?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20del%20curso%20Power%20BI%20%2B%20IA%20Ag%C3%A9ntica%20%F0%9F%9A%80";

interface LeadData {
  nombre: string;
  correo: string;
  whatsapp: string;
  experiencia_previa: "si" | "no";
}

const initialLead: LeadData = {
  nombre: "",
  correo: "",
  whatsapp: "",
  experiencia_previa: "si",
};

export function PowerBiLeadForm() {
  const [formData, setFormData] = useState<LeadData>(initialLead);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedChoice, setSubmittedChoice] = useState<"si" | "no">("si");
  const [showInitialThanks, setShowInitialThanks] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (submitted && submittedChoice === "si") {
      setShowInitialThanks(true);
      const timer = setTimeout(() => {
        setShowInitialThanks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, submittedChoice]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const hasBase = formData.experiencia_previa === "si";
    setSubmittedChoice(formData.experiencia_previa);

    // REGLA CRÍTICA POPUP: Para evitar que el navegador bloquee la apertura como pop-up,
    // window.open DEBE ejecutarse síncronamente dentro del gesto de usuario (onSubmit),
    // ÚNICAMENTE para la rama "Sí, tengo base en Power BI".
    if (hasBase && typeof window !== "undefined") {
      try {
        window.open(WA_URL, "_blank", "noopener,noreferrer");
      } catch (e) {
        console.warn("No se pudo abrir WhatsApp automáticamente en este navegador:", e);
      }
    }

    setLoading(true);

    // En la rama "No", el campo notas DEBE incluir literalmente el texto "No, parto de cero"
    const expText = hasBase ? "Sí, tiene base en Power BI" : "No, parto de cero";

    const notas = [
      `Curso: Power BI + IA Agéntica (12h)`,
      expText,
      `Origen: powerbi-ia.tideo.tech`,
    ].join(" | ");

    try {
      const result = await submitLead({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.whatsapp || undefined,
        fuente: "powerbi_ia_landing",
        canal: "powerbi_ia_landing",
        tipo_documento: "DNI",
        notas,
        urgencia: hasBase ? "alta" : "media",
      });

      if (result.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error al registrar lead en ERP:", err);
      setErrorMessage(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Hubo un problema de conexión al registrar tus datos en el sistema. Por favor intenta nuevamente o contáctanos directamente a cristhian@tideo.tech o por WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inscripcion" className="py-24 md:py-36 relative scroll-mt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-academy/15 blur-[140px] -z-10"
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Section Headline */}
        <SectionHeader
          align="center"
          eyebrow="Inscripción y Acceso"
          title={
            <>
              Actualiza tu forma de{" "}
              <span className="font-serif-italic text-academy">construir dashboards</span>.
            </>
          }
          description="Inscríbete hoy y asegura tu lugar en la próxima edición de 12 horas. Recibirás acompañamiento en vivo, acceso a grabaciones, prompts C.I.A. verificados y el proyecto integrador final."
        />

        <div className="mt-14 max-w-2xl mx-auto rounded-3xl border border-academy/30 bg-surface/40 p-8 sm:p-12 backdrop-blur-xl shadow-2xl shadow-black/60 relative">
          {submitted ? (
            submittedChoice === "si" ? (
              /* Rama 1: Usuario con base en Power BI */
              showInitialThanks ? (
                /* Fase 1 (primeros 3 segundos): Mensaje breve y directo mientras se abre WhatsApp en paralelo */
                <div className="text-center py-8 animate-in fade-in zoom-in-95">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-academy/10 border border-academy/30 text-academy shadow-[0_0_40px_-5px_rgba(249,115,22,0.4)]">
                    <CheckCircle2 className="h-10 w-10 text-academy animate-in zoom-in" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                    ¡Gracias! Te contactaremos pronto.
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
                    Hemos recibido tu solicitud para el curso{" "}
                    <strong className="text-foreground">Power BI + IA Agéntica</strong>. Se ha
                    abierto WhatsApp en una pestaña paralela para coordinar tu acceso.
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-hairline text-xs font-mono text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-academy" />
                    <span>TIDEO Academy · Solicitud recibida</span>
                  </div>
                </div>
              ) : (
                /* Fase 2 (después de 3 segundos): Pantalla completa de confirmación con botón de WhatsApp fallback */
                <div className="text-center py-6 animate-in fade-in zoom-in-95">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-academy/10 border border-academy/30 text-academy shadow-[0_0_35px_-5px_rgba(249,115,22,0.4)]">
                    <CheckCircle2 className="h-8 w-8 text-academy" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academy/15 border border-academy/30 text-xs font-semibold text-academy mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>¡Gracias! Te contactaremos pronto.</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                    ¡Inscripción registrada con éxito!
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
                    Hemos guardado tus datos para el curso{" "}
                    <strong className="text-foreground">Power BI + IA Agéntica</strong>. Abrimos una
                    ventana de WhatsApp para entregarte el temario detallado y coordinar tu cupo.
                  </p>

                  {/* Botón grande de WhatsApp como fallback garantizado */}
                  <div className="space-y-3 pt-2">
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-6 py-4 text-base font-semibold text-white shadow-[0_0_35px_-5px_rgba(37,211,102,0.45)] hover:shadow-[0_0_45px_-5px_rgba(37,211,102,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span>Continuar por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </a>

                    <p className="text-[12px] text-muted-foreground/80 text-center">
                      ¿No se abrió WhatsApp automáticamente? Haz clic en el botón verde de arriba.
                    </p>
                  </div>
                </div>
              )
            ) : (
              /* Rama 2: Bifurcación - Usuario que parte de cero */
              <div className="text-center py-6 animate-in fade-in zoom-in-95">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-[0_0_35px_-5px_rgba(56,189,248,0.3)]">
                  <BookOpen className="h-8 w-8 text-sky-400" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-hairline text-xs font-mono text-muted-foreground mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>TIDEO Academy · Notificación prioritaria</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                  ¡Gracias por tu sinceridad, {formData.nombre.split(" ")[0]}!
                </h3>

                <div className="p-6 rounded-2xl bg-background/60 border border-hairline/80 text-left mb-6">
                  <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                    Este curso está pensado para quienes ya tienen base en Power BI, así que por
                    ahora no es el más adecuado para ti. Estamos preparando un curso de{" "}
                    <strong className="text-academy font-semibold">
                      Power BI con IA — Nivel Básico/Intermedio
                    </strong>
                    , y te avisaremos apenas esté disponible.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Hemos guardado tu contacto en nuestra lista de espera preferente con el correo{" "}
                  <span className="font-mono text-foreground/90">{formData.correo}</span>. Serás de
                  las primeras personas en enterarte de la fecha de estreno.
                </p>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Nombre completo <span className="text-academy">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Sofía Mendoza"
                  className="w-full rounded-xl bg-background/80 border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-academy focus:outline-none focus:ring-1 focus:ring-academy transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Correo electrónico <span className="text-academy">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="sofia@empresa.com"
                  className="w-full rounded-xl bg-background/80 border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-academy focus:outline-none focus:ring-1 focus:ring-academy transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  WhatsApp / Celular{" "}
                  <span className="text-[11px] text-muted-foreground/70 lowercase font-sans">
                    (opcional para contacto rápido)
                  </span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+51 999 888 777"
                  className="w-full rounded-xl bg-background/80 border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-academy focus:outline-none focus:ring-1 focus:ring-academy transition"
                />
              </div>

              {/* Qualification question */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2.5">
                  ¿Ya llevaste un curso de Power BI antes? <span className="text-academy">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-hairline bg-background/60 cursor-pointer hover:border-academy/40 transition has-[:checked]:border-academy has-[:checked]:bg-academy/[0.08]">
                    <input
                      type="radio"
                      name="experiencia_previa"
                      value="si"
                      checked={formData.experiencia_previa === "si"}
                      onChange={handleChange}
                      className="accent-academy"
                    />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                      Sí, tengo base en Power BI
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-hairline bg-background/60 cursor-pointer hover:border-academy/40 transition has-[:checked]:border-academy has-[:checked]:bg-academy/[0.08]">
                    <input
                      type="radio"
                      name="experiencia_previa"
                      value="no"
                      checked={formData.experiencia_previa === "no"}
                      onChange={handleChange}
                      className="accent-academy"
                    />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                      No, parto desde cero
                    </span>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-300 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-semibold text-red-200 mb-1">Aviso:</p>
                    <p>{errorMessage}</p>
                    <div className="mt-2 pt-2 border-t border-red-500/20">
                      <a
                        href="mailto:cristhian@tideo.tech?subject=Inscripción%20Power%20BI%20con%20IA"
                        className="text-white underline font-semibold hover:text-academy"
                      >
                        Enviar correo directo a cristhian@tideo.tech →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-academy px-8 py-4 text-base font-semibold text-background hover:bg-academy/90 transition-all duration-200 shadow-[0_0_35px_-6px_rgba(249,115,22,0.6)] hover:shadow-[0_0_45px_-4px_rgba(249,115,22,0.8)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    <span>Registrando solicitud...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {formData.experiencia_previa === "si"
                        ? "Quiero dominar Power BI + IA Agéntica"
                        : "Notificarme cuando haya curso básico"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-muted-foreground leading-relaxed pt-2">
                Cupos limitados por cohorte para garantizar revisión de proyectos en vivo. Recibirás
                respuesta en menos de 24 horas.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
