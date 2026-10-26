#!/usr/bin/env node
/**
 * Avisa a los buscadores (Bing, Yandex, etc.) vía IndexNow de las URLs del sitemap.
 *
 * Uso (después de que el despliegue esté en producción):
 *   npm run indexnow              → envía todas las URLs de public/sitemap.xml
 *   npm run indexnow -- <url> ... → envía solo esas URLs
 *
 * La clave vive en public/<clave>.txt y se publica en la raíz de cada host
 * (www, opera y powerbi-ia sirven los mismos archivos estáticos).
 * Protocolo: https://www.indexnow.org/documentation
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const PUBLIC_DIR = new URL("../public/", import.meta.url);

/** Busca el archivo de clave: public/<32 hex>.txt cuyo contenido es la misma clave. */
export function findKey(dir = PUBLIC_DIR) {
  for (const name of readdirSync(dir)) {
    const m = name.match(/^([0-9a-f]{32})\.txt$/);
    if (m && readFileSync(new URL(name, dir), "utf8").trim() === m[1]) return m[1];
  }
  throw new Error("No se encontró public/<clave>.txt para IndexNow");
}

export function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/** IndexNow exige un envío por host: agrupa las URLs y arma cada cuerpo. */
export function buildPayloads(urls, key) {
  const byHost = new Map();
  for (const url of urls) {
    const { host } = new URL(url);
    if (!byHost.has(host)) byHost.set(host, []);
    byHost.get(host).push(url);
  }
  return [...byHost].map(([host, urlList]) => ({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }));
}

async function main() {
  const key = findKey();
  const args = process.argv.slice(2);
  const urls = args.length
    ? args
    : urlsFromSitemap(readFileSync(new URL("sitemap.xml", PUBLIC_DIR), "utf8"));
  for (const payload of buildPayloads(urls, key)) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(`${payload.host}: ${res.status} ${res.statusText} (${payload.urlList.length} URL)`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
