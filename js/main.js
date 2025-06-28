document.addEventListener('DOMContentLoaded', () => {
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
            name: 'Lllavero estrelita',
            /*description: 'Detalle increíble y colores vibrantes. Ideal para coleccionistas.',
            price: '$35.00'*/
        },
        {
            image: 'img/product-9.jpg',
            name: 'Consulte presupuesto por impresion de diseños a medida',
            /*description: 'Diseño moderno y funcional para organizar tu escritorio.',
            price: '$20.00'*/
        }
        // Puedes añadir más productos aquí siguiendo el mismo formato
    ];

    function loadProducts() {
        if (!productGallery) return; // Asegurarse de que el elemento exista

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                </div>
            `;
            productGallery.appendChild(productCard);
        });
    }

    loadProducts(); // Carga los productos al iniciar la página

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