import { useState, useMemo, useEffect } from "react";
import {
  MODULES, QUESTIONS, FINAL_QUESTIONS,
  type ModuleId,
  isModuleComplete, countCompleted,
  calcModuleScores, buildDiagPayload,
} from "./data";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const URGENCIA_OPTS = [
  "Estoy explorando, sin urgencia",
  "Queremos hacerlo este año",
  "Es una prioridad para este semestre",
  "Necesito una solución ya",
];

function getMaturityLevel(pct: number): string {
  if (pct <= 25) return "Inicial";
  if (pct <= 50) return "En desarrollo";
  if (pct <= 75) return "Avanzado";
  return "Líder digital";
}

function extractRecommendedService(text: string): string {
  const match = text.match(/\*\*Primer paso recomendado:\*\*\s*\n?([^\n*]+)/);
  return match ? match[1].trim() : "TIDEO Labs — ERP personalizado";
}

type View = "welcome" | "map" | "questions" | "final" | "radar-preview" | "final-done" | "capture" | "result";

interface UserData {
  userName: string;
  companyName: string;
  userPhone: string;
  userEmail: string;
}

const DIAGNOSTIC_CONTACT_STORAGE_KEY = "tideo:diagnostic-contact-prefill";

// ── ModuleList ────────────────────────────────────────────────────────────────

function ModuleList({
  answers, onSelect,
}: {
  answers: Record<string, number[]>;
  onSelect: (id: ModuleId) => void;
}) {
  return (
    <div className="space-y-0.5">
      {MODULES.map((m) => {
        const done = isModuleComplete(m.id, answers);
        const partial = !done && (answers[m.id]?.length ?? 0) > 0;
        return (
          <button key={m.id} onClick={() => onSelect(m.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-colors hover:bg-white/5"
            style={{ color: done ? "#4CAF50" : partial ? "#F7F8FA" : "#8A9BB0" }}>
            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full text-[10px]"
              style={{
                background: done ? "rgba(76,175,80,0.2)" : partial ? "rgba(0,188,212,0.15)" : "#1A2B4A",
                color: done ? "#4CAF50" : partial ? "#00BCD4" : "#607D8B",
              }}>
              {done ? "✓" : partial ? "·" : "○"}
            </span>
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

// ── WelcomeScreen ─────────────────────────────────────────────────────────────

function WelcomeScreen({ onComplete }: { onComplete: (size: string) => void }) {
  const sizes = [
    "1 a 10 personas",
    "11 a 50 personas",
    "51 a 200 personas",
    "Más de 200 personas",
  ];
  return (
    <div className="flex flex-col h-full overflow-auto p-6 lg:p-10 max-w-2xl mx-auto w-full justify-center">
      <div className="mb-10 animate-in fade-in-0 duration-300">
        <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "#F7F8FA" }}>
          Antes de empezar, cuéntanos sobre tu empresa
        </h2>
        <p className="text-sm" style={{ color: "#607D8B" }}>
          Esto nos permite darte un diagnóstico ajustado a tu realidad, no uno genérico.
        </p>
      </div>
      <div className="animate-in fade-in-0 slide-in-from-bottom-3 duration-400">
        <h3 className="text-base font-semibold mb-5" style={{ color: "#F7F8FA" }}>
          ¿Cuántas personas trabajan en tu empresa?
        </h3>
        <div className="grid gap-3">
          {sizes.map((size, i) => (
            <button key={i} onClick={() => onComplete(size)}
              className="w-full text-left px-5 py-4 rounded-xl border text-sm leading-snug transition-all duration-200"
              style={{ borderColor: "#1A2B4A", background: "rgba(10,22,40,0.8)", color: "#F7F8FA" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00BCD4";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,188,212,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1A2B4A";
                (e.currentTarget as HTMLElement).style.background = "rgba(10,22,40,0.8)";
              }}>
              <span className="font-mono text-xs mr-3" style={{ color: "#00BCD4" }}>
                {String.fromCharCode(65 + i)}
              </span>
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RadarMap ──────────────────────────────────────────────────────────────────

function RadarMap({
  answers, onSelect,
}: {
  answers: Record<string, number[]>;
  onSelect: (id: ModuleId) => void;
}) {
  const [hovered, setHovered] = useState<ModuleId | null>(null);
  const completed = countCompleted(answers);
  const RCX = 350, RCY = 350, RR = 230, LABEL_R = 295;
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const scores = useMemo(() => calcModuleScores(answers), [answers]);
  const hasScore = scores.some((s) => s > 0);

  const polyPts = MODULES.map((m, i) => {
    const r = scores[i] * RR;
    const rad = (m.angle * Math.PI) / 180;
    return `${RCX + r * Math.cos(rad)},${RCY + r * Math.sin(rad)}`;
  }).join(" ");

  return (
    <div className="h-full overflow-hidden">

      {/* ── Mobile: grid 2 columnas ── */}
      <div className="lg:hidden flex flex-col h-full overflow-auto p-4 gap-3">
        <div className="grid grid-cols-2 gap-2">
          {MODULES.map((m) => {
            const done = isModuleComplete(m.id, answers);
            const partial = !done && (answers[m.id]?.length ?? 0) > 0;
            return (
              <button key={m.id} onClick={() => onSelect(m.id)}
                className="flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all active:scale-95"
                style={{
                  background: done ? "rgba(76,175,80,0.12)" : partial ? "rgba(0,188,212,0.08)" : "rgba(6,11,20,0.92)",
                  border: `1px solid ${done ? "#4CAF50" : partial ? "#00BCD4" : "#1A2B4A"}`,
                  color: done ? "#4CAF50" : partial ? "#00BCD4" : "#C8D6E5",
                  minHeight: "64px",
                }}>
                <span className="text-sm font-medium leading-tight">{m.label}</span>
                {done && <span className="text-[11px] mt-1" style={{ color: "#4CAF50" }}>✓ Completo</span>}
                {partial && <span className="text-[11px] mt-1" style={{ color: "#00BCD4" }}>En progreso</span>}
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs" style={{ color: "#607D8B" }}>
          Toca un módulo para comenzar
        </p>
      </div>

      {/* ── Desktop: radar interactivo ── */}
      <div className="hidden lg:flex flex-col items-center justify-center h-full p-4 select-none">
        <svg viewBox="0 0 700 700" className="w-full" style={{ maxHeight: "calc(100vh - 180px)" }}>

          {/* Grid */}
          {gridLevels.map((lv) => {
            const pts = MODULES.map((m) => {
              const rad = (m.angle * Math.PI) / 180;
              return `${RCX + lv * RR * Math.cos(rad)},${RCY + lv * RR * Math.sin(rad)}`;
            }).join(" ");
            return (
              <polygon key={lv} points={pts} fill="none"
                stroke="#2A4A70" strokeWidth={1}
                strokeOpacity={lv === 1 ? 0.8 : 0.4} />
            );
          })}

          {/* Ejes */}
          {MODULES.map((m) => {
            const rad = (m.angle * Math.PI) / 180;
            const ex = RCX + RR * Math.cos(rad);
            const ey = RCY + RR * Math.sin(rad);
            const done = isModuleComplete(m.id, answers);
            const isHov = hovered === m.id;
            return (
              <line key={`ax-${m.id}`} x1={RCX} y1={RCY} x2={ex} y2={ey}
                stroke={done ? "#4CAF50" : isHov ? "#00BCD4" : "#2A4A70"}
                strokeWidth={isHov || done ? 1.5 : 1}
                strokeOpacity={isHov || done ? 0.85 : 0.55}
                style={{ transition: "stroke 300ms ease" }} />
            );
          })}

          {/* Polígono de datos */}
          {hasScore && (
            <polygon points={polyPts}
              fill="rgba(0,188,212,0.18)" stroke="#00BCD4" strokeWidth={2}
              style={{ transition: "all 500ms ease" }} />
          )}

          {/* Puntos de datos */}
          {MODULES.map((m, i) => {
            if (!scores[i]) return null;
            const rad = (m.angle * Math.PI) / 180;
            const r = scores[i] * RR;
            return (
              <circle key={`dot-${m.id}`}
                cx={RCX + r * Math.cos(rad)} cy={RCY + r * Math.sin(rad)}
                r={4} fill="#00BCD4" opacity={0.9} />
            );
          })}

          {/* Hub central */}
          <circle cx={RCX} cy={RCY} r={42} fill="#090F1C" stroke="#1A2B4A" strokeWidth={1.5} />
          <text x={RCX} y={RCY - 7} textAnchor="middle" fill="#00BCD4"
            fontSize={14} fontWeight="700" fontFamily="Inter, sans-serif">TIDEO</text>
          <text x={RCX} y={RCY + 10} textAnchor="middle" fill="#607D8B"
            fontSize={10} fontFamily="Inter, sans-serif">{completed}/10</text>

          {/* Cajas de módulo clickeables */}
          {MODULES.map((m) => {
            const rad = (m.angle * Math.PI) / 180;
            const lx = RCX + LABEL_R * Math.cos(rad);
            const ly = RCY + LABEL_R * Math.sin(rad);
            const done = isModuleComplete(m.id, answers);
            const isHov = hovered === m.id;
            const twoLine = m.lines.length === 2;
            const W = 108, H = twoLine ? 46 : 30;

            const strokeColor = done ? "#4CAF50" : isHov ? "#00BCD4" : "#2A4A70";
            const fillColor = done
              ? "rgba(76,175,80,0.15)"
              : isHov
              ? "rgba(0,188,212,0.15)"
              : "rgba(6,11,20,0.92)";
            const textColor = done ? "#4CAF50" : isHov ? "#00BCD4" : "#C8D6E5";

            return (
              <g key={`lbl-${m.id}`} transform={`translate(${lx},${ly})`}
                onClick={() => onSelect(m.id)}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}>
                <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={9}
                  fill={fillColor} stroke={strokeColor}
                  strokeWidth={isHov || done ? 1.5 : 1}
                  style={{ transition: "all 250ms ease" }} />
                {twoLine ? (
                  <>
                    <text x={0} y={-8} textAnchor="middle" fill={textColor}
                      fontSize={12} fontFamily="Inter, sans-serif"
                      style={{ transition: "fill 250ms ease" }}>
                      {m.lines[0]}
                    </text>
                    <text x={0} y={9} textAnchor="middle" fill={textColor}
                      fontSize={12} fontFamily="Inter, sans-serif"
                      style={{ transition: "fill 250ms ease" }}>
                      {m.lines[1]}
                    </text>
                  </>
                ) : (
                  <text x={0} y={0} textAnchor="middle" dominantBaseline="middle"
                    fill={textColor} fontSize={12} fontFamily="Inter, sans-serif"
                    style={{ transition: "fill 250ms ease" }}>
                    {m.lines[0]}
                  </text>
                )}
                {done && (
                  <g transform={`translate(${W / 2 - 9},${-H / 2 + 9})`}>
                    <circle r={7} fill="rgba(76,175,80,0.3)" />
                    <text textAnchor="middle" dominantBaseline="middle"
                      fill="#4CAF50" fontSize={9}>✓</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-xs" style={{ color: "#607D8B" }}>
          Haz clic en un módulo para comenzar
        </p>
      </div>

    </div>
  );
}

// ── QuestionPanel ─────────────────────────────────────────────────────────────

function QuestionPanel({
  moduleId, answers, onAnswer, onBack,
}: {
  moduleId: ModuleId;
  answers: Record<string, number[]>;
  onAnswer: (id: ModuleId, qi: number, score: number) => void;
  onBack: () => void;
}) {
  const qs = QUESTIONS[moduleId];
  const done = isModuleComplete(moduleId, answers);
  const currentQi = answers[moduleId]?.length ?? 0;
  const mod = MODULES.find((m) => m.id === moduleId)!;

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onBack, 1000);
    return () => clearTimeout(t);
  }, [done, onBack]);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in-0 duration-300">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.4)" }}>
          <span style={{ color: "#4CAF50", fontSize: 28 }}>✓</span>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "#4CAF50" }}>
          {mod.label} completado
        </h3>
      </div>
    );
  }

  const q = qs[currentQi];

  return (
    <div className="flex flex-col h-full overflow-auto p-6 lg:p-10 max-w-2xl mx-auto w-full">
      <button onClick={onBack}
        className="self-start flex items-center gap-1.5 text-xs mb-6 transition-colors"
        style={{ color: "#607D8B" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F7F8FA")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#607D8B")}>
        ← {mod.label}
      </button>

      <div className="flex items-center gap-2 mb-6">
        {qs.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < currentQi ? "#4CAF50" : i === currentQi ? "#00BCD4" : "#1A2B4A" }} />
        ))}
      </div>

      <div key={currentQi} className="animate-in fade-in-0 slide-in-from-right-4 duration-300 flex-1">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#607D8B" }}>
          Pregunta {currentQi + 1} de {qs.length}
        </p>
        <h3 className="text-xl lg:text-2xl font-bold leading-snug mb-8" style={{ color: "#F7F8FA" }}>
          {q.q}
        </h3>
        <div className="grid gap-3">
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => onAnswer(moduleId, currentQi, i + 1)}
              className="w-full text-left px-5 py-4 rounded-xl border text-sm leading-snug transition-all duration-200 hover:brightness-110"
              style={{ borderColor: "#1A2B4A", background: "rgba(10,22,40,0.8)", color: "#F7F8FA" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00BCD4";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,188,212,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1A2B4A";
                (e.currentTarget as HTMLElement).style.background = "rgba(10,22,40,0.8)";
              }}>
              <span className="font-mono text-xs mr-3" style={{ color: "#00BCD4" }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FinalBlock ────────────────────────────────────────────────────────────────

function FinalBlock({
  onComplete,
}: {
  onComplete: (answers: number[]) => void;
}) {
  const [qi, setQi] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const next = [...localAnswers, score];
    if (qi < FINAL_QUESTIONS.length - 1) {
      setLocalAnswers(next);
      setQi(qi + 1);
    } else {
      onComplete(next);
    }
  };

  const q = FINAL_QUESTIONS[qi];

  return (
    <div className="flex flex-col h-full overflow-auto p-6 lg:p-10 max-w-2xl mx-auto w-full justify-center">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#00BCD4" }}>
          Bloque final
        </p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#F7F8FA" }}>
          Una última cosa antes de tu diagnóstico
        </h2>
        <p className="text-sm" style={{ color: "#607D8B" }}>
          Queremos entender el impacto real en tu negocio.
        </p>
      </div>

      <div className="flex gap-2 mb-8">
        {FINAL_QUESTIONS.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < qi ? "#4CAF50" : i === qi ? "#00BCD4" : "#1A2B4A" }} />
        ))}
      </div>

      <div key={qi} className="animate-in fade-in-0 slide-in-from-bottom-3 duration-300">
        <h3 className="text-lg font-bold leading-snug mb-6" style={{ color: "#F7F8FA" }}>
          {q.q}
        </h3>
        <div className="grid gap-3">
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i + 1)}
              className="w-full text-left px-5 py-4 rounded-xl border text-sm leading-snug transition-all duration-200"
              style={{ borderColor: "#1A2B4A", background: "rgba(10,22,40,0.8)", color: "#F7F8FA" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#00BCD4";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,188,212,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1A2B4A";
                (e.currentTarget as HTMLElement).style.background = "rgba(10,22,40,0.8)";
              }}>
              <span className="font-mono text-xs mr-3" style={{ color: "#00BCD4" }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FinalDone ─────────────────────────────────────────────────────────────────

function FinalDone({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in-0 duration-300">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "rgba(0,188,212,0.12)", border: "1px solid rgba(0,188,212,0.35)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{ color: "#F7F8FA" }}>
        ¡Diagnóstico listo para generar!
      </h3>
      <p className="text-sm mb-10 max-w-sm" style={{ color: "#607D8B" }}>
        Hemos recopilado tus respuestas. Nuestro consultor IA analizará tu situación y te entregará un diagnóstico personalizado.
      </p>
      <button onClick={onNext}
        className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
        style={{ background: "#00BCD4", color: "#060B14" }}>
        Ver mi diagnóstico de madurez digital →
      </button>
    </div>
  );
}

// ── CaptureForm ───────────────────────────────────────────────────────────────

function CaptureForm({ onSubmit, loading }: { onSubmit: (data: UserData) => void; loading: boolean }) {
  const [form, setForm] = useState<UserData>({ userName: "", companyName: "", userPhone: "", userEmail: "" });
  const [submitted, setSubmitted] = useState(false);

  const err = {
    userName:    submitted && !form.userName.trim()    ? "Requerido" : "",
    companyName: submitted && !form.companyName.trim() ? "Requerido" : "",
    userPhone:   submitted && !form.userPhone.trim()   ? "Requerido" : "",
    userEmail:   submitted && (!form.userEmail.trim() || !form.userEmail.includes("@"))
      ? "Ingresa un email válido" : "",
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (
      form.userName.trim() && form.companyName.trim() &&
      form.userPhone.trim() && form.userEmail.trim() && form.userEmail.includes("@")
    ) onSubmit(form);
  };

  const inputStyle = (hasError: boolean) => ({
    background: "#0A1628",
    border: `1px solid ${hasError ? "#EF4444" : "#1A2B4A"}`,
    color: "#F7F8FA",
  });

  return (
    <div className="flex flex-col h-full overflow-auto p-6 lg:p-10 max-w-2xl mx-auto w-full justify-center">
      <div className="mb-8 animate-in fade-in-0 duration-300">
        <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "#F7F8FA" }}>
          Tu diagnóstico está listo
        </h2>
        <p className="text-sm" style={{ color: "#607D8B" }}>
          Ingresa tus datos para recibirlo ahora en pantalla. También te lo enviaremos a tu correo cuando esté disponible.
        </p>
      </div>

      <div className="grid gap-4">
        {(["userName", "companyName", "userPhone", "userEmail"] as (keyof UserData)[]).map((key) => {
          const meta: Record<keyof UserData, { label: string; type: string; placeholder: string }> = {
            userName:    { label: "Nombre completo",      type: "text",  placeholder: "Tu nombre completo" },
            companyName: { label: "Nombre de empresa",    type: "text",  placeholder: "Nombre de tu empresa" },
            userPhone:   { label: "Teléfono / WhatsApp",  type: "tel",   placeholder: "+51 9..." },
            userEmail:   { label: "Correo electrónico",   type: "email", placeholder: "correo@empresa.com" },
          };
          const { label, type, placeholder } = meta[key];
          return (
            <div key={key}>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#C8D6E5" }}>{label}</label>
              <input
                type={type} placeholder={placeholder} value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle(!!err[key])}
              />
              {err[key] && <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{err[key]}</p>}
            </div>
          );
        })}
      </div>

      <button onClick={handleSubmit} disabled={loading}
        className="mt-8 flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "#00BCD4", color: "#060B14" }}>
        {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {loading ? "Generando diagnóstico..." : "Ver mi diagnóstico →"}
      </button>
    </div>
  );
}

// ── LoadingScreen ─────────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  "Analizando tus respuestas...",
  "Identificando áreas críticas en tu operación...",
  "Calculando tu nivel de madurez digital...",
  "Evaluando el impacto de las brechas detectadas...",
  "Preparando recomendaciones personalizadas...",
  "Construyendo tu plan de acción estratégico...",
  "Redactando tu diagnóstico con IA...",
  "Revisando cada detalle de tu perfil...",
  "Ya casi está listo tu informe...",
];

function LoadingScreen() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % LOADING_MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 animate-in fade-in-0 duration-300 px-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full animate-spin"
          style={{ border: "2px solid #1A2B4A", borderTopColor: "#00BCD4" }} />
        <div className="absolute inset-2 rounded-full animate-spin"
          style={{ border: "1.5px solid #1A2B4A", borderBottomColor: "#00BCD4", animationDirection: "reverse", animationDuration: "1.5s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ background: "#00BCD4" }} />
        </div>
      </div>
      <div className="text-center max-w-sm">
        <p className="text-base font-medium transition-opacity duration-400"
          style={{ color: "#F7F8FA", opacity: visible ? 1 : 0 }}>
          {LOADING_MESSAGES[index]}
        </p>
        <p className="text-xs mt-3" style={{ color: "#607D8B" }}>
          Nuestro consultor IA está procesando tu diagnóstico
        </p>
      </div>
      <div className="flex gap-1.5">
        {LOADING_MESSAGES.map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === index ? "24px" : "6px",
              background: i === index ? "#00BCD4" : "#1A2B4A",
            }} />
        ))}
      </div>
    </div>
  );
}

// ── DiagnosisResult ───────────────────────────────────────────────────────────

function DiagnosisResult({
  text, userData, onClose,
}: {
  text: string;
  userData: UserData | null;
  onClose: () => void;
}) {
  const sections = text.split("\n").filter(Boolean);

  const handleContactClick = () => {
    if (typeof window !== "undefined" && userData) {
      window.sessionStorage.setItem(
        DIAGNOSTIC_CONTACT_STORAGE_KEY,
        JSON.stringify({
          nombre: userData.userName,
          empresa: userData.companyName,
          whatsapp: userData.userPhone,
          correo: userData.userEmail,
        }),
      );
    }
    onClose();
  };

  return (
    <div className="flex flex-col h-full overflow-auto p-6 lg:p-10 max-w-3xl mx-auto w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-400">
      <div className="rounded-2xl border p-6 lg:p-8 mb-6"
        style={{ borderColor: "#1A2B4A", background: "rgba(10,22,40,0.8)" }}>
        <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: "#1A2B4A" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}>
            T
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#F7F8FA" }}>TIDEO Tech & Strategy</p>
            <p className="text-xs" style={{ color: "#607D8B" }}>Diagnóstico de Madurez Digital</p>
          </div>
        </div>

        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#C8D6E5" }}>
          {sections.map((line, i) => {
            if (line.startsWith("- ")) {
              return (
                <div key={i} className="flex gap-2">
                  <span style={{ color: "#00BCD4", flexShrink: 0 }}>·</span>
                  <span>{line.slice(2)}</span>
                </div>
              );
            }
            if (line.startsWith("**") || line.match(/^[A-ZÁÉÍÓÚ][^:]{2,30}:/)) {
              return (
                <p key={i} className="font-semibold mt-5 first:mt-0" style={{ color: "#F7F8FA" }}>
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      <a href="/contacto?origen=diagnostico" onClick={handleContactClick}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
        style={{ background: "#00BCD4", color: "#060B14" }}>
        Agenda tu auditoría gratuita →
      </a>

      <button onClick={onClose}
        className="mt-4 text-xs text-center w-full transition-colors"
        style={{ color: "#607D8B" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F7F8FA")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#607D8B")}>
        Cerrar y volver al sitio
      </button>
    </div>
  );
}

// ── DiagnosticModal ───────────────────────────────────────────────────────────

export function DiagnosticModal({
  isOpen, onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<View>("welcome");
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [companySizeContext, setCompanySizeContext] = useState("");
  const [diagnosticUserData, setDiagnosticUserData] = useState<UserData | null>(null);

  const completed = useMemo(() => countCompleted(answers), [answers]);
  const canFinal = completed === MODULES.length;

  useEffect(() => {
    if (completed === MODULES.length && view === "map") {
      setView("final");
    }
  }, [completed, view]);

  const handleSelectModule = (id: ModuleId) => {
    setActiveModule(id);
    setView("questions");
  };

  const handleAnswer = (id: ModuleId, qi: number, score: number) => {
    setAnswers((prev) => {
      const existing = prev[id] ?? [];
      const updated = [...existing];
      updated[qi] = score;
      return { ...prev, [id]: updated };
    });
  };

  const handleFinalComplete = (fa: number[]) => {
    setFinalAnswers(fa);
    setView("radar-preview");
  };

  useEffect(() => {
    if (view !== "radar-preview") return;
    const t = setTimeout(() => setView("final-done"), 2000);
    return () => clearTimeout(t);
  }, [view]);

  const handleGenerate = async (userData: UserData) => {
    setDiagnosticUserData(userData);
    setLoading(true);
    setView("result");
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setDiagnosis("⚠ Variables de entorno no configuradas. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel y haz un nuevo deploy.");
      setLoading(false);
      return;
    }
    try {
      const payload = buildDiagPayload(answers, finalAnswers, { ...userData, companySizeContext });

      // TODO: Enviar diagnóstico por email al usuario (userData.userEmail)
      // Conectar aquí con Resend, SendGrid o similar:
      // await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     to: userData.userEmail,
      //     userName: userData.userName,
      //     companyName: userData.companyName,
      //     maturityPercentage: payload.maturityPercentage,
      //     criticalAreas: payload.criticalAreas,
      //   }),
      // });

      const res = await fetch(`${SUPABASE_URL}/functions/v1/get-diagnostic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          allAnswers: payload.prompt,
          moduleScores: payload.moduleScores,
          maturityPercentage: payload.maturityPercentage,
          criticalAreas: payload.criticalAreas,
          companySizeContext: payload.companySizeContext,
          userName: payload.userName,
          companyName: payload.companyName,
        }),
      });
      const json = await res.json() as { diagnostic?: string; error?: string };
      const diagnosticText = json.diagnostic ?? json.error ?? "Sin resultado";
      setDiagnosis(diagnosticText);

      // Fire-and-forget: send emails without blocking the UI
      if (json.diagnostic && SUPABASE_URL && SUPABASE_ANON_KEY) {
        fetch(`${SUPABASE_URL}/functions/v1/send-diagnostic-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            userName: payload.userName,
            companyName: payload.companyName,
            userEmail: payload.userEmail,
            userPhone: payload.userPhone,
            diagnosticResult: diagnosticText,
            maturityLevel: getMaturityLevel(payload.maturityPercentage),
            maturityPercentage: payload.maturityPercentage,
            criticalAreas: payload.criticalAreas,
            recommendedService: extractRecommendedService(diagnosticText),
            urgencia: finalAnswers[2] ? URGENCIA_OPTS[finalAnswers[2] - 1] : "No especificada",
          }),
        }).catch((e) => console.error("send-diagnostic-email failed:", e));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setDiagnosis(`Error al conectar con el servidor de diagnóstico: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView("welcome");
      setActiveModule(null);
      setAnswers({});
      setFinalAnswers([]);
      setDiagnosis(null);
      setLoading(false);
      setCompanySizeContext("");
      setDiagnosticUserData(null);
    }, 300);
  };

  if (!isOpen) return null;

  const showSidebar = !["welcome", "capture", "result"].includes(view);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col animate-in fade-in-0 duration-300"
      style={{ backgroundColor: "#060B14" }}>

      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-3.5 border-b flex-shrink-0"
        style={{ borderColor: "#1A2B4A" }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold truncate" style={{ color: "#F7F8FA" }}>
              Diagnóstico Digital — TIDEO
            </p>
            {view !== "welcome" && view !== "capture" && (
              <span className="hidden sm:block text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,188,212,0.12)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.25)" }}>
                {completed}/10 módulos
              </span>
            )}
          </div>
          {view !== "welcome" && view !== "capture" && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#1A2B4A" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completed / 10) * 100}%`, background: "#00BCD4" }} />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {view === "questions" && (
            <button onClick={() => setView("map")}
              className="px-3 py-1.5 text-xs rounded-lg border transition-all"
              style={{ borderColor: "#1A2B4A", color: "#607D8B" }}>
              ← Mapa
            </button>
          )}
          {canFinal && !["welcome","capture","final","radar-preview","final-done","result"].includes(view) && (
            <button onClick={() => setView("final")}
              className="px-3 py-1.5 text-xs rounded-lg font-medium transition-all"
              style={{ background: "rgba(0,188,212,0.12)", color: "#00BCD4", border: "1px solid rgba(0,188,212,0.3)" }}>
              Ver diagnóstico →
            </button>
          )}
          <button onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-lg transition-colors"
            style={{ color: "#607D8B" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F7F8FA")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#607D8B")}>
            ✕
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex min-h-0">
        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {view === "welcome" && (
            <WelcomeScreen onComplete={(size) => { setCompanySizeContext(size); setView("map"); }} />
          )}
          {view === "map" && (
            <RadarMap answers={answers} onSelect={handleSelectModule} />
          )}
          {view === "questions" && activeModule && (
            <QuestionPanel
              moduleId={activeModule}
              answers={answers}
              onAnswer={handleAnswer}
              onBack={() => setView("map")}
            />
          )}
          {view === "final" && (
            <FinalBlock onComplete={handleFinalComplete} />
          )}
          {view === "radar-preview" && (
            <div className="h-full pointer-events-none">
              <RadarMap answers={answers} onSelect={() => {}} />
            </div>
          )}
          {view === "final-done" && (
            <FinalDone onNext={() => setView("capture")} />
          )}
          {view === "capture" && (
            <CaptureForm onSubmit={handleGenerate} loading={loading} />
          )}
          {view === "result" && (
            loading && !diagnosis ? (
              <LoadingScreen />
            ) : diagnosis ? (
              <DiagnosisResult
                text={diagnosis}
                userData={diagnosticUserData}
                onClose={handleClose}
              />
            ) : null
          )}
        </div>

        {/* Sidebar — desktop only */}
        {showSidebar && (
          <div className="hidden lg:flex w-56 flex-col border-l flex-shrink-0 overflow-auto"
            style={{ borderColor: "#1A2B4A" }}>
            <div className="p-4 flex-1">
              <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "#607D8B" }}>
                Módulos
              </p>
              <ModuleList answers={answers} onSelect={handleSelectModule} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
