document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // NAVBAR: OCULTAR AL BAJAR / MOSTRAR AL SUBIR
    // ==========================================================

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let lastScrollTop = 0;
        let ticking = false;

        const controlarNavbar = () => {
            const scrollTop = Math.max(
                window.scrollY || document.documentElement.scrollTop,
                0
            );

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('ocultar');
            } else {
                navbar.classList.remove('ocultar');
            }

            lastScrollTop = scrollTop;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(controlarNavbar);
                ticking = true;
            }
        }, { passive: true });
    }


    // ==========================================================
    // MODAL DE IMÁGENES
    // ==========================================================

    let modal = document.querySelector('#modal-imagen');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-imagen';

        modal.innerHTML = `
            <div class="modal-contenido">
                <button class="modal-cerrar" aria-label="Cerrar imagen">&times;</button>
                <img src="" alt="Imagen ampliada">
            </div>
        `;

        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('img');
    const botonCerrar = modal.querySelector('.modal-cerrar');

    window.abrirImagen = function (src) {
        if (!src || !modalImg) return;

        modalImg.src = src;
        modal.classList.add('activo');
        document.body.classList.add('modal-abierto');
    };

    function cerrarModal() {
        modal.classList.remove('activo');
        document.body.classList.remove('modal-abierto');

        setTimeout(() => {
            if (!modal.classList.contains('activo')) {
                modalImg.src = '';
            }
        }, 200);
    }

    if (botonCerrar) {
        botonCerrar.addEventListener('click', cerrarModal);
    }

    modal.addEventListener('click', (e) => {
        if (
            e.target === modal ||
            e.target.classList.contains('modal-contenido')
        ) {
            cerrarModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('activo')) {
            cerrarModal();
        }
    });


    // ==========================================================
    // MENÚ HAMBURGUESA
    // ==========================================================

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar ul');

    if (menuToggle && navMenu) {

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();

            const abierto = navMenu.classList.toggle('activo');

            menuToggle.classList.toggle('activo', abierto);

            menuToggle.setAttribute(
                'aria-expanded',
                abierto ? 'true' : 'false'
            );
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('activo');
                menuToggle.classList.remove('activo');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (
                navMenu.classList.contains('activo') &&
                !e.target.closest('.navbar')
            ) {
                navMenu.classList.remove('activo');
                menuToggle.classList.remove('activo');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('activo');
                menuToggle.classList.remove('activo');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

});