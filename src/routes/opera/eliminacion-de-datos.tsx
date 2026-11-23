import { createFileRoute, Link } from "@tanstack/react-router";

import { Bloque, OperaCorreo, OperaLegalPage } from "@/components/opera/LegalPage";
import { OPERA_URL, operaSocialMeta } from "@/lib/site";

const URL_PAGINA = `${OPERA_URL}eliminacion-de-datos`;
const TITULO = "Eliminación de datos en OPERA | Tideo Tech & Strategy";
const DESCRIPCION =
  "Cómo desconectar tu WhatsApp de OPERA y cómo pedir que eliminemos los datos de tu empresa o tus datos personales.";

export const Route = createFileRoute("/opera/eliminacion-de-datos")({
  component: OperaEliminacionDeDatos,
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      ...operaSocialMeta({ title: TITULO, description: DESCRIPCION, url: URL_PAGINA }),
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
});

function OperaEliminacionDeDatos() {
  return (
    <OperaLegalPage
      etiqueta="Tus datos"
      titulo="Eliminación de datos"
      actualizado="23 de noviembre de 2026"
    >
      <p className="mt-10 text-muted-foreground">
        Esta página explica cómo dejar de compartir datos con OPERA (la aplicación «OPERA
        Conexiones» de Meta) y cómo pedir que eliminemos los datos que guardamos. Qué datos tratamos
        y por qué está en la{" "}
        <Link to="/opera/privacidad" className="text-primary hover:underline">
          Política de privacidad de OPERA
        </Link>
        .
      </p>

      <Bloque titulo="1. Desconectar tu WhatsApp desde OPERA">
        <p>Un administrador de la empresa puede hacerlo en cualquier momento:</p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Entra a OPERA y abre CRM → Bandeja de WhatsApp.</li>
          <li>Ve a la pestaña Conexión.</li>
          <li>En la tarjeta del número pulsa Desconectar y confirma con «Sí, desconectar».</li>
        </ol>
        <p>
          Desde ese momento OPERA deja de recibir los mensajes del número, retira su suscripción en
          Meta y borra el token de acceso y el PIN guardados. Tu WhatsApp Business del celular sigue
          funcionando con normalidad. Las conversaciones que ya estaban en OPERA no se borran con
          este paso: para eliminarlas, sigue el punto 3.
        </p>
      </Bloque>

      <Bloque titulo="2. Quitar el acceso desde Meta">
        <p>También puedes retirar el permiso desde tus cuentas de Meta:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            En el portafolio comercial de Meta (Business Suite o WhatsApp Manager), en la
            configuración de la cuenta de WhatsApp Business, quita a OPERA Conexiones o a TIDEO de
            los socios o aplicaciones conectadas. OPERA recibe el aviso de Meta y marca el número
            como desconectado.
          </li>
          <li>
            En Facebook, en Configuración y privacidad → Configuración → Aplicaciones y sitios web,
            elimina «OPERA Conexiones».
          </li>
        </ul>
      </Bloque>

      <Bloque titulo="3. Pedir la eliminación de los datos">
        <p>
          Escríbenos a <OperaCorreo asunto="Eliminación de datos OPERA" /> con el asunto
          «Eliminación de datos OPERA» e indica:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Si eres una empresa usuaria de OPERA:</strong> la
            razón social, el número de WhatsApp conectado y qué quieres eliminar (por ejemplo, todas
            las conversaciones, mensajes, historial y contactos recibidos de WhatsApp). La solicitud
            debe enviarla un administrador de la empresa.
          </li>
          <li>
            <strong className="text-foreground">
              Si eres una persona que escribió a una empresa que usa OPERA:
            </strong>{" "}
            tu número de teléfono y el nombre de la empresa a la que escribiste. Trasladaremos tu
            pedido a esa empresa, que es la responsable de tus datos, y la apoyaremos para
            atenderlo.
          </li>
        </ul>
        <p>
          Verificaremos que la solicitud venga del titular o de un representante autorizado,
          eliminaremos los datos dentro de los plazos de la Ley N.º 29733 y te confirmaremos por
          correo cuando esté hecho. Solo conservaremos lo que la ley nos obligue a guardar.
        </p>
      </Bloque>
    </OperaLegalPage>
  );
}
