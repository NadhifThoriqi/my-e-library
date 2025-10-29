// ==========================
// language.js
// ==========================

// Struktur data terjemahan
let translations = new Map();

// State aplikasi (bahasa saat ini)
let currentState = {
    lang: 'id'
};

// Ambil data bahasa dari API
fetch('/api/data/language')
  .then(response => response.json())
  .then(data => {
    translations = new Map(Object.entries(data));
    console.log("Translations loaded:", translations);
    updateLanguage(currentState.lang);
  })
  .catch(err => {
    console.error("Gagal memuat translations.json:", err);
  });

/**
 * Memperbarui semua elemen teks di UI berdasarkan bahasa yang dipilih.
 * @param {string} lang - Kode bahasa ('id' atau 'en').
 */
function updateLanguage(lang) {
    if (!translations.size) return;

    const translationData = translations.get(lang);
    if (!translationData) return;

    // Perbarui teks berdasarkan data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        if (translationData[key]) {
            element.textContent = translationData[key];
        }
    });

    // Perbarui teks status di tabel
    document.querySelectorAll('[data-status-key]').forEach(element => {
        const key = element.dataset.statusKey;
        if (translationData[key]) {
            element.textContent = translationData[key];
        }
    });

    // Perbarui teks status anggota
    document.querySelectorAll('[data-member-status-key]').forEach(element => {
        const key = element.dataset.memberStatusKey;
        if (translationData[key]) {
            element.textContent = translationData[key];
        }
    });

    // Perbarui teks status placeholder
    document.querySelectorAll('[data-key-placeholder]').forEach(element => {
        const key = element.dataset.keyPlaceholder;
        if (translationData[key]) {
            element.placeholder = translationData[key];
        }
    });

    // Update tombol bahasa aktif
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    currentState.lang = lang;
    console.log(`Bahasa diubah menjadi: ${lang.toUpperCase()}`);
}

// Event listener untuk tombol ganti bahasa
document.addEventListener('DOMContentLoaded', () => {
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const newLang = option.dataset.lang;
            if (newLang !== currentState.lang) {
                updateLanguage(newLang);
            }
        });
    });
});
