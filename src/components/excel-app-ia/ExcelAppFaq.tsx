import { HelpCircle } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/content/excel-app-ia";
import { Section, WA_URL, onWhatsAppClick } from "./shared";

/** Sección 16: preguntas frecuentes. */
export function ExcelAppFaq() {
  return (
    <Section id="faq" className="border-t border-hairline" width="max-w-4xl">
      <SectionHeader
        align="center"
        eyebrow="Resolviendo dudas"
        title={
          <>
            Preguntas <span className="font-serif-italic text-academy">frecuentes</span>
          </>
        }
      />
      <div className="mt-14 rounded-2xl border border-hairline bg-surface/30 p-4 sm:p-8">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="border border-hairline/80 rounded-xl px-4 sm:px-5 bg-background/60 data-[state=open]:border-academy/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline text-foreground">
                <span className="flex items-start gap-3 pr-2">
                  <HelpCircle className="w-4 h-4 text-academy shrink-0 mt-1" />
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pt-1 pl-7 border-t border-hairline/40">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        ¿Tienes una pregunta sobre tu proyecto?{" "}
        <a
          href={WA_URL}
          onClick={onWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="text-academy font-medium hover:underline"
        >
          Escríbenos por WhatsApp
        </a>
      </p>
    </Section>
  );
}
