<template>
  <footer class="demo-footer">
    <div class="footer-meta">
      <h4 class="footer-author">
        Jubayer Ahmed <span class="dot">•</span> Dynamic Systems, Clean Code
      </h4>
      <p class="footer-tagline">
        Vue Dynamic Table Builder <span class="version">v1.0.0</span>
      </p>
    </div>

    <!-- 🔗 Project Links -->
    <div class="footer-links">
      <a href="https://github.com/jubayer11/vue-dynamic-table-builder" target="_blank" rel="noopener">GitHub ↗</a>
      <span class="separator">|</span>
      <a href="https://www.jubayerahmed.com" target="_blank" rel="noopener">Portfolio ↗</a>
      <span class="separator">|</span>
      <a href="https://github.com/jubayer11/vue-dynamic-table-builder#readme" target="_blank" rel="noopener">Docs ↗</a>
    </div>

    <!-- 📣 Additional Package Promo -->
    <div class="footer-promo">
      🚀 Also explore my
      <a href="https://github.com/jubayer11/vue-dynamic-form-builder" target="_blank" rel="noopener">
        Vue Dynamic Form Builder
      </a>
      — Build smart, fully customizable forms with validation, slots, and design flexibility.
    </div>

    <!-- 📅 Copyright -->
    <div class="footer-note">
      <span>© 2025 All Rights Reserved</span>
    </div>
  </footer>
</template>

<script setup>
/**
 * @component DemoFooter
 * A responsive, theme-aware footer for the demo page.
 * Includes author info, version, project links, and a promo for another Vue package.
 */
</script>

<style scoped>
.demo-footer {
  margin-top: 5rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 0.95rem;
  color: #4b5563;
}

.footer-meta {
  margin-bottom: 0.6rem;
}
.footer-author {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
}
.footer-author .dot {
  margin: 0 0.4rem;
  font-weight: 800;
  color: #9ca3af;
}
.footer-tagline {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0.3rem 0 0;
}
.version {
  font-weight: 600;
  color: #3b82f6;
}

.footer-links {
  margin: 0.8rem 0 1.2rem;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  font-size: 0.95rem;
}
.footer-links a {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer-links a:hover {
  color: #1e40af;
}
.separator {
  color: #9ca3af;
}

.footer-promo {
  margin: 1rem auto;
  max-width: 600px;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.5;
}
.footer-promo a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.footer-promo a:hover {
  text-decoration: underline;
}

.footer-note {
  font-size: 0.85rem;
  color: #9ca3af;
}

/* 🌙 Dark Mode Support */
.dark-mode .demo-footer {
  background: #111827;
  border-top-color: #1f2937;
  color: #9ca3af;
}
.dark-mode .footer-author {
  color: #f3f4f6;
}
.dark-mode .footer-links a {
  color: #60a5fa;
}
.dark-mode .footer-links a:hover {
  color: #93c5fd;
}
.dark-mode .version {
  color: #7dd3fc;
}
.dark-mode .footer-promo {
  color: #cbd5e1;
}
.dark-mode .footer-promo a {
  color: #90cdf4;
}
</style>
