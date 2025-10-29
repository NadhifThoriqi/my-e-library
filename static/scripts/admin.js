// ==========================
// admin_core.js
// ==========================

document.addEventListener('DOMContentLoaded', () => {
    // Elemen-elemen penting
    const navLinks = document.querySelectorAll('.main-nav a');
    const statCards = document.querySelectorAll('.stats-cards .card');
    const addBookModal = document.getElementById('addBookModal');
    const openModalBtn = document.getElementById('openAddBookModal');
    const closeModalBtn = document.getElementById('closeAddBookModal');
    const cancelModalBtn = document.getElementById('cancelAddBook');

    const addMemberModal = document.getElementById('addMemberModal');
    const openMemberModalBtn = document.getElementById('openAddMemberModal');
    const closeMemberModalBtn = document.getElementById('closeAddMemberModal');
    const cancelMemberModalBtn = document.getElementById('cancelAddMember');

    const memberActionIcons = document.querySelectorAll('.member-table .action-buttons i');

    // --- Navigasi utama ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Efek hover kartu statistik ---
    statCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
        });
    });

    // --- Modal Buku ---
    function closeAddBookModal() {
        if (addBookModal) addBookModal.classList.add('hidden');
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            if (addBookModal) addBookModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeAddBookModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeAddBookModal);
    if (addBookModal) {
        addBookModal.addEventListener('click', e => {
            if (e.target === addBookModal) closeAddBookModal();
        });
    }

    // --- Modal Anggota ---
    function closeAddMemberModal() {
        if (addMemberModal) addMemberModal.classList.add('hidden');
    }

    if (openMemberModalBtn) {
        openMemberModalBtn.addEventListener('click', () => {
            if (addMemberModal) addMemberModal.classList.remove('hidden');
        });
    }

    if (closeMemberModalBtn) closeMemberModalBtn.addEventListener('click', closeAddMemberModal);
    if (cancelMemberModalBtn) cancelMemberModalBtn.addEventListener('click', closeAddMemberModal);
    if (addMemberModal) {
        addMemberModal.addEventListener('click', e => {
            if (e.target === addMemberModal) closeAddMemberModal();
        });
    }

    // --- Aksi tabel anggota ---
    memberActionIcons.forEach(icon => {
        icon.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const memberName = row ? row.querySelector('td:nth-child(2)').textContent.trim() : 'Nama tidak ditemukan';
            const action = e.target.classList.contains('delete-icon') ? 'Hapus' : 'Edit';
            alert(`${action} anggota: ${memberName}`);
        });
    });
});
