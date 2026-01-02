document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTEURS ---
    const hamburger = document.querySelector('.menu-hamburger');
    const navMenu = document.querySelector('.menu-nav');
    const navLinks = document.querySelectorAll('.lien-nav');
    const navbar = document.querySelector('.barre-nav');
    const contactForm = document.getElementById('contactForm');
    const toggleLangBtn = document.getElementById('toggleLang');

    // --- MENU MOBILE ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- EFFET NAVBAR SCROLL ---
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- ANIMATIONS AU DÉFILEMENT ---
    const animatedElements = document.querySelectorAll(
        '.contenu-accueil, .texte-a-propos, .carte-competence, .carte-projet, .formulaire-contact, .nombre-stat'
    );
    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 100);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

    animatedElements.forEach(el => {
        el.classList.add('fade-up-init');
        fadeObserver.observe(el);
    });

    // --- COMPTEURS ---
    const statNumbers = document.querySelectorAll('.nombre-stat');
    const animateCounter = el => {
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / (2000 / 16);
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 400);

        const timer = setInterval(() => {
            current += increment;
            el.textContent = current >= target ? `${target}+` : `${Math.floor(current)}+`;
            if (current >= target) clearInterval(timer);
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // --- SCROLL FLUIDE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });

    // --- FORMULAIRE CONTACT ---
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) return alert('⚠️ Veuillez remplir tous les champs requis.');

        contactForm.classList.add('form-sent');
        setTimeout(() => {
            alert(`✅ Merci ${name} ! Votre message a bien été envoyé.`);
            contactForm.reset();
            contactForm.classList.remove('form-sent');
        }, 800);
    });

    // --- LANGUE EN/FR ---
    let currentLang = 'fr';
    const translations = [
        // NAV
        { selector: 'a[href="#accueil"]', fr: 'Accueil', en: 'Home' },
        { selector: 'a[href="#apropos"]', fr: 'À propos', en: 'About' },
        { selector: 'a[href="#competences"]', fr: 'Compétences', en: 'Skills' },
        { selector: 'a[href="#projets"]', fr: 'Projets', en: 'Projects' },
        { selector: 'a[href="#contact"]', fr: 'Contact', en: 'Contact' },

        // ACCUEIL
        { selector: '.titre-accueil', fr: 'Salut, moi c’est ', en: 'Hi, I am ' },
        { selector: '.sous-titre-accueil', fr: 'Passion pour la tech, le gaming et la gestion des réseaux sociaux.', en: 'Passionate about tech, gaming, and social media management.' },
        { selector: '.bouton-principal[href="#projets"]', fr: 'En savoirs plus', en: 'Learn More' },
        { selector: '.bouton-secondaire[href="#contact"]', fr: 'Me contacter', en: 'Contact Me' },

        // À PROPOS
        { selector: '#apropos .section-title', fr: 'À propos de moi', en: 'About Me' },
        { selector: '.texte-a-propos p:first-of-type', fr: "Je suis passionné par la technologie, la robotique et le développement logiciel.\nJ’aime transformer des idées innovantes en projets concrets, tels que la construction de robots, la création de Chatbots et le développement d’applications, tout en combinant créativité et expertise digitale.\nJe m’intéresse également aux jeux vidéo et à la gestion des réseaux sociaux, pour créer des expériences interactives et connectées.", en: "I am passionate about technology, robotics, and software development. I enjoy turning innovative ideas into real projects, such as building robots, creating chatbots, and developing applications, combining creativity and digital expertise. I am also interested in video games and social media management to create interactive and connected experiences." },
        { selector: '.texte-a-propos p b', fr: 'Mon objectif :', en: 'My Goal:' },
        { selector: '.texte-a-propos p:last-of-type', fr: 'Concevoir des solutions élégantes, robustes et fonctionnelles - que ce soit pour le web, les applications mobiles, les projets robotiques et objets connectés, tout en gérant efficacement la communication sur les réseaux sociaux.', en: 'Design elegant, robust, and functional solutions – for web, mobile apps, robotics, and IoT projects, while managing social media effectively.' },

        // STATS
        { selector: '.etiquette-stat:nth-of-type(1)', fr: 'Années d’expérience', en: 'Years of Experience' },
        { selector: '.etiquette-stat:nth-of-type(2)', fr: 'Projets livrés', en: 'Projects Delivered' },
        { selector: '.etiquette-stat:nth-of-type(3)', fr: 'Clients satisfaits', en: 'Happy Clients' },

        // COMPÉTENCES
        { selector: '#competences .section-title', fr: 'Mes compétences', en: 'My Skills' },
        { selector: '.carte-competence:nth-of-type(1) .titre-competence', fr: 'Développement Front-end', en: 'Front-end Development' },
        { selector: '.carte-competence:nth-of-type(2) .titre-competence', fr: 'Développement Back-end', en: 'Back-end Development' },
        { selector: '.carte-competence:nth-of-type(3) .titre-competence', fr: 'Conception d’applications de contrôle, création de chatbots et réalisation de robots.', en: 'Control app design, chatbot creation, and robotics projects.' },
        { selector: '.carte-competence:nth-of-type(4) .titre-competence', fr: 'Cloud et IA', en: 'Cloud & AI' },
        { selector: '.carte-competence:nth-of-type(5) .titre-competence', fr: 'Gestion des Réseaux Sociaux', en: 'Social Media Management' },

        // PROJETS
        { selector: '#projets .section-title', fr: 'Projets récents', en: 'Recent Projects' },
        { selector: '.carte-projet:nth-of-type(1) .project-title', fr: "Site Vitrine d'EMIAPROC - IUT de DOUALA", en: "Showcase Website of EMIAPROC - IUT of DOUALA" },
        { selector: '.carte-projet:nth-of-type(1) .project-description', fr: "Un site personnel moderne avec animations, transitions et responsive design pour le club robotique de l'IUT de DOUALA.", en: "A modern personal site and responsive design for the IUT of DOUALA Robotics Club." },
        { selector: '.carte-projet:nth-of-type(2) .project-title', fr: "Application IoT", en: "IoT Application" },
        { selector: '.carte-projet:nth-of-type(2) .project-description', fr: "Contrôle et visualisation de capteurs à distance via une plateforme web.", en: "Remote sensor control and visualization via a web platform." },
        { selector: '.carte-projet:nth-of-type(3) .project-title', fr: "Site e-commerce - Ebooks", en: "E-commerce Website - Ebooks" },
        { selector: '.carte-projet:nth-of-type(3) .project-description', fr: "Site de vente en ligne avec gestion des produits, panier et paiement sécurisé.", en: "Online store with product management, cart, and secure payment." },

        // CONTACT
        { selector: '#contact .section-title', fr: 'Me contacter', en: 'Contact Me' },
        { selector: '.info-contact h3', fr: 'Discutons ensemble', en: "Let's talk" },
        { selector: '.info-contact p:first-of-type', fr: 'Vous avez un projet ou une collaboration en tête ? Laissez-moi un message, et je reviendrai vers vous rapidement.', en: 'Have a project or collaboration in mind? Leave me a message, and I will get back to you quickly.' },
        { selector: '.details-contact p:nth-of-type(1)', fr: 'Email : aubinp58@gmail.com', en: 'Email: aubinp58@gmail.com' },
        { selector: '.details-contact p:nth-of-type(2)', fr: 'Téléphone : +237 696865577', en: 'Phone: +237 696865577' },
        { selector: '.details-contact p:nth-of-type(3)', fr: 'Localisation : Douala, Cameroun', en: 'Location: Douala, Cameroon' },
        { selector: '.details-contact p:nth-of-type(4)', fr: 'Linkedin : Aubin Mabom Pierre Style', en: 'LinkedIn: Aubin Mabom Pierre Style' },

        // FOOTER
        { selector: '.pied-page p', fr: 'Code avec passion et determination.', en: 'Coding with passion and determination.' }
    ];

    const changeLanguage = lang => {
        translations.forEach(item => {
            const el = document.querySelector(item.selector);
            if (!el) return;
            if(item.selector === '.titre-accueil'){
                const span = el.querySelector('.surligne');
                if(span) el.firstChild.textContent = lang === 'fr' ? item.fr : item.en;
            } else {
                el.textContent = lang === 'fr' ? item.fr : item.en;
            }
        });
    };

    toggleLangBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        toggleLangBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        changeLanguage(currentLang);
    });
});
