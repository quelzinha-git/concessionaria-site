/**
 * Controle de Navegação e Responsividade — Rota Motores
 */

import { estaAutenticado } from "./auth.mjs";

export function inicializarNavegacao() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Marca item ativo no menu desktop
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (!link) return;
    const isCurrent = link.getAttribute("href") === currentPath;
    item.classList.toggle("active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
  });

  // Marca item ativo no drawer mobile
  const mobileLinks = document.querySelectorAll(".mobile-nav-drawer a");
  mobileLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === currentPath;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
  });

  // Controle do menu mobile
  const toggleBtn = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");

  if (toggleBtn && drawer) {
    const mobileLayout = window.matchMedia("(max-width: 768px)");
    const pageContent = document.querySelectorAll("main, .global-footer");

    function setMenuOpen(isOpen) {
      drawer.classList.toggle("open", isOpen);
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
      document.body.classList.toggle("mobile-menu-open", isOpen);
      pageContent.forEach(element => { element.inert = isOpen; });
    }

    toggleBtn.addEventListener("click", () => {
      const isOpen = !drawer.classList.contains("open");
      setMenuOpen(isOpen);
      if (isOpen) drawer.querySelector("a").focus();
    });

    drawer.addEventListener("click", event => {
      if (event.target.closest("a")) setMenuOpen(false);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && drawer.classList.contains("open")) {
        setMenuOpen(false);
        toggleBtn.focus();
      }
    });

    mobileLayout.addEventListener("change", event => {
      if (!event.matches) setMenuOpen(false);
    });
  }

  // Verifica estado de autenticação para botões de gestão
  const btnAdmin = document.querySelector(".nav-btn-admin");
  if (btnAdmin && estaAutenticado()) {
    btnAdmin.textContent = "Gestão ✓";
    btnAdmin.style.backgroundColor = "var(--color-cool-wash)";
  }
}

// Inicializa automaticamente se chamado na página
document.addEventListener("DOMContentLoaded", () => {
  inicializarNavegacao();
});
