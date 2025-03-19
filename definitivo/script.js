let expanded = false;
let originalBg = document.body.style.backgroundColor;
let textElement = document.getElementById('text');
let titleElement = document.querySelector('.page-title');
let activeBox = null;
let footerElement = document.querySelector('.footer'); // Adicionando o rodapé

function toggleExpand(event, element, desktopImage, mobileImage, title, text) {
    event.stopPropagation();
    if (expanded) {
        resetExpand();
    } else {
        document.querySelectorAll('.box').forEach(box => {
            if (box !== element) {
                box.classList.add('hidden');
            }
        });

        element.classList.add('expand');
        element.style.backgroundColor = "transparent";

        // Definir imagem de fundo diferente para celular e PC
        let imageUrl = window.innerWidth < 768 ? mobileImage : desktopImage;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        if (window.innerWidth >= 768) {
            document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }

        footerElement.classList.add('hidden');

        textElement.classList.add('visible');
        titleElement.classList.add('hidden');

        document.getElementById('title').textContent = title;
        document.getElementById('content').textContent = text;

        expanded = true;
        activeBox = element;
    }
}

function resetExpand(event) {
    if (!expanded) return;

    if (event && event.target === activeBox) return; // Evita resetar se clicar na esfera expandida

    // Restaura as esferas para o estado original
    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('hidden');
        box.classList.remove('expand');
        box.style.backgroundColor = '';  // Restaura a cor da esfera
    });

    // Restaura o background
    document.body.style.backgroundColor = originalBg;
    document.body.style.backgroundImage = 'none';

    // Exibe o rodapé novamente
    footerElement.classList.remove('hidden');

    // Esconde o texto
    textElement.classList.remove('visible');
    titleElement.classList.remove('hidden');

    expanded = false;
    activeBox = null;
}
