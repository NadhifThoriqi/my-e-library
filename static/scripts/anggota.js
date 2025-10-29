// anggota.js (Perbaikan Klik Tombol Bahasa)

// Inisialisasi LanguageManager. Asumsi Class sudah ada di global window dari language.js
const languageManager = new LanguageManager('/api/data/language/', 'id');

// Fungsi utama untuk memulai aplikasi setelah loading bahasa
async function startApplication() {
    try {
        await languageManager.loadTranslations();
    } catch (error) {
        console.warn("Continuing initialization with default language.");
    }
    initializeApp();
}

// --------------------------------------------------------
// BAGIAN 2: INISIALISASI APLIKASI
// --------------------------------------------------------

function initializeApp() {
    
    document.addEventListener('DOMContentLoaded', () => {
        
        // --- 1. Definisi Elemen DOM ---
        const langOptions = document.querySelectorAll('.lang-option');
        const navLinks = document.querySelectorAll('.main-nav a');
        const statCards = document.querySelectorAll('.stats-cards .card');
        const categoryButtons = document.querySelectorAll('.category-filter button');
        
        // Terapkan bahasa default setelah DOM siap
        languageManager.updateLanguage(languageManager.getCurrentLang()); 
        
        // ---------------------------------------------------
        // 2. Fungsionalitas Ganti Bahasa (LOGIKA PERBAIKAN DI SINI)
        // ---------------------------------------------------

        langOptions.forEach(opt => {
            
            // Dapatkan bahasa saat ini SETELAH updateLanguage pertama
            let currentLang = languageManager.getCurrentLang();
            
            // *Perbaikan 1: Pemasangan kelas aktif saat inisialisasi*
            if (opt.dataset.lang === currentLang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }

            // Event Listener: Klik Tombol Bahasa (Listener harus terpasang di semua opsi)
            opt.addEventListener('click', () => {
                const newLang = opt.dataset.lang;
                currentLang = languageManager.getCurrentLang(); // Ambil status terbaru
                
                if (newLang && newLang !== currentLang) {
                    
                    // 1. Update Tampilan Tombol
                    langOptions.forEach(o => o.classList.remove('active'));
                    opt.classList.add('active');
                    
                    // 2. Perbarui Semua Teks
                    languageManager.updateLanguage(newLang); 
                }
            });
        });

        // ---------------------------------------------------
        // 3. Fungsionalitas Lain
        // ---------------------------------------------------

        // Navigasi
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(n => n.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Hover Card
        statCards.forEach(card => {
            card.addEventListener('mouseover', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseout', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
            });
        });

        // Logika Filter Kategori (hanya di search.html)
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });
}

// Mulai aplikasi
startApplication();