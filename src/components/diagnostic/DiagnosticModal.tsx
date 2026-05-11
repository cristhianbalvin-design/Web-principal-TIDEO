import { useState, useMemo, useEffect } from "react";
import {
  MODULES, QUESTIONS, FINAL_QUESTIONS, RADAR_AXES,
  CX, CY,
  type ModuleId,
  isModuleComplete, countCompleted,
  calcRadarScores, radarPolygonPoints, nodePos, buildDiagPayload,
} from "./data";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

type View = "welcome" | "map" | "questions" | "final" | "final-done" | "capture" | "result";

interface UserData {
  userName: string;
  companyName: string;
  userPhone: string;
  userEmail: string;
}

// ── RadarChart ────────────────────────────────────────────────────────────────

function RadarChart({ answers }: { answers: Record<string, number[]> }) {
  const RCX = 110, RCY = 110, RR = 82;
  const scores = useMemo(() => calcRadarScores(answers), [answers]);
  const hasScore = scores.some((s) => s > 0);
  const polyPts = radarPolygonPoints(scores, RCX, RCY, RR);
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[200px] mx-auto">
      {gridLevels.map((lv) => (
        <circle key={lv} cx={RCX} cy={RCY} r={RR * lv}
          fill="none" stroke="#1A2B4A" strokeWidth={1} strokeOpacity={lv === 1 ? 0.9 : 0.45} />
      ))}
      {RADAR_AXES.map((axis) => {
        const rad = (axis.angle * Math.PI) / 180;
        const ex = RCX + RR * Math.cos(rad);
        const ey = RCY + RR * Math.sin(rad);
        const lx = RCX + (RR + 22) * Math.cos(rad);
        const ly = RCY + (RR + 22) * Math.sin(rad);
        return (
          <g key={axis.label}>
            <line x1={RCX} y1={RCY} x2={ex} y2={ey} stroke="#1A2B4A" strokeWidth={1} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fill="#607D8B" fontSize={8} fontFamily="Inter, sans-serif">
              {axis.short}
            </text>
          </g>
        );
      })}
      {hasScore && (
        <polygon points={polyPts}
          fill="rgba(0,188,212,0.22)" stroke="#00BCD4" strokeWidth={1.5}
          style={{ transition: "all 500ms ease" }} />
      )}
      {scores.map((s, i) => {
        if (s === 0) return null;
        const rad = (RADAR_AXES[i].angle * Math.PI) / 180;
        return (
          <circle key={i}
            cx={RCX + s * RR * Math.cos(rad)}
            cy={RCY + s * RR * Math.sin(rad)}
            r={3} fill="#00BCD4" />
        );
      })}
    </svg>
  );
}

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
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[11px] transition-colors hover:bg-white/5"
            style={{ color: done ? "#4CAF50" : partial ? "#F7F8FA" : "#607D8B" }}>
            <span className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center rounded-full text-[9px]"
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

// Returns the point on the rect border (centered at x2,y2, half-dims w×h)
// where the line from (x1,y1) enters, plus the hub circle edge as start point.
function lineEndpoints(
  x1: number, y1: number, hubR: number,
  x2: number, y2: number, w = 62, h = 24
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = x2 - x1, dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const sx = x1 + hubR * Math.cos(angle);
  const sy = y1 + hubR * Math.sin(angle);

  const candidates: { t: number; x: number; y: number }[] = [];
  if (dx !== 0) {
    for (const ex of [x2 - w, x2 + w]) {
      const t = (ex - x1) / dx;
      if (t > 0 && t <= 1) {
        const ey = y1 + t * dy;
        if (ey >= y2 - h && ey <= y2 + h) candidates.push({ t, x: ex, y: ey });
      }
    }
  }
  if (dy !== 0) {
    for (const ey of [y2 - h, y2 + h]) {
      const t = (ey - y1) / dy;
      if (t > 0 && t <= 1) {
        const ex = x1 + t * dx;
        if (ex >= x2 - w && ex <= x2 + w) candidates.push({ t, x: ex, y: ey });
      }
    }
  }
  candidates.sort((a, b) => b.t - a.t);
  const end = candidates[0] ?? { x: x2, y: y2 };
  return { x1: sx, y1: sy, x2: end.x, y2: end.y };
}

// ── NodeMap ───────────────────────────────────────────────────────────────────

function NodeMap({
  answers, onSelect,
}: {
  answers: Record<string, number[]>;
  onSelect: (id: ModuleId) => void;
}) {
  const [hovered, setHovered] = useState<ModuleId | null>(null);
  const completed = countCompleted(answers);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 select-none">
      <svg viewBox="0 0 580 560" className="w-full" style={{ maxHeight: "calc(100vh - 180px)" }}>
        {/* Hub */}
        <circle cx={CX} cy={CY} r={50} fill="#090F1C" stroke="#1A2B4A" strokeWidth={1.5} />
        <text x={CX} y={CY - 8} textAnchor="middle" fill="#00BCD4" fontSize={13} fontWeight="700" fontFamily="Inter, sans-serif">TIDEO</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="#607D8B" fontSize={9} fontFamily="Inter, sans-serif">{completed}/10 módulos</text>

        {/* Lines */}
        {MODULES.map((m) => {
          const { x, y } = nodePos(m.angle);
          const done = isModuleComplete(m.id, answers);
          const isHov = hovered === m.id;
          const ep = lineEndpoints(CX, CY, 50, x, y);
          return (
            <line key={`l-${m.id}`} x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
              stroke={done ? "#4CAF50" : isHov ? "#00BCD4" : "#1A2B4A"}
              strokeWidth={isHov || done ? 1.5 : 1}
              strokeOpacity={isHov || done ? 0.7 : 0.35}
              style={{ transition: "all 300ms ease" }} />
          );
        })}

        {/* Nodes */}
        {MODULES.map((m) => {
          const { x, y } = nodePos(m.angle);
          const done = isModuleComplete(m.id, answers);
          const isHov = hovered === m.id;
          const twoLine = m.lines.length === 2;

          const strokeColor = done ? "#4CAF50" : isHov ? "#00BCD4" : "#1A2B4A";
          const fillColor = done
            ? "rgba(76,175,80,0.12)"
            : isHov
            ? "rgba(0,188,212,0.12)"
            : "rgba(6,11,20,0.92)";
          const textColor = done ? "#4CAF50" : isHov ? "#00BCD4" : "#C8D6E5";

          return (
            <g key={m.id} transform={`translate(${x},${y})`}
              onClick={() => onSelect(m.id)}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}>
              <rect x={-62} y={-24} width={124} height={48} rx={9}
                fill={fillColor} stroke={strokeColor}
                strokeWidth={isHov || done ? 1.5 : 1}
                style={{ transition: "all 250ms ease" }} />
              {twoLine ? (
                <>
                  <text x={0} y={-6} textAnchor="middle" fill={textColor}
                    fontSize={10.5} fontFamily="Inter, sans-serif" style={{ transition: "fill 250ms ease" }}>
                    {m.lines[0]}
                  </text>
                  <text x={0} y={10} textAnchor="middle" fill={textColor}
                    fontSize={10.5} fontFamily="Inter, sans-serif" style={{ transition: "fill 250ms ease" }}>
                    {m.lines[1]}
                  </text>
                </>
              ) : (
                <text x={0} y={4} textAnchor="middle" fill={textColor}
                  fontSize={10.5} fontFamily="Inter, sans-serif" style={{ transition: "fill 250ms ease" }}>
                  {m.lines[0]}
                </text>
              )}
              {done && (
                <g transform="translate(40,-18)">
                  <circle r={8} fill="rgba(76,175,80,0.25)" />
                  <text textAnchor="middle" y={4} fill="#4CAF50" fontSize={10}>✓</text>
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

// ── DiagnosisResult ───────────────────────────────────────────────────────────

function DiagnosisResult({
  text, onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const sections = text.split("\n").filter(Boolean);

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

      <a href="/contacto" onClick={onClose}
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

  const completed = useMemo(() => countCompleted(answers), [answers]);
  const canFinal = completed >= 6;

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
    setView("final-done");
  };

  const handleGenerate = async (userData: UserData) => {
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
      setDiagnosis(json.diagnostic ?? json.error ?? "Sin resultado");
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
          {canFinal && !["welcome","capture","final","final-done","result"].includes(view) && (
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
            <NodeMap answers={answers} onSelect={handleSelectModule} />
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
          {view === "final-done" && (
            <FinalDone onNext={() => setView("capture")} />
          )}
          {view === "capture" && (
            <CaptureForm onSubmit={handleGenerate} loading={loading} />
          )}
          {view === "result" && (
            loading && !diagnosis ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 animate-in fade-in-0 duration-300">
                <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: "#00BCD4", borderTopColor: "transparent" }} />
                <p className="text-sm" style={{ color: "#607D8B" }}>Analizando tu diagnóstico con IA...</p>
              </div>
            ) : diagnosis ? (
              <DiagnosisResult text={diagnosis} onClose={handleClose} />
            ) : null
          )}
        </div>

        {/* Sidebar — desktop only */}
        {showSidebar && (
          <div className="hidden lg:flex w-64 flex-col border-l flex-shrink-0 overflow-auto"
            style={{ borderColor: "#1A2B4A" }}>
            <div className="p-4 border-b" style={{ borderColor: "#1A2B4A" }}>
              <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "#607D8B" }}>
                Radar de madurez
              </p>
              <RadarChart answers={answers} />
            </div>
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
