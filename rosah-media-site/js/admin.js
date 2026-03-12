document.addEventListener('DOMContentLoaded', async () => {
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');

  // Checar se já está logado
  const { data: { session } } = await window.supabase.auth.getSession();
  if (session) {
    loginSection.classList.remove('active-section');
    dashboardSection.classList.add('active-section');
  } else {
    loginSection.classList.add('active-section');
  }

  // Lógica de Login
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert('Erro ao logar: ' + error.message);
    } else {
      loginSection.classList.remove('active-section');
      dashboardSection.classList.add('active-section');
    }
  });

  // Lógica de Logout
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await window.supabase.auth.signOut();
    window.location.reload();
  });

  // Lógica de Upload e Inserção de Projeto
  document.getElementById('add-project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Enviando Imagem...';
    submitBtn.disabled = true;

    try {
      // 1. Upload da Imagem
      const fileInput = document.getElementById('p-image-file');
      const file = fileInput.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await window.supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Pegar a URL pública da imagem
      const { data: publicUrlData } = window.supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);
      
      const imageUrl = publicUrlData.publicUrl;

      // 2. Inserir dados no banco
      submitBtn.textContent = 'Salvando Dados...';
      
      const toolsRaw = document.getElementById('p-tools').value;
      const toolsArray = toolsRaw ? toolsRaw.split(',').map(t => t.trim()) : [];

      const projectData = {
        title: document.getElementById('p-title').value,
        category: document.getElementById('p-category').value,
        description: document.getElementById('p-description').value,
        cover_image: imageUrl,
        tools: toolsArray,
        video_url: document.getElementById('p-video').value || null,
        date: new Date().toISOString()
      };

      const { error: insertError } = await window.supabase
        .from('projects')
        .insert([projectData]);

      if (insertError) throw insertError;

      alert('Projeto adicionado com sucesso!');
      document.getElementById('add-project-form').reset();

    } catch (error) {
      console.error(error);
      alert('Erro ao salvar projeto: ' + error.message);
    } finally {
      submitBtn.textContent = 'Salvar Projeto';
      submitBtn.disabled = false;
    }
  });
});