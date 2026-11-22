"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const EMAIL = "veescal@hotmail.com";
const WHATSAPP_URL = "https://wa.me/573006163093";
const WHATSAPP_TEXTO = "+57 300 616 3093";

type Video = {
  titulo: string;
  duracion: string;
  archivo: string; // nombre del .mp4 dentro de public/videos/
  resumen: string;
  transcripcion: string;
};

// TODO: pega en `titulo`, `resumen` y `transcripcion` los textos EXACTOS de tus capturas.
// Los títulos actuales salen del nombre del archivo; el resumen y la transcripción están
// vacíos a propósito: mientras estén vacíos, la tarjeta no muestra ese bloque.
// En `transcripcion` puedes separar párrafos con una línea en blanco.
const VIDEOS: Video[] = [
  {
    titulo:
      "Veeduría en Salud de Chinchiná exige a Nueva EPS atención urgente para pacientes con procedimientos vitales represados",
    duracion: "1:37",
    archivo:
      "Veeduría_en_Salud_de_Chinchiná_exige_a_Nueva_EPS_atención_urgente_para_pacientes_con_procedimientos_vitales_represados.mp4",
    resumen: "Dos pacientes de la Nueva EPS en Chinchiná llevan años esperando procedimientos urgentes, un cambio de marcapasos y una cirugía de próstata, a pesar de tener tutelas. Los veedores en salud buscan mediar con la EPS para que se cumplan las órdenes judiciales.",
    transcripcion: `Dos pacientes afiliados a la Nueva EPS en Chinchiná denuncian que, pese a contar con tutelas y derechos de petición, continúan a la espera de procedimientos médicos que consideran urgentes.

"Hasta el momento no hemos tenido ni el acompañamiento de la Supersalud. Hemos interpuesto PQRS, tutelas, incidentes de desacato y hasta ahora nadie nos ha puesto atención en esto. No se justifica que estas personas pasen tres, cuatro años esperando que les otorguen un beneficio. Para eso fueron creadas las EPS, y hasta este momento no les han prestado la atención necesaria."

Uno de los casos corresponde a un paciente que requiere la implementación de un marcapasos y cuya familia asegura que los médicos le han advertido que su expectativa de vida podría ser de apenas seis meses si no recibe el dispositivo.

"Porque tengo un cardiodesfibrilador que ya se le termina la batería, entonces dependo cien por ciento de él, y hasta el momento no me lo han cambiado."

El segundo caso es un paciente que necesita con urgencia una cirugía de próstata y que, según su familia, tampoco ha recibido la atención requerida.

"Ya llevo más de tres años para operarme. Me han mandado [inaudible], me mandaron para el Hospital de Caldas y la última me mandaron para Santa Sofía. Y hasta la hora, nada."

Ante estas situaciones, veedores de salud de Chinchiná, Caldas, buscan mediar con la Nueva EPS para encontrar una solución, garantizar que se cumplan las órdenes judiciales y que se brinde la atención necesaria a estos pacientes.`,

  },
  {
    titulo:
      "Reconocimiento a la labor de VEESCAL y la importancia de la participación ciudadana en la salud de Villamaría",
    duracion: "2:01",
    archivo:
      "Reconocimiento_a_la_labor_de_VEESCAL_y_la_importancia_de_la_participación_ciudadana_en_la_salud_de_Villamaría.mp4",
    resumen: "Un reconocimiento a VEESCAL por su trabajo por una salud más participativa y transparente en Caldas. Una veedora de Villamaría cuenta cómo la veeduría ayuda a que los usuarios reciban a tiempo sus medicamentos y su atención, y anima a la comunidad a participar en el control social.",
    transcripcion:`La Veeduría Departamental VEESCAL ha sido un pilar en la construcción de una salud más participativa, transparente y cercana a la comunidad. Hoy reconocemos su compromiso, dedicación y su valiosa gestión al servicio de Caldas.

"Para mí es un reto grande porque tenemos unas falencias grandes en nuestro sistema de salud aquí a nivel de municipio, entonces es un reto para nosotros como líderes hacer parte de esta veeduría."

"El mayor aporte ha sido la lucha que se tiene en este momento con las EPS, sobre todo con una EPS que ha tenido muchos problemas, y se ha llegado al acercamiento con ellos, a la gerencia, para lograr cada día más que los usuarios tengan acceso a sus medicamentos y a su atención médica."

"Una de las cosas que me motiva a seguir trabajando con VEESCAL es poder ayudarle a la comunidad de forma asertiva para que sus tratamientos y sus medicamentos sean entregados de forma oportuna y no sigan teniendo más barreras a la salud como se están presentando el día de hoy."

"De manera personal, yo sí quisiera que los afiliados en el municipio y a nivel país, no solamente en el municipio de Villamaría, participáramos más, porque el control social es un factor que va a ayudar para que los servicios de salud y todos los entes a nivel nacional y gubernamental mejoren."

"En lo personal me ha ayudado a tener más don de persona, más compromiso con mi comunidad, a ser más solidaria con las personas para poderles ayudar en diferentes cuestiones de salud."

Gracias, VEESCAL, por ser la voz vigilante y comprometida que impulsa la salud de nuestro departamento. Este reconocimiento es un reflejo de su esfuerzo, entrega y pasión por el bienestar de todos. Sigamos construyendo juntos una salud más transparente y participativa.`,
  },
];

// encodeURI protege tildes y caracteres especiales del nombre del archivo.
const rutaVideo = (archivo: string) => encodeURI(`/videos/${archivo}`);

type ItemMenu = { label: string; href: string; current?: boolean; scroll?: boolean };

const MENU: ItemMenu[] = [
  { label: "Inicio", href: "/" },
  { label: "Documentos", href: "/documentos" },
  { label: "Noticias y videos", href: "/videos", current: true },
  { label: "Opinión", href: "/opinion" },
  { label: "Ayuda para participar", href: "#contacto", scroll: true },
];

const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068B5]";
const FOCO_CLARO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* ------------------------------------------------------------------ */
/* Utilidades e iconos                                                 */
/* ------------------------------------------------------------------ */

function irAContacto(e: MouseEvent<HTMLElement>) {
  e.preventDefault();
  const destino = document.getElementById("contacto");
  if (!destino) return;
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  destino.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
  destino.focus({ preventScroll: true });
  window.history.replaceState(null, "", "#contacto");
}

function Icon({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

const IconClock = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);
const IconChevron = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const IconPhone = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);
const IconMail = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </Icon>
);
const IconCheck = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
const IconCopy = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);
const IconMenu = ({ open }: { open: boolean }) => (
  <Icon>{open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</Icon>
);

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function NavItem({
  item,
  className,
  onNavigate,
}: {
  item: ItemMenu;
  className: string;
  onNavigate?: () => void;
}) {
  if (item.scroll) {
    return (
      <a
        href={item.href}
        onClick={(e) => {
          onNavigate?.();
          irAContacto(e);
        }}
        className={className}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={item.current ? "page" : undefined}
      className={`${className} ${item.current ? "underline decoration-[#0068B5] decoration-2 underline-offset-8" : ""}`}
    >
      {item.label}
    </Link>
  );
}

function Header() {
  const [abierto, setAbierto] = useState(false);
  const itemClase = `block rounded-md px-3 py-2 text-sm font-semibold text-[#082F63] hover:bg-slate-100 hover:text-[#0068B5] ${FOCO}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" aria-label="VEESCAL, ir al inicio" className={`rounded-md ${FOCO}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-veescal.png" alt="Logo VEESCAL" className="h-12 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MENU.map((item) => (
              <li key={item.label}>
                <NavItem item={item} className={itemClase} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-[#082F63] lg:hidden ${FOCO}`}
        >
          <IconMenu open={abierto} />
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {MENU.map((item) => (
              <li key={item.label}>
                <NavItem item={item} className={`${itemClase} py-3 text-base`} onNavigate={() => setAbierto(false)} />
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div aria-hidden="true" className="flex h-1">
        <span className="flex-1 bg-[#0068B5]" />
        <span className="flex-1 bg-[#FFD400]" />
        <span className="flex-1 bg-[#00A650]" />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Tarjeta de video                                                    */
/* ------------------------------------------------------------------ */

function TarjetaVideo({ video }: { video: Video }) {
  const [abierta, setAbierta] = useState(false);
  const id = useId();
  const idTranscripcion = `transcripcion-${id}`;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <video
        controls
        preload="metadata"
        aria-label={video.titulo}
        className="aspect-video w-full bg-black"
      >
        <source src={rutaVideo(video.archivo)} type="video/mp4" />
        Tu navegador no puede reproducir este video. Puedes leer su transcripción más abajo.
      </video>

      <div className="p-5 sm:p-6">
        <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0068B5]">
          <IconClock className="h-4 w-4" />
          <span>
            <span className="sr-only">Duración: </span>
            {video.duracion}
          </span>
        </p>

        <h2 className="mt-2 text-xl font-bold leading-snug text-[#082F63]">{video.titulo}</h2>

        {video.resumen && (
          <p className="mt-3 max-w-prose text-base leading-relaxed text-slate-700">{video.resumen}</p>
        )}

        {video.transcripcion && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setAbierta((v) => !v)}
              aria-expanded={abierta}
              aria-controls={idTranscripcion}
              className={`inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-[#0068B5] bg-white px-5 py-3 text-base font-semibold text-[#0068B5] transition-colors hover:bg-[#0068B5]/5 ${FOCO}`}
            >
              Ver transcripción
              <IconChevron
                className={`h-5 w-5 transition-transform motion-reduce:transition-none ${abierta ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={idTranscripcion}
              role="region"
              aria-label={`Transcripción: ${video.titulo}`}
              tabIndex={0}
              hidden={!abierta}
              className={`mt-4 max-h-80 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed whitespace-pre-line text-slate-800 ${FOCO}`}
            >
              {video.transcripcion}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function VideosPage() {
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  async function copiarCorreo() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiado(true);
      if (temporizador.current) clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiado(false), 3000);
    } catch {
      window.prompt("Copia el correo con Ctrl+C (o Cmd+C):", EMAIL);
    }
  }

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[#082F63] focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido" className="bg-white text-slate-800">
        {/* 1. HERO */}
        <section aria-labelledby="titulo-videos" className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
          <h1
            id="titulo-videos"
            className="text-4xl font-extrabold leading-tight tracking-tight text-[#082F63] sm:text-5xl lg:text-6xl"
          >
            Noticias y Videos
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Mira lo que hace VEESCAL en los municipios de Caldas. Cada video tiene un resumen y su transcripción
            completa.
          </p>
        </section>

        {/* 2. VIDEOS */}
        <section aria-label="Videos" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <ul className="grid gap-8 lg:grid-cols-2">
            {VIDEOS.map((video) => (
              <li key={video.archivo}>
                <TarjetaVideo video={video} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 3. BLOQUE FINAL DE CONTACTO */}
      <footer
        id="contacto"
        tabIndex={-1}
        aria-labelledby="titulo-contacto"
        className="scroll-mt-24 bg-[#082F63] text-white outline-none"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="titulo-contacto" className="text-2xl font-bold sm:text-3xl">
            ¿Tienes una noticia para compartir?
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">
            Si en tu municipio hay una situación de salud que la comunidad debe conocer, escríbenos.
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-xl border border-white/30 p-5 hover:bg-white/10 ${FOCO_CLARO}`}
              >
                <IconPhone className="h-7 w-7 shrink-0" />
                <span>
                  <span className="block text-sm text-white/90">WhatsApp</span>
                  <span className="block text-lg font-semibold">{WHATSAPP_TEXTO}</span>
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className={`flex items-center gap-4 rounded-xl border border-white/30 p-5 hover:bg-white/10 ${FOCO_CLARO}`}
              >
                <IconMail className="h-7 w-7 shrink-0" />
                <span>
                  <span className="block text-sm text-white/90">Correo</span>
                  <span className="block break-all text-lg font-semibold">{EMAIL}</span>
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={copiarCorreo}
              className={`inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-semibold text-[#082F63] transition-colors hover:bg-slate-100 ${FOCO_CLARO}`}
            >
              {copiado ? <IconCheck className="h-5 w-5" /> : <IconCopy className="h-5 w-5" />}
              {copiado ? "¡Correo copiado!" : "Copiar correo"}
            </button>
            <p role="status" aria-live="polite" className="text-base font-medium">
              {copiado ? "Correo copiado correctamente" : ""}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}