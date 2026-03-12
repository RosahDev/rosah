/**
 * Componente Project Card - Design Premium Automotivo
 * A imagem é o foco absoluto com zoom slow no hover
 * Texto em bloco escuro minimalista abaixo
 */
const ProjectCard = (project) => `
  <a href="/pages/projeto.html?id=${project.id}" class="project-card fade-in">
    <img src="${project.cover_image}" alt="${project.title}" loading="lazy">
    <div class="project-info">
      <div>
        <span>${project.category}</span>
        <h3>${project.title}</h3>
      </div>
      <p>
        ${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}
      </p>
    </div>
  </a>
`;