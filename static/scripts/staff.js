// staff.js (Versi Paling Aman untuk Mengatasi Masalah Timing dan Klik)

document.addEventListener('DOMContentLoaded', () => {
    // --- Definisi Elemen DOM ---
    const langOptions = document.querySelectorAll('.lang-option');
    const navLinks = document.querySelectorAll('.main-nav a');
    const statCards = document.querySelectorAll('.stats-cards .card');
    const returnButtons = document.querySelectorAll('.btn-return');
    const actionIcons = document.querySelectorAll('.action-buttons i');
    
    // Modal Tambah Buku
    const addBookModal = document.getElementById('addBookModal');
    const openAddBookModalBtn = document.getElementById('openAddBookModal'); 
    const closeAddBookModalBtn = document.getElementById('closeAddBookModal');
    const cancelAddBookBtn = document.getElementById('cancelAddBook');

    // Modal Pinjam Buku
    const borrowBookModal = document.getElementById('borrowBookModal');
    const openBorrowBookModalBtn = document.getElementById('openBorrowBookModal'); 
    const closeBorrowBookModalBtn = document.getElementById('closeBorrowBookModal');
    const cancelBorrowBookBtn = document.getElementById('cancelBorrowBook');

    // ---------------------------------------------------
    // 3. Kontrol Modal Tambah Buku (Membuat Pop-up bisa diklik)
    // ---------------------------------------------------

    function closeAddBookModal() { if (addBookModal) addBookModal.classList.add('hidden'); }
    
    // Listener tombol Tambah Buku
    if (openAddBookModalBtn) openAddBookModalBtn.addEventListener('click', (e) => { 
        e.preventDefault(); 
        if (addBookModal) addBookModal.classList.remove('hidden'); 
    }); 
    if (closeAddBookModalBtn) closeAddBookModalBtn.addEventListener('click', closeAddBookModal);
    if (cancelAddBookBtn) cancelAddBookBtn.addEventListener('click', closeAddBookModal);
    if (addBookModal) addBookModal.addEventListener('click', (e) => { if (e.target === addBookModal) closeAddBookModal(); });


    // ---------------------------------------------------
    // 4. Kontrol Modal Pinjam Buku (Membuat Pop-up bisa diklik)
    // ---------------------------------------------------

    function closeBorrowBookModal() { if (borrowBookModal) borrowBookModal.classList.add('hidden'); }
    
    // Listener tombol Pinjam Buku
    if (openBorrowBookModalBtn) openBorrowBookModalBtn.addEventListener('click', (e) => { 
        e.preventDefault(); 
        if (borrowBookModal) borrowBookModal.classList.remove('hidden'); 
    }); 
    if (closeBorrowBookModalBtn) closeBorrowBookModalBtn.addEventListener('click', closeBorrowBookModal);
    if (cancelBorrowBookBtn) cancelBorrowBookBtn.addEventListener('click', closeBorrowBookModal);
    if (borrowBookModal) borrowBookModal.addEventListener('click', (e) => { if (e.target === borrowBookModal) closeBorrowBookModal(); });


    // ---------------------------------------------------
    // 5. Fungsionalitas Lain
    // ---------------------------------------------------

    // Navigasi
    navLinks.forEach(link => { link.addEventListener('click', () => { navLinks.forEach(n => n.classList.remove('active')); link.classList.add('active'); }); });
    
    // Hover Card
    statCards.forEach(card => {
        card.addEventListener('mouseover', () => { card.style.transform = 'translateY(-3px)'; card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'; });
        card.addEventListener('mouseout', () => { card.style.transform = 'translateY(0)'; card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'; });
    });
    
    // Tombol Kembali
    returnButtons.forEach(button => { button.addEventListener('click', () => { alert(`Buku berhasil dikembalikan.`); }); });
    
    // Ikon Edit/Hapus
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const action = e.target.classList.contains('delete-icon') ? 'Hapus' : 'Edit';
            alert(`Aksi: ${action} item.`);
        });
    });
});