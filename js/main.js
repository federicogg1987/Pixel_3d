document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '5493512339940';
    // Tu número de WhatsApp con código de país, sin '+' ni espacios
    const WHATSAPP_NUMBER_CORDOBA = '5493512339940'; // ¡TU NÚMERO DE CÓRDOBA!
    const WHATSAPP_NUMBER_LACALERA = '5493543640927'; // ¡NÚMERO DE LA CALERA!

    // URL de Google Maps para incrustar (iframe)
    const MAP_URL_LACALERA = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11461.0188429642!2d-64.3446725180707!3d-31.348455906545496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d620655555555%3A0xa87c9336fe564e17!2sLa%20Calera%2C%20Cordoba!5e0!3m2!1ses!2sar!4v1751853478818!5m2!1ses!2sar" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'; // Reemplazar con tu URL real
    const MAP_URL_CORDOBA = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.1199050917403!2d-64.1310147250557!3d-31.43836579731308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bd2167a27edb%3A0xf1605b07b6a9b2f4!2sArco%20De%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1751854375815!5m2!1ses!2sar" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'; // Reemplazar con tu URL real

    // --- Navegación Responsiva (Menú Hamburguesa) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Cierra el menú cuando se hace clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = ''; // Reset animation for next open
                });
            }
        });
    });

    // --- Carga Dinámica de Productos (Fácil de Editar) ---
    const productGallery = document.querySelector('.gallery');

    // Array de objetos con la información de tus productos
    // ¡Aquí es donde debes editar para cambiar tus productos!
    const products = [
        {
            image: 'img/product-1.jpg', // Ruta de tu imagen
            name: 'Rompecabeza 3d',
            /*description: 'Diseño moderno y funcional para organizar tu escritorio.',
            price: '$20.00'*/
        },
        {
            image: 'img/product-2.jpg',
            name: 'Soporte para celular',
            /*description: 'Diseño moderno y funcional para organizar tu escritorio.',
            price: '$20.00'*/
        },
        {
            image: 'img/product-3.jpg',
            name: 'Llavero soporte celular',
            /*description: 'Añade un toque de estilo a cualquier espacio de tu hogar.',
            price: '$18.00'*/
        },
        {
            image: 'img/product-4.jpg',
            name: 'Personaje Minecraft',
            /*description: 'Mantén tus cables ordenados y sin enredos con estos prácticos organizadores.',
            price: '$12.00'*/
        },
        {
            image: 'img/product-5.jpg', // Ruta de tu imagen
            name: 'Tetris 3d',
            /*description: 'Detalle increíble y colores vibrantes. Ideal para coleccionistas.',
            price: '$35.00'*/
        },
        {
            image: 'img/product-6.jpg',
            name: 'Juego de equilibrio y pulso',
            /*description: 'Diseño moderno y funcional para organizar tu escritorio.',
            price: '$20.00'*/
        },
        {
            image: 'img/product-7.jpg',
            name: 'Llavero souvenir Animalitos',
            /*description: 'Añade un toque de estilo a cualquier espacio de tu hogar.',
            price: '$18.00'*/
        },
        {
            image: 'img/product-8.jpg', // Ruta de tu imagen
            name: 'Llavero estrellita', // Corregido typo aquí, era 'Lllavero'
            /*description: 'Detalle increíble y colores vibrantes. Ideal para coleccionistas.',
            price: '$35.00'*/
        },
        {
            image: 'img/product-9.jpg',
            name: 'Consulte presupuesto por impresion de diseños a medida',
            /*description: 'Diseño moderno y funcional para organizar tu escritorio.',
            price: '$20.00'*/
        }
    ];

    function loadProducts() {
        if (!productGallery) return; // Asegurarse de que el elemento exista

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Asegúrate de añadir un data-attribute para el nombre del producto
            // Ya que description y price están comentados, solo pasamos el nombre
            productCard.setAttribute('data-product-name', product.name);

            // Nota: Aquí se quitó la descripción y el precio del innerHTML para reflejar tu array 'products'
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                </div>
            `;
            productGallery.appendChild(productCard);

            // --- NUEVA FUNCIONALIDAD: CLIC EN PRODUCTO PARA WHATSAPP ---
            productCard.addEventListener('click', () => {
                const productName = productCard.getAttribute('data-product-name');
                // No intentamos obtener description o price si están comentados en los objetos de producto

                // Construye el mensaje de WhatsApp. Adaptado para solo usar el nombre.
                let whatsappMessage = `Hola, estoy interesado en el producto: *${productName}*. Quisiera un presupuesto.`;

                // Codifica el mensaje para la URL
                const encodedMessage = encodeURIComponent(whatsappMessage);

                // Crea la URL de WhatsApp
                const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

                // Abre WhatsApp en una nueva pestaña/ventana
                window.open(whatsappURL, '_blank');
            });
            // --- FIN NUEVA FUNCIONALIDAD ---
        });
    }

    loadProducts(); // Carga los productos al iniciar la página

    // --- NUEVA FUNCIONALIDAD: CONTACTO POR LOCALIDAD ---
    const btnLaCalera = document.getElementById('btn-la-calera');
    const btnCordoba = document.getElementById('btn-cordoba');
    const contactInfoLaCalera = document.getElementById('contact-info-lacalera');
    const contactInfoCordoba = document.getElementById('contact-info-cordoba');
    const mapLaCaleraDiv = document.getElementById('map-lacalera');
    const mapCordobaDiv = document.getElementById('map-cordoba');

    // Función para mostrar el panel de contacto de una localidad y ocultar el otro
    function showContactPanel(panelToShow, mapDivToShow, mapUrl, whatsappNumber) {
        // Oculta todos los paneles primero
        contactInfoLaCalera.style.display = 'none';
        contactInfoCordoba.style.display = 'none';

        // Muestra el panel deseado
        panelToShow.style.display = 'block';

        // Incrusta el mapa de Google Maps dinámicamente
        // Esto evita que todos los mapas se carguen al inicio y se creen múltiples iframes
        if (!mapDivToShow.querySelector('iframe')) { // Solo crea el iframe si no existe
            const iframe = document.createElement('iframe');
            iframe.src = mapUrl;
            iframe.setAttribute('loading', 'lazy'); // Mejora el rendimiento de carga
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            iframe.classList.add('google-map');
            mapDivToShow.appendChild(iframe);
        }

        // Actualiza el enlace de WhatsApp dinámicamente
        const whatsappLink = panelToShow.querySelector('.whatsapp-btn');
        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, quisiera más información sobre sus productos.')}`;
        }
    }

    // Event Listeners para los botones
    if (btnLaCalera && contactInfoLaCalera && mapLaCaleraDiv) {
        btnLaCalera.addEventListener('click', () => {
            showContactPanel(contactInfoLaCalera, mapLaCaleraDiv, MAP_URL_LACALERA, WHATSAPP_NUMBER_LACALERA);
        });
    }

    if (btnCordoba && contactInfoCordoba && mapCordobaDiv) {
        btnCordoba.addEventListener('click', () => {
            showContactPanel(contactInfoCordoba, mapCordobaDiv, MAP_URL_CORDOBA, WHATSAPP_NUMBER_CORDOBA);
        });
    }
    // --- FIN NUEVA FUNCIONALIDAD ---

    // --- Validación de Formulario de Contacto (Básica) ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) { // Asegurarse de que el formulario exista
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío por defecto del formulario

            const name = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('mensaje').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Aquí puedes añadir la lógica para enviar el formulario.
            // Por ejemplo, usar fetch() para enviarlo a un servicio backend.
            // Por ahora, solo mostraremos una alerta de éxito.
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');

            contactForm.reset(); // Limpia el formulario
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Efecto de desplazamiento suave (Smooth Scrolling) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});