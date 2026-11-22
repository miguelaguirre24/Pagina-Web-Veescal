"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

const EMAIL = "veescal@hotmail.com";
const WHATSAPP_URL = "https://wa.me/573006163093";
const WHATSAPP_TEXTO = "+57 300 616 3093";

type Documento = { titulo: string; descripcion: string; archivo: string };

// Los PDFs deben estar en public/documentos/ con estos nombres exactos.
const DOCUMENTOS: Documento[] = [
  {
    titulo: "Misión y visión de VEESCAL",
    descripcion:
      "Presenta la misión de la veeduría: fortalecer la gestión en salud con vigilancia, evaluación e incidencia ciudadana. También su visión de ser líder en Caldas en transparencia y calidad del sistema de salud.",
    archivo: "Misiòn_y_Visiòn_de_Veescal.pdf",
  },
  {
    titulo: "Informe de capacitación a veedores de Anserma",
    descripcion:
      "Relata la capacitación a veedores de Anserma sobre cómo participar en comités de ética hospitalaria, el COPACO y las asociaciones de usuarios. Recoge las barreras que enfrentan en el hospital local.",
    archivo: "Informe_de_capacitación_a_veedores_de_Anserma.pdf",
  },
  {
    titulo: "Informe de vigilancia y control social en salud de Supía",
    descripcion:
      "Resume las actividades de los veedores en Supía: participación en el COPACO, acompañamiento a un caso urgente y problemas en el Hospital San Lorenzo. Solicita una visita de la Superintendencia de Salud.",
    archivo: "Informe_de_vigilancia_y_control_social_en_salud_de_Supía.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: prioridad en la atención",
    descripcion:
      "Registro fotográfico de los avisos de atención prioritaria para mujeres embarazadas, adultos mayores, neonatos y personas con discapacidad, según la Ley 1171.",
    archivo: "Veeduría_Clínica_Ospedale_prioridad_en_la_atención.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: derechos y deberes del paciente",
    descripcion:
      "Registro fotográfico de los avisos con los derechos y deberes de los pacientes que la clínica tiene publicados para sus usuarios.",
    archivo: "Veeduría_Clínica_Ospedale_derechos_y_deberes_del_paciente.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: registro fotográfico de urgencias",
    descripcion:
      "Fotografías del área de admisiones, la sala de espera y el cartel de clasificación de triage del servicio de urgencias, tomadas durante la visita.",
    archivo: "Veeduría_Clínica_Ospedale_registro_fotográfico_de_urgencias.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: sugerencias de mejora",
    descripcion:
      "Recomendaciones de la veeduría: permitir acompañante a adultos mayores en urgencias, instalar casilleros en quirófanos y preparar a los pacientes antes de una cirugía.",
    archivo: "Veeduría_Clínica_Ospedale_sugerencias_de_mejora.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: servicio de quirófanos",
    descripcion:
      "Preguntas y respuestas sobre el ingreso de pacientes a cirugía, el personal especializado y de enfermería, los camilleros y los protocolos para materiales quirúrgicos.",
    archivo: "Veeduría_Clínica_Ospedale_servicio_de_quirófanos.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: servicio de urgencias (parte 2)",
    descripcion:
      "Continúa el cuestionario de urgencias: consultorios, equipos, baños, funciones del guarda de seguridad y reclamos sobre el triage. Recomienda educar a los usuarios sobre la clasificación de triage.",
    archivo: "Veeduría_Clínica_Ospedale_servicio_de_urgencias__parte_2_.pdf",
  },
  {
    titulo: "Veeduría Clínica Ospedale: servicio de urgencias (parte 1)",
    descripcion:
      "Carta de resultados de la veeduría a urgencias y quirófanos de la Clínica Ospedale de Manizales. Incluye las primeras respuestas sobre personal, capacitación y tiempos de ingreso.",
    archivo: "Veeduría_Clínica_Ospedale_servicio_de_urgencias__parte_1_.pdf",
  },
  {
    titulo: "¿Quiénes somos? Historia de VEESCAL",
    descripcion:
      "Cuenta cómo nació la red REVESCAL en 2019 y cómo se constituyó VEESCAL en 2023, reconocida por la Resolución 533 de la Personería de Manizales. Incluye su junta directiva.",
    archivo: "Veescal - Quienes somos.pdf",
  },
];

// encodeURI protege tildes, espacios y caracteres especiales del nombre.
const rutaPdf = (archivo: string) => encodeURI(`/documentos/${archivo}`);

type ItemMenu = { label: string; href: string; current?: boolean; scroll?: boolean };

const MENU: ItemMenu[] = [
  { label: "Inicio", href: "/" },
  { label: "Documentos", href: "/documentos", current: true },
  { label: "Noticias y videos", href: "/videos" },
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

const IconFile = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </Icon>
);
const IconBook = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
/* Tarjeta de documento                                                */
/* ------------------------------------------------------------------ */

function TarjetaDocumento({ doc }: { doc: Documento }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0068B5]/10 text-[#0068B5]">
        <IconFile />
      </span>

      <div className="flex-1">
        <h2 className="text-lg font-bold leading-snug text-[#082F63]">{doc.titulo}</h2>
        <p className="mt-1 max-w-prose text-base leading-relaxed text-slate-700">
          <strong className="font-semibold text-[#082F63]">Resumen ciudadano:</strong> {doc.descripcion}
        </p>
      </div>

      <a
        href={rutaPdf(doc.archivo)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Leer documento: ${doc.titulo} (se abre en una pestaña nueva)`}
        className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#082F63] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0a3d82] ${FOCO}`}
      >
        <IconBook className="h-5 w-5" />
        Leer documento
      </a>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function DocumentosPage() {
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
        <section aria-labelledby="titulo-biblioteca" className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0068B5] sm:text-sm">
            DOCUMENTOS Y TRANSPARENCIA
          </p>
          <h1
            id="titulo-biblioteca"
            className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#082F63] sm:text-5xl lg:text-6xl"
          >
            Biblioteca Ciudadana
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Consulta los informes y documentos de VEESCAL. Cada uno tiene un resumen ciudadano para que sepas de qué
            trata antes de abrirlo.
          </p>
        </section>

        {/* 2. LISTA DE DOCUMENTOS */}
        <section aria-label="Lista de documentos" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <ul className="space-y-4">
            {DOCUMENTOS.map((doc) => (
              <li key={doc.archivo}>
                <TarjetaDocumento doc={doc} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 3. PIE DE PÁGINA */}
      <footer
        id="contacto"
        tabIndex={-1}
        aria-labelledby="titulo-contacto"
        className="scroll-mt-24 bg-[#082F63] text-white outline-none"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="titulo-contacto" className="text-2xl font-bold sm:text-3xl">
            VEESCAL - Veeduría Departamental en Salud de Caldas
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
            <p role="status" aria-live="polite" className="text-base font-medium">
              {copiado ? "Correo copiado correctamente" : ""}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}