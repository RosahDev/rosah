/**
 * Carrega e renderiza os detalhes de um projeto único baseado no ID da URL.
 * Design Premium Automotivo com banner cinematográfico.
 * Espera um parâmetro 'id' na query string (ex: projeto.html?id=123)
 */
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const container = document.getElementById('project-content');

  // Validação: verifica se o ID foi fornecido
  if (!projectId) {
    container.innerHTML = `
      <div style="text-align: center; padding: 6rem 2rem;">
        <h2>Projeto não encontrado</h2>
        <p style="color: var(--text-platinum); margin-top: 1.5rem; font-weight: 300;">O ID do projeto não foi fornecido na URL.</p>
        <a href="projetos.html" class="btn btn-primary" style="display: inline-block; margin-top: 2rem;">Voltar aos Projetos</a>
      </div>
    `;
    return;
  }

  try {
    // Busca o projeto no Supabase pelo ID
    const { data: project, error } = await window.supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    // Tratamento de erro - projeto não encontrado ou outro erro
    if (error) {
      throw error;
    }

    if (!project) {
      throw new Error('Projeto não encontrado no banco de dados');
    }

    // Renderiza as ferramentas/tecnologias em badges minimalistas (se houver)
    let toolsHTML = '';
    if (project.tools && Array.isArray(project.tools) && project.tools.length > 0) {
      toolsHTML = project.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('');
    }

    // Renderiza o HTML do projeto com design cinematográfico premium
    container.innerHTML = `
      <div class="project-header fade-in">
        <span>${project.category}</span>
        <h1>${project.title}</h1>
        <p>${new Date(project.date).toLocaleDateString('pt-BR')}</p>
      </div>

      <img src="${project.cover_image}" alt="${project.title}" class="project-cover fade-in" loading="lazy">

      <div class="project-details fade-in">
        <div class="description">
          <h3>Sobre o Projeto</h3>
          <p style="white-space: pre-line;">${project.description}</p>
        </div>
        <div class="meta-info">
          <h3>Tecnologias</h3>
          <div class="tools-list">${toolsHTML || '<span style="color: var(--text-platinum);">Ferramentas não listadas</span>'}</div>
          
          ${project.video_url ? `
            <h3>Vídeo</h3>
            <a href="${project.video_url}" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 1rem;">Assistir Vídeo</a>
          ` : ''}
        </div>
      </div>

      <div style="margin-top: 6rem; padding-top: 3rem; border-top: 1px solid var(--text-platinum); text-align: center;">
        <a href="projetos.html" class="btn btn-outline">Voltar aos Projetos</a>
      </div>
    `;

    // Reinicializa o observer de animações para os novos elementos
    if (typeof reinitObserver === 'function') {
      reinitObserver();
    }

  } catch (error) {
    console.error('Erro ao carregar projeto:', error);
    
    // Renderiza mensagem de erro amigável e diferenciada
    let mensagem = 'Houve um problema ao processar sua requisição.';
    
    if (error.message && error.message.includes('multiple (or no) rows')) {
      mensagem = 'O projeto que você procura não existe ou foi removido.';
    }

    container.innerHTML = `
      <div style="text-align: center; padding: 6rem 2rem;">
        <h2>Erro ao carregar o projeto</h2>
        <p style="color: var(--text-platinum); margin-top: 1.5rem; font-weight: 300;">${mensagem}</p>
        <a href="projetos.html" class="btn btn-primary" style="display: inline-block; margin-top: 2rem;">Voltar aos Projetos</a>
      </div>
    `;
  }
});
