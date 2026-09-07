import { useState, FormEvent } from "react";
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
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      
      if (supabaseUrl && anonKey) {
         const res = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`
          },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.data?.lead_id) {
          setLeadId(json.data.lead_id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="calificacion" className="py-24 md:py-32 border-t border-hairline">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
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

        <div className="mt-12 bg-surface/30 p-8 rounded-2xl border border-hairline shadow-lg">
          {submitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4">
                {isQualified ? "¡Todo listo!" : "Gracias por tu interés"}
              </h3>
              <p className="text-muted-foreground mb-8">
                {isQualified 
                  ? "A continuación puedes agendar la fecha y hora de nuestra sesión en el calendario." 
                  : "Nuestro equipo revisará tu información y te contactaremos pronto."}
              </p>
              {isQualified && (
                <HoverBorderGradient
                  as="button"
                  onClick={() => {
                    const calendlyUrl = leadId 
                      ? `https://calendly.com/tideo/30min?salesforce_uuid=${leadId}` 
                      : "https://calendly.com/tideo/30min";
                    window.open(calendlyUrl, "_blank");
                  }}
                  containerClassName="final-cta-gradient rounded-full"
                  className="final-cta-button inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base md:text-lg font-semibold transition"
                >
                  Agendar en Calendly
                </HoverBorderGradient>
              )}
            </div>
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
