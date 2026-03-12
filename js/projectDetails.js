/**
 * Carrega e renderiza os detalhes de um projeto único baseado no ID da URL.
 * Espera um parâmetro 'id' na query string (ex: projeto.html?id=123)
 */
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const container = document.getElementById('project-content');

  // Validação: verifica se o ID foi fornecido
  if (!projectId) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h2>Projeto não encontrado.</h2>
        <p style="color: var(--text-gray); margin-top: 1rem;">O ID do projeto não foi fornecido na URL.</p>
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

    // Renderiza as ferramentas/tecnologias em badges (se houver)
    let toolsHTML = '';
    if (project.tools && Array.isArray(project.tools) && project.tools.length > 0) {
      toolsHTML = project.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('');
    }

    // Renderiza o HTML do projeto com todos os detalhes
    container.innerHTML = `
      <div class="project-header fade-in">
        <span style="color: var(--neon-purple); text-transform: uppercase; letter-spacing: 2px;">${project.category}</span>
        <h1 style="font-size: clamp(2rem, 4vw, 3.5rem); margin: 10px 0;">${project.title}</h1>
        <p style="color: var(--text-gray);">${new Date(project.date).toLocaleDateString('pt-BR')}</p>
      </div>

      <img src="${project.cover_image}" alt="${project.title}" class="project-cover fade-in" loading="lazy">

      <div class="project-details fade-in">
        <div class="description">
          <h3>Sobre o Projeto</h3>
          <p style="margin-top: 1rem; color: var(--text-gray); white-space: pre-line; line-height: 1.6;">${project.description}</p>
        </div>
        <div class="meta-info">
          <h3>Tecnologias / Ferramentas</h3>
          <div class="tools-list">${toolsHTML || '<span style="color: var(--text-gray);">Ferramentas não listadas</span>'}</div>
          
          ${project.video_url ? `
            <h3 style="margin-top: 2rem;">Vídeo</h3>
            <a href="${project.video_url}" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 1rem;">Assistir Vídeo</a>
          ` : ''}
        </div>
      </div>

      <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
        <a href="projetos.html" class="btn btn-outline">Voltar aos Projetos</a>
      </div>
    `;

    // Reinicializa o observer de animações para os novos elementos
    if (typeof reinitObserver === 'function') {
      reinitObserver();
    }

  } catch (error) {
    console.error('Erro ao carregar projeto:', error);
    
    // Renderiza mensagem de erro amigável
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h2>Erro ao carregar o projeto</h2>
        <p style="color: var(--text-gray); margin-top: 1rem;">
          ${error.message === 'JSON object requested, multiple (or no) rows returned' 
            ? 'O projeto que você procura não existe ou foi removido.' 
            : 'Houve um problema ao processar sua requisição. Tente novamente.'}
        </p>
        <a href="projetos.html" class="btn btn-primary" style="display: inline-block; margin-top: 2rem;">Voltar aos Projetos</a>
      </div>
    `;
  }
});
