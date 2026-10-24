/* =================================================
   ORBIS LUMEN - SCRIPTS INTERATIVOS
   Funcionalidades: Rolagem suave, animações, validação, menu mobile
   ================================================= */

// ========== MENU MOBILE ==========
/**
 * Controla abertura e fechamento do menu mobile
 */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    // Toggle menu ao clicar no botão
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Fechar menu ao redimensionar a janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ========== SCROLL SUAVE PARA SEÇÕES ==========
/**
 * Função para fazer scroll suave até uma seção
 * @param {string} selector - Seletor CSS da seção
 */
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========== OBSERVADOR PARA ANIMAÇÕES ==========
/**
 * Observa elementos com classe 'fade-in' e os anima quando entram na viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os elementos com classe 'fade-in'
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ========== ADICIONAR EFEITOS DE HOVER EM BOTÕES ==========
/**
 * Adiciona feedback visual ao clicar botões
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========== ANIMAÇÃO DE SCROLL PARALLAX LEVE ==========
/**
 * Cria efeito parallax suave nos elementos durante scroll
 */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// ========== ATIVAÇÃO DE LINKS DE NAVEGAÇÃO ==========
/**
 * Destaca o link de navegação ativo com base na seção visível
 */
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== INICIALIZAÇÃO ==========
/**
 * Função de inicialização executada quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Orbis Lumen - Site carregado com sucesso');

    // Adicionar animações aos elementos já visíveis ao carregar
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
                element.style.opacity = '1';
            }, index * 100);
        }
    });

    // Log para confirmação
    console.log('Animações inicializadas');
});

// ========== POLIMENTO E ACESSIBILIDADE ==========
/**
 * Suportar navegação por teclado em botões
 */
document.querySelectorAll('.btn, .nav-menu a').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

/**
 * Reduzir animações se o usuário preferir
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}
