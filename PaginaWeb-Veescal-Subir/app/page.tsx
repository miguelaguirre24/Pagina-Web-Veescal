"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Constantes                                                          */
/* ------------------------------------------------------------------ */

const EMAIL = "veescal@hotmail.com";
const WHATSAPP_URL = "https://wa.me/573006163093";
const WHATSAPP_TEXTO = "+57 300 616 3093";
// El archivo tiene espacios: encodeURI evita rutas rotas.
// Debe existir en: public/documentos/Veescal - Quienes somos.pdf
const PDF_URL = encodeURI("/documentos/Veescal - Quienes somos.pdf");

// Colores institucionales: Azul Oscuro #082F63 · Azul de Acción #0068B5
const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068B5]";
const FOCO_CLARO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const MENU = [
  { label: "Inicio", href: "/", current: true },
  { label: "Documentos", href: "/documentos" },
  { label: "Noticias y videos", href: "/videos" },
  { label: "Opinión", href: "/opinion" },
  { label: "Ayuda para participar", href: "#contacto", scroll: true },
] as const;

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
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

/* ------------------------------------------------------------------ */
/* Iconos (SVG en línea, decorativos)                                  */
/* ------------------------------------------------------------------ */

function Icon({
  children,
  className = "h-6 w-6",
}: {
  children: ReactNode;
  className?: string;
}) {
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

const IconUsers = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);
const IconFile = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </Icon>
);
const IconPlay = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m10 8 6 4-6 4V8z" />
  </Icon>
);
const IconMessage = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);
const IconArrow = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
);
const IconEye = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const IconMegaphone = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Icon>
);
const IconClipboard = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </Icon>
);
const IconDownload = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5M12 15V3" />
  </Icon>
);
const IconPhone = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);
const IconMail = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </Icon>
);
const IconCheck = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
const IconCopy = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);
const IconMenu = ({ open }: { open: boolean }) => (
  <Icon>{open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</Icon>
);

/* ------------------------------------------------------------------ */
/* Componentes                                                         */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    // Cambia por next/image si prefieres optimización automática.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-veescal.png" alt="Logo VEESCAL" className="h-12 w-auto" />
  );
}

function Header() {
  const [abierto, setAbierto] = useState(false);

  const itemClase = `block rounded-md px-3 py-2 text-sm font-semibold text-[#082F63] hover:bg-slate-100 hover:text-[#0068B5] ${FOCO}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" aria-label="VEESCAL, ir al inicio" className={`rounded-md ${FOCO}`}>
          <Logo />
        </Link>

        {/* Menú escritorio */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MENU.map((item) => (
              <li key={item.label}>
                {"scroll" in item ? (
                  <a href={item.href} onClick={irAContacto} className={itemClase}>
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={"current" in item ? "page" : undefined}
                    className={`${itemClase} ${"current" in item ? "underline decoration-[#0068B5] decoration-2 underline-offset-8" : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón menú móvil */}
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

      {/* Menú móvil */}
      {abierto && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {MENU.map((item) => (
              <li key={item.label}>
                {"scroll" in item ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      setAbierto(false);
                      irAContacto(e);
                    }}
                    className={`${itemClase} py-3 text-base`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setAbierto(false)}
                    aria-current={"current" in item ? "page" : undefined}
                    className={`${itemClase} py-3 text-base`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Franja con los tres colores del logo */}
      <div aria-hidden="true" className="flex h-1">
        <span className="flex-1 bg-[#0068B5]" />
        <span className="flex-1 bg-[#FFD400]" />
        <span className="flex-1 bg-[#00A650]" />
      </div>
    </header>
  );
}

function TarjetaAccion({
  titulo,
  href,
  icono,
  scroll = false,
}: {
  titulo: string;
  href: string;
  icono: ReactNode;
  scroll?: boolean;
}) {
  const clases = `group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#0068B5] ${FOCO}`;
  const contenido = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0068B5]/10 text-[#0068B5]">
        {icono}
      </span>
      <span className="flex-1 text-base font-semibold text-[#082F63]">{titulo}</span>
      <IconArrow className="h-5 w-5 shrink-0 text-[#0068B5] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
    </>
  );

  return scroll ? (
    <a href={href} onClick={irAContacto} className={clases}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}

function BloqueQueHacemos({
  titulo,
  texto,
  icono,
  color,
}: {
  titulo: string;
  texto: string;
  icono: ReactNode;
  color: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" style={{ borderTop: `4px solid ${color}` }}>
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-[#082F63]">
        {icono}
      </span>
      <h3 className="text-xl font-bold text-[#082F63]">{titulo}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{texto}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
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
      // Respaldo si el navegador bloquea el portapapeles
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
        {/* 2. HERO */}
        <section aria-labelledby="titulo-hero" className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0068B5] sm:text-sm">
            CIUDADANÍA QUE PARTICIPA · SALUD EN CALDAS
          </p>
          <h1
            id="titulo-hero"
            className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#082F63] sm:text-5xl lg:text-6xl"
          >
            La ciudadanía también vigila la salud en Caldas
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            VEESCAL promueve la participación y la vigilancia ciudadana sobre la gestión en salud. No presta servicios
            médicos ni reemplaza a las EPS o a los prestadores de salud.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/opinion"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-[#082F63] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0a3d82] ${FOCO}`}
            >
              Reportar una situación
            </Link>
            <a
              href="#contacto"
              onClick={irAContacto}
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#0068B5] bg-white px-6 py-3 text-base font-semibold text-[#0068B5] transition-colors hover:bg-[#0068B5]/5 ${FOCO}`}
            >
              Contáctanos
            </a>
          </div>

          <div role="note" className="mt-8 max-w-2xl rounded-lg border-l-4 border-[#082F63] bg-gray-100 p-4 text-base leading-relaxed text-slate-800">
            <strong className="font-bold text-[#082F63]">Importante:</strong> este no es un canal de urgencias y VEESCAL
            no presta servicios médicos. Para una urgencia, comunícate con los servicios de emergencia.
          </div>
        </section>

        {/* 3. TARJETAS */}
        <section aria-labelledby="titulo-accesos" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 id="titulo-accesos" className="sr-only">
            Accesos rápidos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TarjetaAccion titulo="Información para participar" href="#contacto" scroll icono={<IconUsers />} />
            <TarjetaAccion titulo="Documentos y transparencia" href="/documentos" icono={<IconFile />} />
            <TarjetaAccion titulo="Noticias y videos" href="/videos" icono={<IconPlay />} />
            <TarjetaAccion titulo="Haz tu opinión" href="/opinion" icono={<IconMessage />} />
          </div>
        </section>

        {/* 4. PROPÓSITO Y MISIÓN */}
        <section aria-labelledby="titulo-proposito" className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 id="titulo-proposito" className="text-3xl font-bold text-[#082F63] sm:text-4xl">
                Nuestro Propósito
              </h2>
              <p className="mt-2 text-xl font-semibold text-[#0068B5]">VEESCAL</p>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-slate-700">
                La Veeduría Departamental en Salud de Caldas (VEESCAL) es un espacio de control social ciudadano. Su
                ámbito es la salud en el departamento de Caldas, Colombia.
              </p>
              <div className="mt-6 max-w-prose rounded-lg border border-slate-200 bg-white p-4 text-base leading-relaxed text-slate-700">
                <strong className="font-bold text-[#082F63]">Marco de participación.</strong> Las veedurías ciudadanas
                se rigen por la Ley 850 de 2003.
              </div>
            </div>

            <div className="rounded-2xl bg-[#082F63] p-8 text-white sm:p-10">
              <h3 className="text-2xl font-bold">Nuestra misión</h3>
              <p className="mt-4 text-lg leading-relaxed text-white">
                Fortalecer la gestión y la prestación de servicios de salud, velando por los intereses de la comunidad,
                promoviendo la participación ciudadana mediante la vigilancia, evaluación e incidencia, en pro de
                mejorar la salud y el bienestar de la población caldense.
              </p>
            </div>
          </div>
        </section>

        {/* 5. QUÉ HACEMOS */}
        <section aria-labelledby="titulo-hacemos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="titulo-hacemos" className="text-3xl font-bold text-[#082F63] sm:text-4xl">
            Qué hacemos
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <BloqueQueHacemos
              titulo="Vigilancia ciudadana"
              texto="Observamos la gestión en salud desde la mirada de la comunidad"
              icono={<IconEye />}
              color="#0068B5"
            />
            <BloqueQueHacemos
              titulo="Participación"
              texto="Promovemos espacios para que la ciudadanía haga oír su voz"
              icono={<IconMegaphone />}
              color="#FFD400"
            />
            <BloqueQueHacemos
              titulo="Seguimiento"
              texto="Damos seguimiento ciudadano a los asuntos de interés en salud"
              icono={<IconClipboard />}
              color="#00A650"
            />
          </div>
          <p role="note" className="mt-8 max-w-3xl rounded-lg border-l-4 border-[#0068B5] bg-gray-100 p-4 text-base leading-relaxed text-slate-800">
            El seguimiento ciudadano no garantiza la solución de un caso médico ni sustituye las decisiones de las
            autoridades competentes.
          </p>
        </section>

        {/* 6. ¿QUIÉNES SOMOS? */}
        <section aria-labelledby="titulo-quienes" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="titulo-quienes" className="text-3xl font-bold text-[#082F63] sm:text-4xl">
              ¿Quiénes somos?
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-slate-700">
              El 29 de febrero de 2019 se creó la Red Departamental de Veedurías en Salud de Caldas (REVESCAL), con el
              propósito de fortalecer la vigilancia ciudadana en el sector salud del departamento. A finales de 2023,
              después de la experiencia de REVESCAL, se constituyó la Veeduría Departamental en Salud de Caldas
              (VEESCAL). Su reconocimiento quedó formalizado mediante la Resolución No. 533 del 27 de diciembre de 2023,
              expedida por la Personería de Manizales.
            </p>
            <a
              href={PDF_URL}
              download
              className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0068B5] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005a9c] ${FOCO}`}
            >
              <IconDownload className="h-5 w-5" />
              Descargar documento de Quiénes Somos (PDF)
            </a>
          </div>
        </section>
      </main>

      {/* 7. PIE DE PÁGINA / CONTACTO */}
      <footer
        id="contacto"
        tabIndex={-1}
        aria-labelledby="titulo-contacto"
        className="scroll-mt-24 bg-[#082F63] text-white outline-none"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="titulo-contacto" className="text-3xl font-bold">
            ¿Necesitas orientación?
          </h2>

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
            {/* Región en vivo: siempre presente para que los lectores de pantalla anuncien el cambio */}
            <p role="status" aria-live="polite" className="text-base font-medium">
              {copiado ? "Correo copiado correctamente" : ""}
            </p>
          </div>

          <p className="mt-12 border-t border-white/20 pt-6 text-sm text-white/90">
            Veeduría Departamental en Salud de Caldas – VEESCAL. Este no es un canal de urgencias.
          </p>
        </div>
      </footer>
    </>
  );
}