"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      // Hide on scroll down, show on scroll up (only past threshold)
      if (currentY > 180) {
        if (currentY > lastY && !mobileMenuOpen) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Handle smooth scroll when clicking the link of the active page
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-border/80 bg-bg/80 backdrop-blur-md py-2.5 shadow-lg"
            : "bg-transparent py-4",
        )}
      >
        <div className="container-content flex items-center justify-between gap-2 px-4 sm:px-6">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 sm:gap-3 text-cream focus-visible:outline-none min-w-0 shrink-0"
            aria-label="Bhojon Bilash Home"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg-soft text-accent">
              <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-display text-base sm:text-lg font-bold tracking-wider text-cream truncate">
                {siteConfig.name}
              </span>
              <span className="font-label text-[8px] sm:text-[9px] tracking-[0.2em] text-accent hidden xs:block">
                DHANMONDI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-6 lg:gap-8 md:flex"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative font-sans text-sm font-medium transition-colors duration-200",
                    isActive ? "text-accent" : "text-cream/80 hover:text-cream",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="tel:+8801700000000"
              className="hidden items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-cream/90 hover:border-cream/30 lg:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              <span>Call Us</span>
            </Link>

            <Link href="/reservation">
              <Button
                size="sm"
                variant="primary"
                magnetic
                className="shadow-glow px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm whitespace-nowrap"
              >
                <span className="sm:hidden">Reserve</span>
                <span className="hidden sm:inline">Reserve Table</span>
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border text-cream hover:bg-bg-soft md:hidden shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg/95 backdrop-blur-xl px-8 pt-28 pb-12 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (i + 1), duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "font-display text-3xl font-semibold",
                      pathname === link.href ? "text-accent" : "text-cream",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 border-t border-border pt-6"
            >
              <p className="text-xs text-muted">{siteConfig.contact.address}</p>
              <div className="flex gap-4">
                <Link
                  href="/reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full">
                    Reserve a Table
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
