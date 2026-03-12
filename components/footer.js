const Footer = () => `
  <footer>
    <h3 class="logo">Rosah Media</h3>
    <p>© ${new Date().getFullYear()} Lucas Rosa. Todos os direitos reservados.</p>
    <p style="font-size: 0.8rem; margin-top: 10px;">Araraquara, SP - Brasil</p>
  </footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = Footer();
  }
});