import { createFileRoute } from "@tanstack/react-router";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Footer } from "@/components/site/Footer";
import { EXCEL_APP_URL, SITE_URL, jsonLdScript } from "@/lib/site";
import { COURSE, SEO } from "@/content/excel-app-ia";

import { ExcelAppNav } from "@/components/excel-app-ia/ExcelAppNav";
import { ExcelAppHero } from "@/components/excel-app-ia/ExcelAppHero";
import { ExcelAppStory } from "@/components/excel-app-ia/ExcelAppStory";
import { ExcelAppAudience } from "@/components/excel-app-ia/ExcelAppAudience";
import { ExcelAppDifference } from "@/components/excel-app-ia/ExcelAppDifference";
import { ExcelAppMethod } from "@/components/excel-app-ia/ExcelAppMethod";
import { ExcelAppStack } from "@/components/excel-app-ia/ExcelAppStack";
import { ExcelAppSyllabus } from "@/components/excel-app-ia/ExcelAppSyllabus";
import { ExcelAppProjects } from "@/components/excel-app-ia/ExcelAppProjects";
import { ExcelAppRoadmap } from "@/components/excel-app-ia/ExcelAppRoadmap";
import { ExcelAppPricing } from "@/components/excel-app-ia/ExcelAppPricing";
import { ExcelAppInstructor } from "@/components/excel-app-ia/ExcelAppInstructor";
import { ExcelAppFaq } from "@/components/excel-app-ia/ExcelAppFaq";
import { ExcelAppLeadForm } from "@/components/excel-app-ia/ExcelAppLeadForm";
import { ExcelAppConversionBar } from "@/components/excel-app-ia/ExcelAppConversionBar";

/** Ficha schema.org del curso: ayuda a buscadores y agentes a entender fechas, modalidad y precio. */
const excelAppCourseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${EXCEL_APP_URL}#course`,
  name: COURSE.name,
  alternateName: `${COURSE.program} · ${COURSE.level}`,
  description: SEO.description,
  url: EXCEL_APP_URL,
  inLanguage: "es",
  educationalLevel: "Principiante",
  isAccessibleForFree: false,
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TIDEO Tech & Strategy",
    url: `${SITE_URL}/`,
  },
  offers: {
    "@type": "Offer",
    category: "Paid",
    price: String(COURSE.priceFounder),
    priceCurrency: COURSE.currency,
    availability: "https://schema.org/LimitedAvailability",
    url: `${EXCEL_APP_URL}#inscripcion`,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    name: COURSE.cohort,
    courseMode: "Online",
    startDate: COURSE.startDate,
    endDate: COURSE.endDate,
    courseWorkload: `PT${COURSE.hours}H`,
    maximumAttendeeCapacity: COURSE.maxSeats,
    instructor: { "@type": "Person", name: "Cristhian Balvin" },
    location: { "@type": "VirtualLocation", url: EXCEL_APP_URL },
    courseSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Saturday",
      startTime: "09:00",
      endTime: "13:00",
      scheduleTimezone: "America/Lima",
    },
  },
} as const;

export const Route = createFileRoute("/excel-app-ia/")({
  component: ExcelAppLanding,
  head: () => ({
    meta: [
      { title: SEO.title },
      { name: "description", content: SEO.description },
      { property: "og:title", content: SEO.ogTitle },
      { property: "og:description", content: SEO.ogDescription },
      { property: "og:url", content: EXCEL_APP_URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.ogTitle },
      { name: "twitter:description", content: SEO.ogDescription },
      { name: "theme-color", content: "#060B14" },
    ],
    // La landing vive en su subdominio; /excel-app-ia en www es la misma página.
    links: [{ rel: "canonical", href: EXCEL_APP_URL }],
    scripts: [jsonLdScript(excelAppCourseJsonLd)],
  }),
});

function ExcelAppLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-academy/30 selection:text-foreground">
      <ExcelAppNav />
      <main>
        <TracingBeam>
          <ExcelAppHero />
          <ExcelAppStory />
          <ExcelAppAudience />
          <ExcelAppDifference />
          <ExcelAppMethod />
          <ExcelAppStack />
          <ExcelAppSyllabus />
          <ExcelAppProjects />
          <ExcelAppRoadmap />
          <ExcelAppPricing />
          <ExcelAppInstructor />
          <ExcelAppFaq />
          <ExcelAppLeadForm />
        </TracingBeam>
      </main>
      <ExcelAppConversionBar />
      <Footer variant="subdomain" />
    </div>
  );
}
