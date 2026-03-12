// Função que recebe os dados do projeto e retorna a estrutura HTML do card
const ProjectCard = (project) => `
  <a href="/pages/projeto.html?id=${project.id}" class="project-card fade-in">
    <img src="${project.cover_image}" alt="${project.title}" loading="lazy">
    <div class="project-info">
      <span style="color: var(--neon-purple); font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
        ${project.category}
      </span>
      <h3 style="margin: 10px 0; font-family: var(--font-title);">${project.title}</h3>
      <p style="color: var(--text-gray); font-size: 0.9rem;">
        ${project.description.substring(0, 85)}...
      </p>
    </div>
  </a>
`;