import { useState, useEffect, FormEvent } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface FormData {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  tipo_operacion: string;
  herramienta_actual: string;
  presupuesto: string;
  plazo: string;
}

const initialForm: FormData = {
  nombre: "", empresa: "", correo: "", telefono: "", 
  tipo_operacion: "", herramienta_actual: "", presupuesto: "", plazo: ""
};

export function QualificationForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isQualified, setIsQualified] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (submitted && isQualified) {
      const timer = setTimeout(() => {
        setShowCalendar(true);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [submitted, isQualified]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const qualified = formData.presupuesto !== "No";
    setIsQualified(qualified);

    // Mapeo para api-prospectos
    const urgencyMap: Record<string, string> = {
      "Inmediato, este mes": "alta",
      "En 1-3 meses": "media",
      "En más de 3 meses": "baja",
      "Solo estoy evaluando opciones": "solo_evaluando"
    };

    const payload = {
      nombre: formData.nombre,
      empresa: formData.empresa,
      correo: formData.correo,
      telefono: formData.telefono,
      canal: "opera_landing",
      industria: formData.tipo_operacion,
      urgencia: urgencyMap[formData.plazo] || "media",
      presupuesto_mayor_7000: formData.presupuesto,
      notas: `Herramienta actual: ${formData.herramienta_actual}`
    };

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !anonKey) {
        throw new Error("Configuración del servidor no disponible.");
      }

      const res = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errorDetail = "No se pudo registrar la información.";
        try {
          const errJson = await res.json();
          if (errJson.error) errorDetail = errJson.error;
        } catch {
          // ignore
        }
        throw new Error(errorDetail);
      }

      const json = await res.json();
      if (json.data?.lead_id) {
        setLeadId(json.data.lead_id);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Error al enviar formulario de calificación:", err);
      setErrorMessage(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Hubo un problema de conexión al registrar tus datos. Por favor intenta nuevamente o contáctanos directamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="calificacion" className="py-24 md:py-32 border-t border-hairline">
      <div className={`mx-auto px-6 lg:px-10 transition-all duration-500 ${showCalendar ? "max-w-4xl" : "max-w-3xl"}`}>
        <SectionHeader
          align="center"
          eyebrow="Agendar Demo"
          title={
            <>
              Hablemos de tu <span className="font-serif-italic text-primary">operación</span>.
            </>
          }
          description="Completa estos datos para agendar una sesión estratégica donde evaluaremos si OPERA es el fit correcto para tu empresa."
        />

        <div className={`mt-12 bg-surface/30 rounded-2xl border border-hairline shadow-lg transition-all duration-500 ${showCalendar ? "p-4 md:p-8" : "p-8"}`}>
          {submitted ? (
            !isQualified ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold mb-4">Gracias por tu interés</h3>
                <p className="text-muted-foreground mb-8">
                  Nuestro equipo revisará tu información y te contactaremos pronto.
                </p>
              </div>
            ) : !showCalendar ? (
              <div className="text-center py-12 px-4 transition-all duration-500 animate-in fade-in zoom-in-95">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary shadow-[0_0_35px_-5px_rgba(58,206,214,0.35)]">
                  <CheckCircle2 className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tight">
                  ¡Perfecto! Calificas para nuestra solución
                </h3>
                <p className="text-muted-foreground text-base max-w-md mx-auto mb-5">
                  Estamos preparando tu calendario personalizado para agendar la sesión estratégica...
                </p>
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary animate-ping" />
                  Abriendo agenda en tiempo real...
                </div>
              </div>
            ) : (
              <div className="py-2 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Sesión Calificada
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Elige la fecha y hora de tu sesión
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto mt-2">
                    Evaluaremos cómo OPERA se adapta a la flota y procesos de tu empresa. Tus datos ya vienen prellenados.
                  </p>
                </div>
                <div className="w-full overflow-hidden rounded-2xl border border-hairline bg-[#060B14]/80 shadow-2xl">
                  <InlineWidget
                    url={leadId ? `https://calendly.com/tideo/30min?salesforce_uuid=${leadId}` : "https://calendly.com/tideo/30min"}
                    styles={{ height: "700px", width: "100%" }}
                    pageSettings={{
                      backgroundColor: "060B14",
                      textColor: "f7f8fa",
                      primaryColor: "3aced6",
                      hideGdprBanner: true,
                    }}
                    prefill={{
                      name: formData.nombre,
                      email: formData.correo,
                    }}
                    utm={{
                      utmSource: "opera_landing",
                    }}
                  />
                </div>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nombre completo</label>
                  <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground" placeholder="Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Empresa</label>
                  <input required name="empresa" value={formData.empresa} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground" placeholder="Minería XYZ" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Correo de trabajo</label>
                  <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground" placeholder="juan@empresa.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Teléfono / WhatsApp</label>
                  <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground" placeholder="+51 ..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de operación</label>
                <select required name="tipo_operacion" value={formData.tipo_operacion} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Alquiler de maquinaria">Alquiler de maquinaria</option>
                  <option value="Taller de mantenimiento">Taller de mantenimiento</option>
                  <option value="Metalmecánica-producción">Metalmecánica-producción</option>
                  <option value="Flota de servicios">Flota de servicios</option>
                  <option value="Minería-construcción">Minería-construcción</option>
                  <option value="Contratista de mantenimiento">Contratista de mantenimiento</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">¿Qué usas hoy para gestionar tu operación?</label>
                <select required name="herramienta_actual" value={formData.herramienta_actual} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Excel/WhatsApp">Excel/WhatsApp</option>
                  <option value="Sistemas separados por área">Sistemas separados por área</option>
                  <option value="Ningún sistema">Ningún sistema</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">¿Cuentas con un presupuesto disponible mayor a $7,000 USD para este proyecto?</label>
                <select required name="presupuesto" value={formData.presupuesto} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                  <option value="Aún no lo he definido">Aún no lo he definido</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">¿En qué plazo piensas implementar una solución?</label>
                <select required name="plazo" value={formData.plazo} onChange={handleChange} className="w-full bg-background border border-hairline rounded-md px-4 py-3 focus:outline-none focus:border-primary/50 text-foreground">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Inmediato, este mes">Inmediato, este mes</option>
                  <option value="En 1-3 meses">En 1-3 meses</option>
                  <option value="En más de 3 meses">En más de 3 meses</option>
                  <option value="Solo estoy evaluando opciones">Solo estoy evaluando opciones</option>
                </select>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <HoverBorderGradient
                as="button"
                disabled={loading}
                type="submit"
                containerClassName="final-cta-gradient w-full rounded-full"
                className="final-cta-button inline-flex items-center justify-center gap-2 w-full rounded-full px-8 py-4 text-base md:text-lg font-semibold transition"
              >
                {loading ? "Enviando..." : "Evaluar mi caso"}
              </HoverBorderGradient>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
