import { createFileRoute, Link } from "@tanstack/react-router";

import { Bloque, OperaCorreo, OperaLegalPage } from "@/components/opera/LegalPage";
import { OPERA_URL, operaSocialMeta } from "@/lib/site";

const URL_PAGINA = `${OPERA_URL}privacidad`;
const TITULO = "Política de privacidad de OPERA | Tideo Tech & Strategy";
const DESCRIPCION =
  "Qué datos trata OPERA, el ERP de Tideo Tech & Strategy, cuando una empresa conecta su WhatsApp Business: para qué, por cuánto tiempo y cómo ejercer tus derechos.";

export const Route = createFileRoute("/opera/privacidad")({
  component: OperaPrivacidad,
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      ...operaSocialMeta({ title: TITULO, description: DESCRIPCION, url: URL_PAGINA }),
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
});

function OperaPrivacidad() {
  return (
    <OperaLegalPage
      etiqueta="Privacidad"
      titulo="Política de privacidad de OPERA"
      actualizado="23 de noviembre de 2026"
    >
      <Bloque titulo="Quién es responsable">
        <p>
          OPERA es el sistema de gestión (ERP) en la nube de TIDEO S.A.C. (Tideo Tech &amp;
          Strategy), con domicilio en Lima, Perú. Esta política explica cómo tratamos los datos
          personales dentro de OPERA, en especial los de su integración con WhatsApp a través de la
          plataforma de WhatsApp Business de Meta (aplicación «OPERA Conexiones»). Tratamos los
          datos conforme a la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su
          reglamento.
        </p>
        <p>
          Hay dos papeles distintos. Sobre los datos de las empresas que contratan OPERA y de sus
          usuarios, TIDEO es responsable del tratamiento. Sobre los datos de los clientes y
          contactos de cada empresa (por ejemplo, las personas que le escriben por WhatsApp), la
          empresa usuaria de OPERA es la responsable y TIDEO actúa como encargado: los trata solo
          por cuenta de esa empresa y para prestarle el servicio.
        </p>
        <p>
          Para cualquier consulta sobre privacidad escríbenos a{" "}
          <OperaCorreo asunto="Privacidad OPERA" />.
        </p>
      </Bloque>

      <Bloque titulo="Qué datos trata la integración de WhatsApp">
        <p>Cuando una empresa conecta su número de WhatsApp Business a OPERA, tratamos:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Datos de la cuenta conectada:</strong> el
            identificador de la cuenta de WhatsApp Business y del número, el número visible, el
            nombre verificado del negocio, el usuario de OPERA que hizo la conexión y las fechas de
            conexión y desconexión.
          </li>
          <li>
            <strong className="text-foreground">Credenciales de acceso:</strong> el token de negocio
            que Meta entrega al autorizar la conexión y, cuando el número se registra desde OPERA,
            el PIN de verificación en dos pasos. Se guardan cifrados en la bóveda de secretos
            (Vault) de nuestra base de datos, nunca se muestran en la aplicación y no se envían al
            navegador.
          </li>
          <li>
            <strong className="text-foreground">Datos de los contactos:</strong> número de teléfono
            y nombre de perfil de WhatsApp de quienes escriben al número conectado o reciben
            mensajes de él.
          </li>
          <li>
            <strong className="text-foreground">Mensajes:</strong> el contenido de los mensajes
            recibidos y enviados (texto, y de los archivos solo el tipo, el identificador que asigna
            Meta y su descripción), la fecha y hora, y el estado de entrega (enviado, entregado,
            leído o fallido). Si el número sigue en uso en la app WhatsApp Business del celular
            (coexistencia), también los mensajes que la empresa envía desde esa app.
          </li>
          <li>
            <strong className="text-foreground">
              Historial y contactos de la app (solo con coexistencia):
            </strong>{" "}
            si la empresa acepta compartirlos durante la conexión, Meta nos envía sus contactos de
            la app y hasta 180 días de historial de chats individuales (no grupos). Los guardamos
            para esa empresa.
          </li>
          <li>
            <strong className="text-foreground">Datos comerciales:</strong> con cada contacto nuevo
            OPERA crea o enlaza un lead de la empresa con su nombre de perfil, su teléfono y el
            origen «WhatsApp», además de la etapa, etiquetas y responsable que la empresa asigne a
            la conversación.
          </li>
        </ul>
        <p>
          Para conectar el número, Meta te pide iniciar sesión con Facebook. OPERA no guarda tu
          nombre, tu correo ni tu perfil de Facebook: solo recibe el código de autorización que se
          cambia por el token de negocio.
        </p>
      </Bloque>

      <Bloque titulo="Para qué los usamos">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Mostrar a cada empresa sus conversaciones de WhatsApp en la bandeja de OPERA y
            responderlas.
          </li>
          <li>
            Enviar los mensajes y las plantillas aprobadas por Meta que la empresa decide enviar.
          </li>
          <li>
            Enlazar cada conversación con el lead de la empresa y llevar su seguimiento comercial
            (embudo).
          </li>
          <li>Registrar el estado de entrega de los mensajes y mantener la conexión con Meta.</li>
        </ul>
        <p>
          No vendemos datos personales ni los usamos para publicidad. Los datos de una empresa solo
          los ven los usuarios de esa empresa que tienen permiso en OPERA.
        </p>
      </Bloque>

      <Bloque titulo="Base del tratamiento">
        <p>
          Tratamos estos datos para ejecutar el contrato de servicio con la empresa que usa OPERA y
          por su encargo. Cada empresa es responsable de contar con el consentimiento o la base
          legal que corresponda para comunicarse por WhatsApp con sus contactos y para registrar sus
          datos.
        </p>
      </Bloque>

      <Bloque titulo="Con quién los compartimos">
        <p>
          Para prestar el servicio usamos proveedores que tratan los datos solo por nuestro encargo:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Meta Platforms (plataforma de WhatsApp Business), por donde viajan los mensajes.</li>
          <li>
            Supabase, donde están la base de datos, la bóveda de secretos y las funciones del
            servidor.
          </li>
          <li>Vercel, que aloja la aplicación web de OPERA.</li>
        </ul>
        <p>
          Estos proveedores pueden almacenar información fuera del Perú, por lo que el uso de la
          integración implica una transferencia internacional de datos a esos servicios. No
          compartimos datos con otros terceros salvo que la ley lo exija.
        </p>
      </Bloque>

      <Bloque titulo="Cuánto tiempo los conservamos">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Las conversaciones, mensajes y leads se conservan mientras la empresa use OPERA, o hasta
            que la empresa (o el titular de los datos, por medio de ella) pida eliminarlos. Archivar
            una conversación no la elimina.
          </li>
          <li>
            Al desconectar el número, OPERA deja de recibir mensajes, retira su suscripción en Meta
            y borra de inmediato el token y el PIN de la bóveda. Las conversaciones ya recibidas
            siguen disponibles para la empresa hasta que pida su eliminación.
          </li>
          <li>
            Cuando termina la relación con la empresa, eliminamos sus datos a su pedido o al vencer
            el plazo que fije el contrato, salvo lo que la ley obligue a conservar.
          </li>
        </ul>
      </Bloque>

      <Bloque titulo="Cómo los protegemos">
        <p>
          Las comunicaciones viajan cifradas (HTTPS). Los tokens y PIN se guardan cifrados en la
          bóveda de secretos. La base de datos separa la información por empresa y cada usuario
          accede solo a lo que su rol permite.
        </p>
      </Bloque>

      <Bloque titulo="Tus derechos">
        <p>
          Puedes ejercer tus derechos de información, acceso, rectificación, cancelación (supresión)
          y oposición escribiendo a <OperaCorreo asunto="Datos personales OPERA" /> con el asunto
          «Datos personales OPERA». Si tus datos los registró una empresa que usa OPERA (por
          ejemplo, porque le escribiste por WhatsApp), también puedes dirigirte a esa empresa;
          nosotros la apoyaremos para atender tu pedido. Si consideras que no atendimos tu
          solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del
          Ministerio de Justicia y Derechos Humanos.
        </p>
        <p>
          Para pedir la eliminación de tus datos o desconectar tu número, sigue los pasos de{" "}
          <Link to="/opera/eliminacion-de-datos" className="text-primary hover:underline">
            Eliminación de datos
          </Link>
          .
        </p>
      </Bloque>

      <Bloque titulo="Cambios a esta política">
        <p>
          Si modificamos esta política publicaremos la nueva versión en esta página con su fecha de
          actualización.
        </p>
      </Bloque>
    </OperaLegalPage>
  );
}
