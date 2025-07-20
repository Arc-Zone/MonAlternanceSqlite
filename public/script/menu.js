// public/scripts/copy.js
window.addEventListener('DOMContentLoaded', () => {
  const { clipboard } = require('electron');

  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const textEl = document.getElementById(targetId);
      if (!textEl) {
        console.error(`Target #${targetId} introuvable`);
        return;
      }
      const text = textEl.innerText.trim();
      try {
        clipboard.writeText(text);
        button.textContent = '✔ Copié';
        setTimeout(() => button.textContent = 'Copier', 1500);
      } catch (err) {
        console.error('Erreur copier‑coller:', err);
      }
    });
  });
});
