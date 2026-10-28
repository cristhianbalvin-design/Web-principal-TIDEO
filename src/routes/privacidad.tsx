import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ORG, canonicalLink, canonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/privacidad")({
  component: Privacidad,
  head: () => ({
    meta: [
      { title: "Política de privacidad | TIDEO Tech & Strategy" },
      {
        name: "description",
        content:
          "Cómo TIDEO Tech & Strategy recopila, usa y protege los datos personales que nos compartes en este sitio.",
      },
      { property: "og:url", content: canonicalUrl("/privacidad") },
    ],
    links: [canonicalLink(canonicalUrl("/privacidad"))],
  }),
});

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{titulo}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function Privacidad() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-20">
        <article className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-6 h-px bg-primary/60" />
            Privacidad
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gradient">
            Política de privacidad
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Última actualización: 28 de octubre de 2026
          </p>

          <Bloque titulo="Quién es responsable de tus datos">
            <p>
              {ORG.name} (en adelante, "TIDEO"), con domicilio en Lima, Perú, es responsable del
              tratamiento de los datos personales que nos entregas a través de www.tideo.tech y de
              sus landings opera.tideo.tech y powerbi-ia.tideo.tech. Tratamos tus datos conforme a
              la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.
            </p>
            <p>
              Para cualquier consulta sobre esta política escríbenos a{" "}
              <a className="text-primary hover:underline" href={`mailto:${ORG.email}`}>
                {ORG.email}
              </a>
              .
            </p>
          </Bloque>

          <Bloque titulo="Qué datos recopilamos">
            <p>Solo recopilamos los datos que tú decides enviarnos en nuestros formularios:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Formulario de contacto:</strong> nombre,
                empresa, cargo, correo, WhatsApp, rubro, el proceso que quieres mejorar, las
                herramientas que usas y la urgencia.
              </li>
              <li>
                <strong className="text-foreground">Diagnóstico digital:</strong> tus respuestas al
                cuestionario de madurez digital y tus datos de contacto.
              </li>
              <li>
                <strong className="text-foreground">
                  Formularios de OPERA y de TIDEO Academy:
                </strong>{" "}
                datos de contacto y la información sobre tu operación, presupuesto, plazos o interés
                en el programa que indiques.
              </li>
            </ul>
            <p>
              Este sitio usa el Píxel de Meta (Facebook e Instagram): un código y una cookie que le
              informan a Meta qué páginas visitas y cuándo envías un formulario, para medir y
              mejorar nuestros anuncios. No usamos otras cookies de analítica ni de publicidad.
              Usamos almacenamiento temporal del navegador (sessionStorage) solo para no pedirte dos
              veces los mismos datos entre el diagnóstico y el formulario de contacto; se borra al
              cerrar la pestaña.
            </p>
          </Bloque>

          <Bloque titulo="Para qué los usamos">
            <ul className="list-disc space-y-2 pl-6">
              <li>Responder tu consulta y contactarte sobre el proceso que nos contaste.</li>
              <li>Generar y enviarte por correo el resultado de tu diagnóstico digital.</li>
              <li>Agendar reuniones cuando lo solicitas.</li>
              <li>Registrar tu solicitud en nuestro sistema de seguimiento comercial.</li>
            </ul>
            <p>
              No vendemos tus datos. La información que recoge el Píxel de Meta la trata Meta según
              su propia política de datos; puedes limitar los anuncios personalizados desde la
              configuración de tus cuentas de Facebook e Instagram.
            </p>
          </Bloque>

          <Bloque titulo="Con quién los compartimos">
            <p>
              Para operar el sitio usamos proveedores que tratan los datos solo por encargo nuestro:
              Vercel (alojamiento del sitio), Supabase (funciones y base de datos), Resend (envío de
              correos), Anthropic (generación del texto del diagnóstico con IA), Make
              (automatización del registro de solicitudes) y Calendly (agenda de reuniones). Algunos
              de estos proveedores almacenan información fuera del Perú, por lo que el envío de un
              formulario implica una transferencia internacional de datos a esos servicios.
            </p>
          </Bloque>

          <Bloque titulo="Cuánto tiempo los conservamos">
            <p>
              Conservamos tus datos mientras sean necesarios para atender tu solicitud y mantener la
              relación comercial, o hasta que nos pidas eliminarlos.
            </p>
          </Bloque>

          <Bloque titulo="Tus derechos">
            <p>
              Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación
              y oposición escribiendo a{" "}
              <a className="text-primary hover:underline" href={`mailto:${ORG.email}`}>
                {ORG.email}
              </a>{" "}
              con el asunto "Datos personales". Si consideras que no atendimos tu solicitud, puedes
              acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de
              Justicia y Derechos Humanos.
            </p>
          </Bloque>

          <Bloque titulo="Cambios a esta política">
            <p>
              Si modificamos esta política publicaremos la nueva versión en esta página con su fecha
              de actualización.
            </p>
          </Bloque>
        </article>
      </main>
      <Footer />
    </div>
  );
}
