document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO
    // =======================================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =======================================================
    // 2. DESTAQUE DO LINK ATIVO AO ROLAR A PÁGINA
    // =======================================================
    const sections = document.querySelectorAll('section, footer'); 
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.navbar-links a').forEach(link => {
                    link.classList.remove('active');
                });

                const sectionId = entry.target.getAttribute('id');
                
                const correspondingLink = document.querySelector(`.navbar-links a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id && document.querySelector(`.navbar-links a[href="#${section.id}"]`)) {
            observer.observe(section);
        }
    });

    // =======================================================
    // 3. EFEITO DE FADE-IN PARA CARDS E SEÇÕES AO ROLAR
    // =======================================================
    const elementsToAnimate = document.querySelectorAll('.card, .hero-content');

    const scrollObserver = new IntersectionObserver((entries, scrollObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });

    elementsToAnimate.forEach(element => {
        element.classList.add('to-fade'); 
        scrollObserver.observe(element);
    });

    // =======================================================
    // 4. ANIMAÇÃO DE PULSO PARA O PLANO MAIS POPULAR
    // =======================================================
    const popularCard = document.querySelector('.plan-card.popular');
    
    if (popularCard) {
        popularCard.classList.add('animate-pulse');
    }

    // =======================================================
    // 5. ALTERNÂNCIA DE TEMA (ESCURO / ACESSÍVEL)
    // =======================================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Define o estado inicial lendo o localStorage ou o atributo HTML
    let currentTheme = localStorage.getItem('theme') || html.getAttribute('data-theme') || 'dark';

    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Atualiza o ícone do botão
        if (theme === 'accessible') {
            icon.classList.remove('fa-eye'); 
            icon.classList.add('fa-moon');   
            themeToggle.setAttribute('title', 'Alternar para Modo Escuro');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-eye');
            themeToggle.setAttribute('title', 'Alternar para Modo de Acessibilidade');
        }
    };

    // Aplica o tema carregado ao iniciar
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        // Alterna entre 'dark' e 'accessible'
        currentTheme = html.getAttribute('data-theme') === 'dark' ? 'accessible' : 'dark';
        applyTheme(currentTheme);
    });

    // =======================================================
    // 6. CARREGAMENTO DINÂMICO DO VÍDEO DO YOUTUBE
    // =======================================================
    const videoPlaceholder = document.getElementById('youtube-placeholder');

    if (videoPlaceholder) {
        // Adiciona o evento de clique uma única vez
        videoPlaceholder.addEventListener('click', function loadYoutubeVideo() {
            const videoId = this.getAttribute('data-video-id');
            
            // Constrói o iframe de incorporação com autoplay
            const iframeHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            `;

            // Substitui o conteúdo (imagem + play button) pelo iframe
            this.innerHTML = iframeHTML;
            
            // Remove o evento de clique após a substituição
            this.removeEventListener('click', loadYoutubeVideo);
            this.style.cursor = 'default';
        });
    }
});