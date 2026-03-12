const Navbar = () => `
  <nav class="navbar">
    <a href="/index.html" class="logo">ROSah Media</a>
    <div class="menu-toggle" id="mobile-menu-btn">☰</div>
    <ul class="nav-links" id="nav-links">
      <li><a href="/index.html">Início</a></li>
      <li><a href="/pages/sobre.html">Sobre</a></li>
      <li><a href="/pages/projetos.html">Projetos</a></li>
      <li><a href="/pages/experiencias.html">Experiências</a></li>
      <li><a href="/pages/contato.html">Contato</a></li>
    </ul>
  </nav>
`;

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("navbar-placeholder");
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = Navbar();
    
    // Mobile menu logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }
});