const STORAGE_KEY = 'nt-theme';

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = dark ? '☀ Light' : '☾ Dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    localStorage.setItem(STORAGE_KEY, isDark ? 'light' : 'dark');
    applyTheme(!isDark);
  });
}

document.addEventListener('DOMContentLoaded', initTheme);
