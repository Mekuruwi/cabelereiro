document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const cardsWrapper = carousel.querySelector('.cards-wrapper');
        const cards = cardsWrapper.querySelectorAll('.card');
        const prevBtn = carousel.querySelector('button.prev');
        const nextBtn = carousel.querySelector('button.next');

        // Configurações
        const cardWidth = cards[0].offsetWidth + 16; // 16px de margem (ajuste se mudar no CSS)
        const originalCount = cards.length;

        // Duplica os cards uma vez para fazer o loop parecer infinito
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            cardsWrapper.appendChild(clone);
        });

        let position = 0;
        let slideInterval = null;
        const slideSpeed = 2;

        cardsWrapper.style.transition = 'transform 0.2s ease';

        function updatePosition(px) {
            cardsWrapper.style.transform = `translateX(${-px}px)`;
        }

        function stopSliding() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        function slideRight() {
            position += slideSpeed;
            if (position >= cardWidth * originalCount) {
                // Reset instantâneo (sem animação)
                cardsWrapper.style.transition = 'none';
                position = 0;
                updatePosition(position);

                // Força reflow e volta a animação
                cardsWrapper.offsetHeight;
                cardsWrapper.style.transition = 'transform 0.2s ease';
            } else {
                updatePosition(position);
            }
        }

        function slideLeft() {
            position -= slideSpeed;
            if (position < 0) {
                // Vai pro fim instantaneamente
                cardsWrapper.style.transition = 'none';
                position = cardWidth * originalCount;
                updatePosition(position);

                cardsWrapper.offsetHeight;
                cardsWrapper.style.transition = 'transform 0.2s ease';
            } else {
                updatePosition(position);
            }
        }

        // Hover para deslizar
        nextBtn.addEventListener('mouseenter', () => {
            stopSliding();
            slideInterval = setInterval(slideRight, 20);
        });
        prevBtn.addEventListener('mouseenter', () => {
            stopSliding();
            slideInterval = setInterval(slideLeft, 20);
        });
        nextBtn.addEventListener('mouseleave', stopSliding);
        prevBtn.addEventListener('mouseleave', stopSliding);

        // Clique para "pular" um card
        nextBtn.addEventListener('click', () => {
            stopSliding();
            position += cardWidth;
            if (position >= cardWidth * originalCount) {
                position = 0;
                cardsWrapper.style.transition = 'none';
                updatePosition(position);
                cardsWrapper.offsetHeight;
                cardsWrapper.style.transition = 'transform 0.2s ease';
            } else {
                updatePosition(position);
            }
        });

        prevBtn.addEventListener('click', () => {
            stopSliding();
            position -= cardWidth;
            if (position < 0) {
                position = cardWidth * (originalCount - 1);
                cardsWrapper.style.transition = 'none';
                updatePosition(position);
                cardsWrapper.offsetHeight;
                cardsWrapper.style.transition = 'transform 0.2s ease';
            } else {
                updatePosition(position);
            }
        });

        // Inicializa na posição correta
        updatePosition(position);
    });
});

let slideAtual = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function mostrarSlide(index) {
  const container = document.querySelector('.slides');
  container.style.transform = `translateX(-${index * 100}vw)`;
}

function avancarSlide() {
  slideAtual = (slideAtual + 1) % totalSlides;
  mostrarSlide(slideAtual);
}

function voltarSlide() {
  slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
  mostrarSlide(slideAtual);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      destino.scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isVisible = content.style.display === 'block';
      
      // Fecha todos os outros
      document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
  
      // Alterna visibilidade do clicado
      content.style.display = isVisible ? 'none' : 'block';
    });
  });
  /*galeria de fotos abrir em slide e aparecer em sequencia sem botoes seletores*/
let slideIndex = 0;
const slideshis = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

/*inclui isso e alterei daqui pra baixo */
const totalSlideshis = slideshis.length; // Adicionado para o número total de slides

// Função para exibir um slide específico e atualizar o dot
function showSlide(index) {
    // Garante que o índice sempre esteja dentro dos limites dos slides
    slideIndex = (index + totalSlideshis) % totalSlideshis;

    slideshis.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) { // Verifica se o dot existe antes de remover a classe
            dots[i].classList.remove('active');
        }
    });

    slideshis[slideIndex].classList.add('active');
    if (dots[slideIndex]) { // Verifica se o dot existe antes de adicionar a classe
        dots[slideIndex].classList.add('active');
    }
}

// Função para avançar para o próximo slide
function nextGallerySlide() { // Nome alterado para evitar conflito com 'avancarSlide'
    slideIndex++;
    showSlide(slideIndex);
}

// Inicializa o primeiro slide ao carregar a página
showSlide(slideIndex);

// Inicia o slideshow automático a cada 3 segundos (3000ms)
// Você pode ajustar o tempo conforme a sua preferência
setInterval(nextGallerySlide, 3000);

function showSlide(index) {
  slideshis.forEach((slideshis, i) => {
    slideshis.classList.remove('active');
    dots[i].classList.remove('active');
    if (i === index) {
      slideshis.classList.add('active');
      dots[i].classList.add('active');
    }
  });
}
