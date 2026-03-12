document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');

  // Só executa se estiver na página que tem os filtros
  if (!filterButtons.length && !searchInput) return;

  // Lógica de Filtro por Categoria (Botões)
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // 1. Remove o estado "ativo" (btn-primary) de todos os botões e volta para btn-outline
      filterButtons.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      
      // 2. Adiciona o estado "ativo" no botão que foi clicado
      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-primary');

      // 3. Pega a categoria e o texto atual da pesquisa
      const category = e.target.getAttribute('data-category');
      const currentSearch = searchInput ? searchInput.value : '';
      
      // 4. Chama a função de busca do Supabase
      if (typeof fetchProjects === 'function') {
        fetchProjects(category, currentSearch);
      }
    });
  });

  // Lógica de Pesquisa por Texto (com Debounce para não travar o banco)
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      
      // Espera o usuário parar de digitar por 500ms antes de buscar
      searchTimeout = setTimeout(() => {
        // Descobre qual categoria está ativa no momento
        const activeBtn = document.querySelector('.filter-btn.btn-primary');
        const activeCategory = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
        
        if (typeof fetchProjects === 'function') {
          fetchProjects(activeCategory, e.target.value);
        }
      }, 500); 
    });
  }
});