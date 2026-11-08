"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "motion/react";

import { AltArrowDownIcon } from '@solar-icons/react/linear/alt-arrow-down'
import { HamburgerMenuIcon } from '@solar-icons/react/linear/hamburger-menu'
import { CloseIcon } from '@solar-icons/react/linear/close'

type HrefValue = string | { pathname: string; query?: Record<string, string> };

interface SubNavItem {
    href: HrefValue;
    label: string;
}

interface NavItem {
    href: string;
    label: string;
    children?: SubNavItem[];
}

const navigationItems: NavItem[] = [
    { href: "/", label: "Início" },
    { href: "/charts", label: "Gráficos" },
    { href: "/links", label: "Links" },
    // {
    //     href: "/blog",
    //     label: "Notícias",
    //     children: [
    //         { href: "/blog", label: "Blog" },
    //         {
    //             href: {
    //                 pathname: "/blog",
    //                 query: { category: "comunicados" },
    //             },
    //             label: "Comunicados",
    //         },
    //         {
    //             href: "/politica-de-privacidade",
    //             label: "Política de privacidade",
    //         },
    //         { href: "/termos-de-uso", label: "Termos de uso" },
    //         { href: "/codigo-de-etica", label: "Código de ética" },
    //     ],
    // },
    // { href: "/equipe", label: "Equipe" },
    // {
    //     href: "/institucional",
    //     label: "Quem somos",
    //     children: [
    //         // { href: "/institucional", label: "A Nefruza" },
    //         { href: "/institucional", label: "Nossa história" },
    //         { href: "/institucional/estrutura", label: "Nossa estrutura" },
    //         { href: "/trabalhe-conosco", label: "Trabalhe conosco" },
    //         // { href: "/institucional#pioneirismo", label: "Pioneirismo" },
    //     ],
    // },
];

// pequeno delay para não fechar o painel ao passar o mouse entre o
// acionador e o painel (hover intent)
const CLOSE_DELAY = 120;

function hrefToPath(href: HrefValue) {
    return typeof href === "string" ? href : href.pathname;
}

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerHidden, setHeaderHidden] = useState(false);
    // controla qual item do menu fullscreen está com o submenu expandido
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    // controla qual item do header desktop tem o mega menu aberto
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        const scrollDelta = latest - previous;

        if (latest <= 80 || scrollDelta < -2) {
            setHeaderHidden(false);
        } else if (scrollDelta > 2) {
            setHeaderHidden(true);
        }
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenuOpen(false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpenSubmenu(null);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveItem(null);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    // limpa qualquer timeout pendente ao desmontar
    useEffect(() => {
        return () => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
        };
    }, []);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const openItem = (href: string) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setActiveItem(href);
    };

    const scheduleClose = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        closeTimeout.current = setTimeout(() => {
            setActiveItem(null);
        }, CLOSE_DELAY);
    };

    const activeNavItem = navigationItems.find(
        (item) => item.href === activeItem && item.children,
    );

    return (
        <>
            {/* Header desktop (topo da página) — agora expande para baixo (mega menu) */}
            <header
                onMouseLeave={scheduleClose}
                className={`fixed inset-x-0 top-0 z-40 hidden w-full flex-col border-b border-zinc-200 bg-background transition-transform duration-500 ease-out lg:flex ${
                    headerHidden ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <nav className="flex w-full items-center justify-between px-16 py-4 h-24">
                    <div className="flex w-full max-w-6xl items-center justify-between mx-auto">
                        <Link href="/" className="flex items-center gap-4">
                            <Image
                                src="/logo-cor.svg"
                                alt="Patinhas Logo"
                                width={124}
                                height={45}
                                priority
                                className="h-8 w-auto"
                            />
                        </Link>

                        <div className="flex items-center gap-4">
                            {navigationItems.map((item) => {
                                const active = isActive(item.href);
                                const isOpen = activeItem === item.href;

                                const linkClasses = `flex items-center gap-1 rounded-md px-4 py-2 transition-colors ${
                                    active || isOpen
                                        ? "font-bold text-nef-700"
                                        : "text-zinc-700 hover:text-nef-700"
                                }`;

                                if (!item.children) {
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            className={linkClasses}
                                            onMouseEnter={() =>
                                                setActiveItem(null)
                                            }
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        aria-expanded={isOpen}
                                        className={linkClasses}
                                        onMouseEnter={() => openItem(item.href)}
                                        onFocus={() => openItem(item.href)}
                                    >
                                        {item.label}
                                        <AltArrowDownIcon
                                            className={`text-sm transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>

            </header>

            <header
                className={`fixed inset-x-0 top-0 z-40 flex h-20 w-full items-center justify-between border-b border-zinc-200 bg-background px-6 transition-transform duration-500 ease-out lg:hidden ${
                    headerHidden ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-4">
                        <Image
                            src="/logo-cor.svg"
                            alt="Patinhas Logo"
                            width={124}
                            height={45}
                            priority
                            className="h-8 w-auto"
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menu"
                        aria-expanded={menuOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition-colors hover:text-nef-700"
                    >
                        <HamburgerMenuIcon size={26} />
                    </button>
                </div>
            </header>

            <div className="h-20 lg:h-24" />

            {/* Menu fullscreen colapsável (reutilizado no scroll do desktop e no mobile) — inalterado */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="fullscreen-menu"
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        transition={{
                            duration: 0.45,
                            ease: [0.65, 0, 0.35, 1],
                        }}
                        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background"
                    >
                        <div className="flex items-center justify-between w-full px-6 md:px-6 py-5 max-w-6xl mx-auto">
                            <Link
                                href="/"
                                className="flex items-center gap-4"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Image
                                    src="/logo-cor.svg"
                                    alt="Patinhas Logo"
                                    width={124}
                                    height={45}
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Fechar menu"
                                className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition-colors hover:text-nef"
                            >
                                <CloseIcon size={26} />
                            </button>
                        </div>

                        <motion.nav
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.15,
                                    },
                                },
                                closed: {},
                            }}
                            className="flex flex-1 flex-col items-center justify-center gap-1 py-8 max-w-6xl mx-auto w-full"
                        >
                            {navigationItems.map((item) => {
                                const active = isActive(item.href);
                                const isSubmenuOpen = openSubmenu === item.href;

                                return (
                                    <motion.div
                                        key={item.href}
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -12 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="flex w-full flex-col items-center"
                                    >
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={item.href}
                                                onClick={() =>
                                                    !item.children &&
                                                    setMenuOpen(false)
                                                }
                                                aria-current={
                                                    active ? "page" : undefined
                                                }
                                                className={`block px-4 py-3 text-center text-2xl transition-colors ${
                                                    active
                                                        ? "font-bold text-nef-600"
                                                        : "text-zinc-700 hover:text-nef-600"
                                                }`}
                                            >
                                                {item.label}
                                            </Link>

                                            {item.children && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenSubmenu(
                                                            (prev) =>
                                                                prev ===
                                                                item.href
                                                                    ? null
                                                                    : item.href,
                                                        )
                                                    }
                                                    aria-label={`Expandir ${item.label}`}
                                                    aria-expanded={
                                                        isSubmenuOpen
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors hover:text-nef"
                                                >
                                                    <AltArrowDownIcon
                                                        className={`text-lg transition-transform duration-300 ${
                                                            isSubmenuOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                    </motion.div>
                                );
                            })}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
