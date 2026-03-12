/**
 * Busca e renderiza os projetos do Supabase.
 * @param {string} categoryFilter - Categoria para filtrar ('all' para todos).
 * @param {string} searchQuery - Texto para buscar no título.
 */
async function fetchProjects(categoryFilter = 'all', searchQuery = '') {
  const container = document.getElementById('projects-container');
  
  // Se não existir o container na página atual, aborta a execução silenciosamente
  if (!container) return;

  // Estado de carregamento centralizado ocupando todas as colunas do grid
  container.innerHTML = '<div class="spinner" style="margin: 40px auto; grid-column: 1 / -1;"></div>';

  try {
    // 1. Constrói a query base ordenando dos mais recentes para os mais antigos
    let query = window.supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    // 2. Aplica o filtro de categoria (se não for "todos")
    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }

    // 3. Aplica o filtro de texto (busca no título) ignorando maiúsculas/minúsculas
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    // 4. Executa a requisição no banco de dados
    const { data: projects, error } = await query;

    if (error) throw error;
    
    // 5. Tratamento de estado vazio (nenhum projeto encontrado)
    if (projects.length === 0) {
      container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-gray); padding: 2rem 0;">Nenhum projeto encontrado com estes filtros.</p>';
      return;
    }

    // 6. Monta o HTML em memória para melhor performance (evita reflows excessivos do DOM)
    let cardsHTML = '';
    projects.forEach(project => {
      // Verifica se o componente foi importado corretamente no HTML
      if (typeof ProjectCard === 'function') {
        cardsHTML += ProjectCard(project);
      } else {
        console.error('Erro: Componente ProjectCard não encontrado. Verifique a importação no HTML.');
      }
    });

    // 7. Injeta todos os cards no container de uma só vez
    container.innerHTML = cardsHTML;

    // 8. Reativa as animações de scroll para os novos cards gerados
    reinitObserver();

  } catch (error) {
    console.error('Erro ao buscar projetos do Supabase:', error);
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--warm-orange); padding: 2rem 0;">Erro ao carregar os projetos. Verifique a conexão ou tente novamente mais tarde.</p>';
  }
}

/**
 * Re-aplica o IntersectionObserver aos novos elementos renderizados dinamicamente
 */
function reinitObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para de observar após a primeira animação
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos com 'fade-in' que ainda não estão visíveis
  document.querySelectorAll('.fade-in:not(.visible)').forEach(element => {
    observer.observe(element);
  });
}

// Inicializa a busca automaticamente quando o DOM estiver pronto, mas apenas nas páginas relevantes
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  // Checa se está na Home (index) ou na página de projetos
  if (path.includes('projetos.html') || path === '/' || path.includes('index.html')) {
    fetchProjects();
  }
});