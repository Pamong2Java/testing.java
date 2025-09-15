// FIXED Navigation JavaScript - No More Glitches!

// Global variables
let currentPage = 'home';
let isNavigating = false;

// DOM elements
let navLinks, pages, mainNav, menuToggle, pageLoader;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeNavigation();
    initializeCanvas();
    initializeContent();
    
    // Set initial page
    setTimeout(() => {
        navigateToPage('home');
    }, 100);
});

// Initialize DOM elements
function initializeElements() {
    navLinks = document.querySelectorAll('.nav-link');
    pages = document.querySelectorAll('.page');
    mainNav = document.getElementById('mainNav');
    menuToggle = document.getElementById('menuToggle');
    pageLoader = document.getElementById('pageLoader');
}

// Initialize navigation system - FIXED
function initializeNavigation() {
    // Remove any existing event listeners first
    navLinks.forEach(link => {
        link.replaceWith(link.cloneNode(true));
    });
    
    // Re-get the new elements after cloning
    navLinks = document.querySelectorAll('.nav-link');
    
    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetPage = this.getAttribute('data-page');
            console.log('Navigation clicked:', targetPage);
            
            if (targetPage && targetPage !== currentPage && !isNavigating) {
                navigateToPage(targetPage);
            }
        });
        
        // Add touch support for mobile
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage && targetPage !== currentPage && !isNavigating) {
                navigateToPage(targetPage);
            }
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
}

// Main navigation function - COMPLETELY FIXED
function navigateToPage(targetPageId) {
    console.log('Navigating to:', targetPageId, 'Current:', currentPage, 'IsNavigating:', isNavigating);
    
    // Prevent multiple navigations
    if (isNavigating || targetPageId === currentPage) {
        console.log('Navigation blocked');
        return;
    }
    
    isNavigating = true;
    
    // Show loader
    showLoader();
    
    // Update navigation active states
    updateNavigation(targetPageId);
    
    // Hide current page
    hideCurrentPage();
    
    // Show target page after a short delay
    setTimeout(() => {
        showTargetPage(targetPageId);
        
        // Complete navigation
        setTimeout(() => {
            completeNavigation(targetPageId);
        }, 300);
    }, 100);
}

// Update navigation active states
function updateNavigation(targetPageId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === targetPageId) {
            link.classList.add('active');
        }
    });
}

// Hide current page
function hideCurrentPage() {
    pages.forEach(page => {
        page.classList.remove('active');
    });
}

// Show target page
function showTargetPage(targetPageId) {
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = targetPageId;
        
        // Handle body scroll
        if (targetPageId === 'home') {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Complete navigation
function completeNavigation(targetPageId) {
    hideLoader();
    isNavigating = false;
    console.log('Navigation completed to:', targetPageId);
    
    // Trigger any page-specific functions
    if (typeof triggerPageAnimations === 'function') {
        triggerPageAnimations(targetPageId);
    }
}

// Show/hide loader
function showLoader() {
    if (pageLoader) {
        pageLoader.classList.add('active');
    }
}

function hideLoader() {
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.remove('active');
        }, 200);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (mainNav) {
        mainNav.classList.toggle('active');
        
        // Animate menu toggle button
        if (menuToggle) {
            const isActive = mainNav.classList.contains('active');
            menuToggle.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
        }
    }
}

// Video data arrays (preserved from original)
const introVideos = [
    {
        tag: 'is',
        title: 'Introduction to Information Systems',
        src: 'https://www.youtube.com/embed/30-nGJ0uCAs'
    },
    {
        tag: 'is',
        title: 'Sistem Informasi - Konsep Dasar Sistem',
        src: 'https://www.youtube.com/embed/MhIH4HkXS24?si=ID6Ym6NmKKH2bjur'
    },
    {
        tag: 'is',
        title: 'Review Jurusan Sistem Informasi',
        src: 'https://www.youtube.com/embed/NL1VAu5ZCWw?si=DsswDn91m6LMHdev'
    },
    {
        tag: 'is',
        title: 'Belajar Sistem Informasi',
        src: 'https://www.youtube.com/embed/BeRkSU3sdW8?si=CmMb0E0nMe345FRd'
    },
    {
        tag: 'comp',
        title: 'Computer & Technology Basics',
        src: 'https://www.youtube.com/embed/y2kg3MOk1sY'
    },
    {
        tag: 'comp',
        title: 'Tutorial Belajar Komputer dari Nol',
        src: 'https://www.youtube.com/embed/rT31SRtdLsw?si=C_N2A_atz3GL7Lgm'
    },
    {
        tag: 'comp',
        title: 'Cara menghidupkan dan mematikan komputer yang benar dan aman',
        src: 'https://www.youtube.com/embed/0hC3IGYz0RY?si=u0W3t_W36uqzX7bz'
    },
    {
        tag: 'comp',
        title: 'Mengenal fungsi dan istilah penting dalam komputer',
        src: 'https://www.youtube.com/embed/8C1i62bsmSw?si=gaAEZAYTAdekYu5g'
    },
    {
        tag: 'comp',
        title: 'Perbedaan FILE, FOLDER dan APLIKASI',
        src: 'https://www.youtube.com/embed/Pj5-obUQL-s?si=gFRCVdo6x9WdIA4h'
    },
    {
        tag: 'net',
        title: 'Introduction to Networking | Network Fundamentals',
        src: 'https://www.youtube.com/embed/9SIjoeE93lo'
    },
    {
        tag: 'net',
        title: 'Networking Basics Full Course',
        src: 'https://www.youtube.com/embed/qiQR5rTSshw'
    },
    {
        tag: 'db',
        title: 'SQL and Databases - Full Course',
        src: 'https://www.youtube.com/embed/HXV3zeQKqGY'
    },
    {
        tag: 'db',
        title: 'SQL Tutorial for Beginners',
        src: 'https://www.youtube.com/embed/7S_tz1z_5bA'
    },
    {
        tag: 'is',
        title: 'Episode Pengantar Sistem dan Teknologi Informasi - GuruVirtual.ID',
        src: 'https://www.youtube.com/embed/vz3F71GmIf0'
    },
    {
        tag: 'is',
        title: 'Bedah Buku Wawasan Ilmu "Pengantar Sistem Informasi"',
        src: 'https://www.youtube.com/embed/ti6K9RxBRoc'
    },
    {
        tag: 'is',
        title: 'Pengantar Sistem Informasi - Komponen Sistem Informasi',
        src: 'https://www.youtube.com/embed/eaiQ6k5QfYQ'
    },
    {
        tag: 'is',
        title: 'Sistem Informasi UT Semester 1',
        src: 'https://www.youtube.com/embed/o6rwhe6tFNU'
    },
    {
        tag: 'is',
        title: 'Pengembangan Sistem Informasi - Konsep Sistem Informasi (Part 1)',
        src: 'https://www.youtube.com/embed/yVgezl_RzKo'
    },
    {
        tag: 'comp',
        title: 'PENGENALAN DASAR KOMPUTER',
        src: 'https://www.youtube.com/embed/6Ju0RDgGzTA'
    },
    {
        tag: 'comp',
        title: 'Pengenalan Komponen Komputer untuk Pemula',
        src: 'https://www.youtube.com/embed/7VUYlXljyb4'
    },
    {
        tag: 'comp',
        title: 'Pengantar Organisasi Komputer',
        src: 'https://www.youtube.com/embed/BDgXXHuOQBg'
    },
    {
        tag: 'comp',
        title: 'Belajar Komputer Dari Dasar Part 4',
        src: 'https://www.youtube.com/embed/lj5Qz1f3TYY'
    },
    {
        tag: 'comp',
        title: 'Belajar Komputer Mulai dari Dasar',
        src: 'https://www.youtube.com/embed/39d41Yv6dUE'
    },
    {
        tag: 'net',
        title: 'CISCO Packet Tracer – Belajar Jaringan Komputer Dasar',
        src: 'https://www.youtube.com/embed/CAWjdVqXd1I'
    },
    {
        tag: 'net',
        title: 'EP#1 – Pengenalan Jaringan – Tutorial CCNA Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/gMZr2wio0hw'
    },
    {
        tag: 'net',
        title: 'Materi Cisco Introduction to Network Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/8f_YdbzW-PQ'
    },
    {
        tag: 'net',
        title: 'Mengenal Router pada Jaringan Komputer',
        src: 'https://www.youtube.com/embed/PP_hmimimxI'
    },
    {
        tag: 'net',
        title: 'Jaringan Komputer dan Internet – Informatika XI',
        src: 'https://www.youtube.com/embed/6fLRumfmNlI'
    },
    {
        tag: 'db',
        title: 'Tutorial Dasar Belajar DATABASE Untuk Pemula Dari 0',
        src: 'https://www.youtube.com/embed/X94JAwDfNvA'
    },
    {
        tag: 'db',
        title: 'Belajar Basis Data untuk Pemula (MySQL) – Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/S4igMZFCvh8'
    },
    {
        tag: 'db',
        title: 'Tutorial PostgreSQL Database (Bahasa Indonesia)',
        src: 'https://www.youtube.com/embed/iEeveYoD0SA'
    },
    {
        tag: 'db',
        title: 'MySQL untuk Pemula – Materi Pembahasan Part 1',
        src: 'https://www.youtube.com/embed/DK0IyHnwIM0'
    },
    {
        tag: 'db',
        title: 'Full Tutorial PostgreSQL Dan Database – Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/EAr5GvF7-dw'
    }
];

const advanceVideos = [
    {
        tag: 'sa',
        title: 'System Analysis & Design Full Lecture',
        src: 'https://www.youtube.com/embed/X898qHM2uP0'
    },
    {
        tag: 'sec',
        title: 'Cyber Security Full Course',
        src: 'https://www.youtube.com/embed/6XCuMC0CVYI'
    },
    {
        tag: 'dm',
        title: 'Data Science & BI Introduction',
        src: 'https://www.youtube.com/embed/ua-CiDNNj30'
    },
    {
        tag: 'sa',
        title: 'Belajar Sistem Informasi | Mengenal Data Flow Diagram (DFD)',
        src: 'https://www.youtube.com/embed/EfSvOhw0JPc'
    },
    {
        tag: 'sa',
        title: 'Data Flow Diagram Level 0 – Analisis dan Desain Sistem',
        src: 'https://www.youtube.com/embed/G4mtJqK50Co'
    },
    {
        tag: 'sa',
        title: 'Context Diagram – Pengertian, Fungsi, Contoh',
        src: 'https://www.youtube.com/embed/22x2pL4peuI'
    },
    {
        tag: 'sa',
        title: 'Membuat DFD Level 0 & Level 1 – Aplikasi Data Barang',
        src: 'https://www.youtube.com/embed/2kscVhlywzs'
    },
    {
        tag: 'sec',
        title: 'Yuk Mengenal Apa Itu Keamanan Siber',
        src: 'https://www.youtube.com/embed/IvBfxSJWx6A'
    },
    {
        tag: 'sec',
        title: 'Alur Belajar Keamanan Siber Pemula',
        src: 'https://www.youtube.com/embed/-oNFGMPg_fE'
    },
    {
        tag: 'sec',
        title: 'Belajar Cyber Security Untuk Pemula',
        src: 'https://www.youtube.com/embed/Eh-CNozQBjg'
    },
    {
        tag: 'sec',
        title: 'KUNCI UTAMA BELAJAR CYBERSECURITY',
        src: 'https://www.youtube.com/embed/Hhv6dhm6VDQ'
    },
    {
        tag: 'dm',
        title: 'Apa Itu Data Mining?',
        src: 'https://www.youtube.com/embed/5DMxeR9KRyU'
    },
    {
        tag: 'dm',
        title: 'Konsep, Proses dan Contoh Nyata Data Mining dan Big Data',
        src: 'https://www.youtube.com/embed/h82NuHDNhKI'
    },
    {
        tag: 'dm',
        title: 'Pengantar Mata Kuliah Data Mining Untuk Pemula',
        src: 'https://www.youtube.com/embed/e8ZbDI6z9v0'
    },
    {
        tag: 'dm',
        title: 'Tutorial Orange Data Mining – Pengenalan Tools',
        src: 'https://www.youtube.com/embed/cElmNyHCdIo'
    },
    {
        tag: 'sec',
        title: 'Apa itu Phising? Ketahui Pengertian, Teknik dan Bahayanya',
        src: 'https://www.youtube.com/embed/UygZfswZgRE?si=rZcXhDUwvtIR0CA-'
    },
    {
        tag: 'sa',
        title: 'Belajar Use Case Diagram | Belajar UML & Perancangan Sistem',
        src: 'https://www.youtube.com/embed/cgV0BFmAg_Y'
    },
    {
        tag: 'sa',
        title: 'Penjelasan Use Case Diagram dan Activity Diagram',
        src: 'https://www.youtube.com/embed/qpic2jILpVY'
    },
    {
        tag: 'sec',
        title: 'Phishing 101 – Jangan Jadi Korban Belajar Mengenali dan Menghindari Serangan Phishing',
        src: 'https://www.youtube.com/embed/o0jVexIDm84'
    },
    {
        tag: 'sec',
        title: '4 Cara Menghindari Dan Melindungi Diri Dari Phishing',
        src: 'https://www.youtube.com/embed/uI8GzsBk_34'
    },
    {
        tag: 'dm',
        title: 'Belajar Machine Learning Dari Awal Buat Yang Ga Jago Matematika',
        src: 'https://www.youtube.com/embed/WH1SduDRL_Y'
    },
    {
        tag: 'dm',
        title: 'SKLearn 01 | Belajar Machine Learning Dasar',
        src: 'https://www.youtube.com/embed/vqgucRK5K1A'
    },
    {
        tag: 'dm',
        title: 'Memahami Machine Learning (konsep dasar)',
        src: 'https://www.youtube.com/embed/6IMezgTJKCg'
    },
    {
        tag: 'dm',
        title: 'Dicoding Developer Coaching #85 : Machine Learning (Pengantar)',
        src: 'https://www.youtube.com/embed/-cUcbTF4emY'
    },
    {
        tag: 'es',
        title: 'Konsep Dasar Enterprise System (ES)',
        src: 'https://www.youtube.com/embed/6j-hwUlEvDo'
    },
    {
        tag: 'es',
        title: 'Enterprise Systems: Enterprise Resource Planning',
        src: 'https://www.youtube.com/embed/5npzUbDZqUY'
    },
    {
        tag: 'es',
        title: 'Sistem & Rekayasa ERP | Part 1 | Enterprise Resource Planning',
        src: 'https://www.youtube.com/embed/X945w0CnndQ'
    },
    {
        tag: 'es',
        title: 'Mengenal Sistem ERP | Jazzy Arminta',
        src: 'https://www.youtube.com/embed/u9k-BMoUdt0'
    }
];

const programmingVideos = [
    {
        tag: 'py',
        title: 'Learn Python - Full Course',
        src: 'https://www.youtube.com/embed/rfscVS0vtbw'
    },
    {
        tag: 'py',
        title: 'Python for Beginners - Full Course',
        src: 'https://www.youtube.com/embed/eWRfhZUzrAc'
    },
    {
        tag: 'py',
        title: 'Python Crash Course',
        src: 'https://www.youtube.com/embed/kqtD5dpn9C8'
    },
    {
        tag: 'js',
        title: 'JavaScript Full Course (Beginner to Advanced)',
        src: 'https://www.youtube.com/embed/PkZNo7MFNFg'
    },
    {
        tag: 'php',
        title: 'PHP Full Course 2025',
        src: 'https://www.youtube.com/embed/VGBWm6xtPWs'
    },
    {
        tag: 'php',
        title: 'PHP & MySQL Crash Course',
        src: 'https://www.youtube.com/embed/Ak6VTSekGP4'
    },
    {
        tag: 'py',
        title: 'Belajar Python dari nol untuk pemula (Tutorial 2025)',
        src: 'https://www.youtube.com/embed/DQfvftz-fEI'
    },
    {
        tag: 'py',
        title: 'Sesi 1: Belajar Python | Praktek Dasar',
        src: 'https://www.youtube.com/embed/n0tURC_xeyI'
    },
    {
        tag: 'py',
        title: 'Tutorial Belajar Bikin Website Pake PYTHON Untuk Pemula Dari 0',
        src: 'https://www.youtube.com/embed/aJ_wqpXDW6k'
    },
    {
        tag: 'py',
        title: 'Belajar Python [Dasar] – 03 Perintah Dasar (Jagat Koding)',
        src: 'https://www.youtube.com/embed/czIMILARU7w'
    },
    {
        tag: 'js',
        title: 'Tutorial JavaScript Dasar Bahasa Indonesia (8 jam lengkap)',
        src: 'https://www.youtube.com/embed/SDROba_M42g'
    },
    {
        tag: 'js',
        title: 'TUTORIAL JAVASCRIPT | Sesi Pertama | Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/Z7mXO2yOzHA'
    },
    {
        tag: 'php',
        title: 'Belajar Web Dengan PHP & Database Untuk Pemula Dari Nol',
        src: 'https://www.youtube.com/embed/Ak6VTSekGP4'
    },
    {
        tag: 'php',
        title: 'TUTORIAL PHP TERLENGKAP UNTUK PEMULA',
        src: 'https://www.youtube.com/embed/IkD2y4ubFdw'
    },
    {
        tag: 'php',
        title: 'TUTORIAL PHP DASAR Bahasa Indonesia',
        src: 'https://www.youtube.com/embed/TaBWhb5SPfc'
    }
];

const recommended = [
    {
        title: 'Apa itu Phising? Ketahui Pengertian, Teknik dan Bahayanya',
        src: 'https://www.youtube.com/embed/UygZfswZgRE?si=rZcXhDUwvtIR0CA-'
    },
    {
        title: 'Apa itu Sistem Informasi? (Short Intro)',
        src: 'https://www.youtube.com/embed/dLfpZtIacbc'
    },
    {
        title: 'Computer & Technology Basics Course',
        src: 'https://www.youtube.com/embed/y2kg3MOk1sY'
    },
    {
        title: 'Cisco Packet Tracer Full Course (Intro to Networks)',
        src: 'https://www.youtube.com/embed/ty0HMs48U1k'
    },
    {
        title: 'SQL Tutorial – Full Database Course for Beginners',
        src: 'https://www.youtube.com/embed/HXV3zeQKqGY'
    },
    {
        title: 'Learn Python – Full Course for Beginners',
        src: 'https://www.youtube.com/embed/rfscVS0vtbw'
    },
    {
        title: 'Java Full Course for Beginners',
        src: 'https://www.youtube.com/embed/eIrMbAQSU34'
    },
    {
        title: 'PHP Full Course – Beginner to Advanced',
        src: 'https://www.youtube.com/embed/VGBWm6xtPWs'
    },
    {
        title: 'Cyber Security Fundamentals',
        src: 'https://www.youtube.com/embed/6XCuMC0CVYI'
    },
    {
        title: 'Data Science & BI Introduction',
        src: 'https://www.youtube.com/embed/ua-CiDNNj30'
    }
];

// Utility functions
function getYoutubeId(url) {
    const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^?&"'>]+)/);
    return match ? match[1] : null;
}

function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
}

// Enhanced card creation
function mkCard(item) {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.tag = item.tag || '';

    const vid = getYoutubeId(item.src);
    const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : '';

    el.innerHTML = `
        <div class="meta">
            <div class="title">${escapeHtml(item.title || 'Video')}</div>
            <div style="font-size:0.85rem;color:#bff6ff">YouTube</div>
        </div>
        <div class="desc">${escapeHtml(item.desc || '')}</div>
        <div class="video-thumb" style="position:relative;cursor:pointer;margin-top:8px;height:180px;overflow:hidden;border-radius:10px">
            <img src="${thumb}" alt="Thumbnail" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.3s ease">
            <div class="play-button" style="
                position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                background:rgba(0,0,0,0.7);border-radius:50%;width:60px;height:60px;
                display:flex;align-items:center;justify-content:center;
                transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter:blur(5px);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     fill="#fff" width="36px" height="36px"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
    `;

    const thumbDiv = el.querySelector('.video-thumb');
    const playButton = el.querySelector('.play-button');
    const img = thumbDiv.querySelector('img');

    // Enhanced hover effects
    thumbDiv.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        playButton.style.background = 'rgba(0, 180, 216, 0.8)';
    });

    thumbDiv.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        playButton.style.background = 'rgba(0,0,0,0.7)';
    });

    // Enhanced click animation
    thumbDiv.addEventListener('click', () => {
        // Add loading animation
        playButton.innerHTML = '<div style="width:30px;height:30px;border:2px solid #fff;border-top:2px solid transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>';
        
        // Load iframe with delay for smooth transition
        setTimeout(() => {
            thumbDiv.innerHTML = `
                <iframe src="${item.src}" frameborder="0" allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style="width:100%;height:180px;border-radius:10px;border:0;display:block;opacity:0;transition:opacity 0.3s ease"></iframe>
            `;
            
            // Fade in iframe
            setTimeout(() => {
                const iframe = thumbDiv.querySelector('iframe');
                if (iframe) iframe.style.opacity = '1';
            }, 100);
        }, 500);
    });

    return el;
}

// Fill grid function
function fillGrid(gridId, list) {
    const g = document.getElementById(gridId);
    if (!g) return;
    g.innerHTML = '';
    
    list.forEach((item) => {
        const card = mkCard(item);
        g.appendChild(card);
    });
}

// Initialize content
function initializeContent() {
    fillGrid('grid-intro', introVideos);
    fillGrid('grid-advance', advanceVideos);
    fillGrid('grid-programming', programmingVideos);
    fillGrid('grid-videos', recommended);
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize contact form
    initializeContactForm();
}

// Initialize search functionality
function initializeSearch() {
    const searchIntro = document.getElementById('searchIntro');
    const searchAdvance = document.getElementById('searchAdvance');
    const searchProg = document.getElementById('searchProg');
    
    if (searchIntro) {
        searchIntro.addEventListener('input', (e) => {
            performSearch(e.target.value, '#grid-intro .card');
        });
    }
    
    if (searchAdvance) {
        searchAdvance.addEventListener('input', (e) => {
            performSearch(e.target.value, '#grid-advance .card');
        });
    }
    
    if (searchProg) {
        searchProg.addEventListener('input', (e) => {
            performSearch(e.target.value, '#grid-programming .card');
        });
    }
}

function performSearch(query, selector) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll(selector).forEach((card) => {
        const title = card.querySelector('.title');
        if (title) {
            const shouldShow = title.textContent.toLowerCase().includes(q);
            card.style.display = shouldShow ? '' : 'none';
        }
    });
}

// Filter function - FIXED
function filterGrid(pageKey, filter, chipEl) {
    const parent = chipEl?.parentNode;
    if (parent) {
        Array.from(parent.children).forEach(c => c.classList.remove('active'));
        chipEl.classList.add('active');
    }
    
    const map = { 'intro': 'grid-intro', 'advance': 'grid-advance', 'programming': 'grid-programming' };
    const gridId = map[pageKey];
    if (!gridId) return;
    
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const cards = Array.from(grid.children);
    
    cards.forEach((card) => {
        const tag = (card.dataset.tag || '').toLowerCase();
        const shouldShow = filter === 'all' || tag.includes(filter);
        card.style.display = shouldShow ? '' : 'none';
    });
}

// Initialize contact form
function initializeContactForm() {
    const sendButton = document.getElementById('sendContact');
    const emailToggle = document.getElementById('emailOptionToggle');
    const emailOptions = document.getElementById('emailOptions');
    const cnameInput = document.getElementById('cname');
    
    if (sendButton) {
        sendButton.addEventListener('click', handleContactSubmit);
    }
    
    if (emailToggle && emailOptions) {
        emailToggle.addEventListener('click', () => {
            emailOptions.classList.toggle('active');
        });
        
        emailOptions.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                selectEmailOption(e.target.dataset.option);
                emailOptions.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!emailToggle.contains(e.target) && !emailOptions.contains(e.target)) {
                emailOptions.classList.remove('active');
            }
        });
    }
    
    // Initialize email option
    selectEmailOption('email');
}

function handleContactSubmit() {
    const cname = document.getElementById('cname');
    const cmsg = document.getElementById('cmsg');
    
    if (!cname || !cmsg) return;
    
    const name = cname.value.trim();
    const msg = cmsg.value.trim();
    let valid = true;

    // Remove existing error states
    cname.classList.remove("error-shake");
    cmsg.classList.remove("error-shake");

    if (!cname.disabled && !name) {
        cname.classList.add("error-shake");
        valid = false;
    }
    if (!msg) {
        cmsg.classList.add("error-shake");
        valid = false;
    }

    if (!valid && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    if (valid) {
        showPopup('Berhasil Terkirim', 'success');
        cname.value = '';
        cmsg.value = '';
        selectEmailOption('email');
    } else {
        showPopup('Lengkapi email & pesan', 'error');
    }

    setTimeout(() => {
        cname.classList.remove("error-shake");
        cmsg.classList.remove("error-shake");
    }, 500);
}

function selectEmailOption(option) {
    const cnameInput = document.getElementById('cname');
    if (!cnameInput) return;
    
    if (option === 'anonymous') {
        cnameInput.value = 'Anonim';
        cnameInput.disabled = true;
    } else {
        cnameInput.value = '';
        cnameInput.disabled = false;
        cnameInput.placeholder = 'Masukkan email Anda';
    }
}

// Enhanced popup system
function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.className = 'contact-popup ' + (type === 'success' ? 'success' : 'error');
    popup.textContent = message;
    document.body.appendChild(popup);

    // Show with animation
    requestAnimationFrame(() => {
        popup.classList.add('show');
    });

    // Hide with animation
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Initialize Canvas Background
function initializeCanvas() {
    const canvas = document.getElementById('techBgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 1
        });
    }

    let animationId;

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(0,180,216,0.8)';
        
        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particleCount; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.strokeStyle = 'rgba(0,180,216,' + (1 - dist / 120) * 0.4 + ')';
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(draw);
    }

    // Start animation
    draw();

    // Handle resize
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    // Pause animation when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
        // Close email options
        const emailOptions = document.getElementById('emailOptions');
        if (emailOptions && emailOptions.classList.contains('active')) {
            emailOptions.classList.remove('active');
        }
    }
});

// Global functions for HTML onclick events
window.navigateToPage = navigateToPage;
window.filterGrid = filterGrid;

// Ensure proper initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeElements);
} else {
    initializeElements();
}
