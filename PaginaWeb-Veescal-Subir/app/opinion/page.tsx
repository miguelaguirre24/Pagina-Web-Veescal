"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Constantes                                                          */
/* ------------------------------------------------------------------ */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzp1fEYPb3FprTpWT1l_T2nVXmOXR2LUF7vxxQwL7TpN2ML7uDM9on5JGFyXyzMTuc/exec";
const EMAIL = "veescal@hotmail.com";
const WHATSAPP_URL = "https://wa.me/573006163093";
const WHATSAPP_TEXTO = "+57 300 616 3093";

type Valores = {
  nombre: string;
  correo: string;
  telefono: string;
  problematica: string;
  mensaje: string;
};

const VALORES_INICIALES: Valores = {
  nombre: "",
  correo: "",
  telefono: "",
  problematica: "",
  mensaje: "",
};

type Estado = "reposo" | "enviando" | "exito" | "error-envio";

type ItemMenu = { label: string; href: string; current?: boolean; scroll?: boolean };

const MENU: ItemMenu[] = [
  { label: "Inicio", href: "/" },
  { label: "Documentos", href: "/documentos" },
  { label: "Noticias y videos", href: "/videos" },
  { label: "Opinión", href: "/opinion", current: true },
  { label: "Ayuda para participar", href: "#contacto", scroll: true },
];

const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068B5]";
const FOCO_CLARO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[0-9+()\s-]{7,20}$/;

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

const IconSend = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
    <path d="M22 2 11 13" />
  </Icon>
);
const IconInfo = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
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
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function OpinionPage() {
  // Formulario
  const [valores, setValores] = useState<Valores>(VALORES_INICIALES);
  const [acepta, setAcepta] = useState(false);
  const [intento, setIntento] = useState(false); // ya se intentó enviar al menos una vez
  const [estado, setEstado] = useState<Estado>("reposo");

  // Copiar correo
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  function cambiar(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
  }

  // Validación
  const nombre = valores.nombre.trim();
  const correo = valores.correo.trim();
  const telefono = valores.telefono.trim();
  const mensaje = valores.mensaje.trim();

  const nombreOk = nombre.length > 0;
  const correoOk = correo === "" || REGEX_CORREO.test(correo);
  const telefonoOk = telefono === "" || REGEX_TELEFONO.test(telefono);
  const contactoOk = (correo !== "" || telefono !== "") && correoOk && telefonoOk;
  const problematicaOk = valores.problematica !== "";
  const mensajeOk = mensaje.length > 0;
  const formularioOk = nombreOk && contactoOk && problematicaOk && mensajeOk && acepta;

  const mostrarErrores = intento && !formularioOk;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    setIntento(true);
    setEstado("reposo");
    if (!formularioOk) return;

    setEstado("enviando");
    try {
      const respuesta = await fetch(SCRIPT_URL, {
        method: "POST",
        // text/plain evita la petición preflight (CORS) con Google Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          problematica: valores.problematica,
          mensaje,
        }),
      });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

      // Si el script devuelve JSON con un error explícito, se trata como fallo.
      const datos = await respuesta.json().catch(() => null);
      if (datos && (datos.success === false || datos.result === "error" || datos.status === "error")) {
        throw new Error("El script rechazó el envío");
      }

      setEstado("exito");
      setValores(VALORES_INICIALES);
      setAcepta(false);
      setIntento(false);
    } catch {
      setEstado("error-envio");
    }
  }

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

  const campo = (invalido: boolean) =>
    `mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-base text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-[#0068B5] ${
      invalido ? "border-red-700 ring-1 ring-red-700" : "border-slate-500"
    }`;
  const etiqueta = "block text-base font-semibold text-[#082F63]";

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
        <section aria-labelledby="titulo-opinion" className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0068B5] sm:text-sm">
            PARTICIPACIÓN CIUDADANA
          </p>
          <h1
            id="titulo-opinion"
            className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#082F63] sm:text-5xl lg:text-6xl"
          >
            Opinión
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Cuéntanos sus quejas, opiniones, sugerencias o reportes sobre los servicios de salud. Su mensaje ayuda a
            VEESCAL a orientar la vigilancia ciudadana.
          </p>
        </section>

        {/* 2. CONTENEDOR PRINCIPAL */}
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          {/* Columna izquierda: formulario */}
          <section
            aria-labelledby="titulo-formulario"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <h2 id="titulo-formulario" className="text-2xl font-bold text-[#082F63]">
              Formulario de opinión
            </h2>
            <p className="mt-1 text-base text-slate-700">Los campos marcados con * son obligatorios.</p>

            <form onSubmit={enviar} noValidate className="mt-6 space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className={etiqueta}>
                  Nombre completo <span aria-hidden="true">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={mostrarErrores && !nombreOk}
                  value={valores.nombre}
                  onChange={cambiar}
                  className={campo(mostrarErrores && !nombreOk)}
                />
              </div>

              {/* Medio de contacto */}
              <fieldset
                aria-describedby="ayuda-contacto"
                className={`rounded-lg border p-4 ${mostrarErrores && !contactoOk ? "border-red-700" : "border-slate-500"}`}
              >
                <legend className="px-1 text-base font-semibold text-[#082F63]">
                  Medio de contacto <span aria-hidden="true">*</span>
                </legend>
                <p id="ayuda-contacto" className="text-sm text-slate-700">
                  Indique al menos uno de los dos
                </p>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="correo" className="block text-base font-medium text-slate-900">
                      Correo electrónico
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      autoComplete="email"
                      aria-invalid={mostrarErrores && !contactoOk}
                      value={valores.correo}
                      onChange={cambiar}
                      className={campo(mostrarErrores && !contactoOk)}
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-base font-medium text-slate-900">
                      Número de contacto
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={mostrarErrores && !contactoOk}
                      value={valores.telefono}
                      onChange={cambiar}
                      className={campo(mostrarErrores && !contactoOk)}
                    />
                  </div>
                </div>
                {mostrarErrores && !contactoOk && (
                  <p className="mt-2 text-sm font-medium text-red-700">
                    Indique un correo válido o un número de contacto.
                  </p>
                )}
              </fieldset>

              {/* Tipo de problemática */}
              <div>
                <label htmlFor="problematica" className={etiqueta}>
                  Tipo de problemática <span aria-hidden="true">*</span>
                </label>
                <select
                  id="problematica"
                  name="problematica"
                  required
                  aria-required="true"
                  aria-invalid={mostrarErrores && !problematicaOk}
                  value={valores.problematica}
                  onChange={cambiar}
                  className={campo(mostrarErrores && !problematicaOk)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Atención">Atención</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className={etiqueta}>
                  Mensaje <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  required
                  aria-required="true"
                  aria-describedby="ayuda-mensaje"
                  aria-invalid={mostrarErrores && !mensajeOk}
                  value={valores.mensaje}
                  onChange={cambiar}
                  className={campo(mostrarErrores && !mensajeOk)}
                />
                <p id="ayuda-mensaje" className="mt-1 text-sm text-slate-700">
                  Describa la situación con el mayor detalle posible.
                </p>
              </div>

              {/* Aviso de privacidad */}
              <div className="rounded-lg bg-gray-100 p-4">
                <h3 className="text-base font-bold text-[#082F63]">Aviso de privacidad y tratamiento de datos</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-800">
                  Los datos personales suministrados en este formulario serán utilizados únicamente para atender su
                  mensaje y comunicarnos con usted. Sus datos no serán compartidos con terceros y serán tratados
                  conforme a la Ley 1581 de 2012.
                </p>
              </div>

              {/* Autorización */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="acepta"
                    name="acepta"
                    type="checkbox"
                    required
                    aria-required="true"
                    aria-invalid={mostrarErrores && !acepta}
                    checked={acepta}
                    onChange={(e) => setAcepta(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#082F63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068B5]"
                  />
                  <label htmlFor="acepta" className="text-base text-slate-900">
                    Acepto el tratamiento de mis datos personales <span aria-hidden="true">*</span>
                  </label>
                </div>
              </div>

              {/* Mensajes de estado */}
              <div aria-live="polite">
                {mostrarErrores && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    Por favor, complete todos los campos obligatorios y acepte el tratamiento de datos.
                  </p>
                )}
                {estado === "error-envio" && (
                  <p role="alert" className="rounded-lg border border-red-700 bg-red-50 p-3 text-base font-medium text-red-900">
                    Hubo un error, por favor intente de nuevo.
                  </p>
                )}
                {estado === "exito" && (
                  <p role="status" className="rounded-lg border border-green-700 bg-green-50 p-3 text-base font-semibold text-green-900">
                    ¡Reporte enviado con éxito!
                  </p>
                )}
              </div>

              {/* Envío */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#082F63] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0a3d82] disabled:cursor-not-allowed disabled:opacity-70 ${FOCO}`}
                >
                  <IconSend className="h-5 w-5" />
                  {estado === "enviando" ? "Enviando…" : "Reportar mensaje"}
                </button>
                <p className="text-sm text-slate-600">VEESCAL se comunicará con usted posteriormente.</p>
              </div>
            </form>
          </section>

          {/* Columna derecha: ayuda */}
          <aside aria-label="Información de ayuda" className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0068B5]/10 text-[#0068B5]">
                  <IconInfo />
                </span>
                <h2 className="text-lg font-bold text-[#082F63]">¿Para qué sirve este formulario?</h2>
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Permite informar a VEESCAL sobre situaciones relacionadas con medicamentos o con la atención en salud,
                para que puedan ser objeto de seguimiento ciudadano.
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-[#082F63]">Después de enviar</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                VEESCAL revisará su mensaje y se comunicará con usted posteriormente por el medio de contacto que
                indique.
              </p>
            </section>
          </aside>
        </div>
      </main>

      {/* 5. PIE DE PÁGINA */}
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