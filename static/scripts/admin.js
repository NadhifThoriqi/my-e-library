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

    const memberActionIcons = document.querySelectorAll('.member-table .action-member-buttons i');
    const bookActionIcons = document.querySelectorAll('.book-table .action-book-buttons i');

    // --- Modal Edit Anggota ---
    const editMemberModal = document.getElementById('editMemberModal');
    const closeEditMemberModalBtn = document.getElementById('closeEditMemberModal');
    const cancelEditMemberBtn = document.getElementById('cancelEditMember');


    const editBookModal = document.getElementById('editBookModal');
    const closeEditBookModalBtn = document.getElementById('closeEditBookModal');
    const cancelEditBookBtn = document.getElementById('cancelEditBook');

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

    // --- Model Buku ---
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

    // --- Modal Edit Buku ---
    function closeEditBookModal() {
        editBookModal.classList.add('hidden');
    }
                
    if (closeEditBookModalBtn) closeEditBookModalBtn.addEventListener('click', closeEditBookModal);
    if (cancelEditBookBtn) cancelEditBookBtn.addEventListener('click', closeEditBookModal);
    if (editBookModal) {
        editBookModal.addEventListener('click', e => {
            if (e.target === editBookModal) closeEditBookModal();
        });
    }

    // --- Aksi tabel buku ---
    bookActionIcons.forEach(icon => {
        icon.addEventListener('click', e => {
            const row = e.target.closest('tr');
            const bookName = row ? row.querySelector('td:nth-child(1)').textContent.trim() : 'Daftar tidak ditemukan';
            const actionBook = e.target.classList.contains('delete-icon') ? 'Hapus' : 'Edit';
            // alert(`${action}: ${bookName}`);

            if (actionBook == 'Hapus'){
                if (!confirm(`Yakin Hapus ini? (${bookName})`)) return;
        
                fetch("/delead/book", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({book: row.querySelector('td:nth-child(7)').textContent.trim()})
                })
                .then(r => r.json())
                .then(d => alert(d.message))
                .catch(e => console.error(e));
                row.remove();
            } else {
                // Ambil data dari kolom tabel
                const isbn = row.querySelector('td:nth-child(2)').textContent.trim();
                const author = row.querySelector('td:nth-child(3)').textContent.trim();
                const category = row.querySelector('td:nth-child(4)').textContent.trim();
                const stock = row.querySelector('td:nth-child(5)').textContent.trim();
                const available = row.querySelector('td:nth-child(6)').textContent.trim();
                const key = row.querySelector('td:nth-child(7)').textContent.trim();

                // Isi form edit
                document.getElementById('bookKode').value = key;
                document.getElementById('editJudulBuku').value = bookName;
                document.getElementById('editIsbn').value = isbn;
                document.getElementById('editPengarang').value = author;
                document.getElementById('editKategori').value = category;
                document.getElementById('editStok').value = stock;
                document.getElementById('editDeskripsi').value = '';

                // Tampilkan modal
                editBookModal.classList.remove('hidden');
            }
        });
    });

    // --- Modal Anggota ---
    function closeAddMemberModal() {
        if (addMemberModal) addMemberModal.classList.add('hidden');
    }

    function closeEditMemberModal() {
        editMemberModal.classList.add('hidden');
    }

    if (openMemberModalBtn) {
        openMemberModalBtn.addEventListener('click', () => {
            if (addMemberModal) addMemberModal.classList.remove('hidden');
        });
    }

    if (closeEditMemberModalBtn) closeEditMemberModalBtn.addEventListener('click', closeEditMemberModal);
    if (cancelEditMemberBtn) cancelEditMemberBtn.addEventListener('click', closeEditMemberModal);
    if (editMemberModal) {
        editMemberModal.addEventListener('click', e => {
            if (e.target === editMemberModal) closeEditMemberModal();
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
            const actionMember = e.target.classList.contains('delete-icon') ? 'Hapus' : 'Edit';
            
            if (actionMember == "Hapus") {
                if (!confirm(`Yakin Hapus ini? (${memberName})`)) return;
        
                fetch("/delead/member/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({member: row.querySelector('td:nth-child(3)').textContent.trim()})
                })
                .then(r => r.json())
                .then(d => alert(d.message))
                .catch(e => console.error(e));
                row.remove();
            } else {
                const row = e.target.closest('tr');
                const name = row.querySelector('td:nth-child(2)').textContent.trim();
                const email = row.querySelector('td:nth-child(3)').textContent.trim();
                const phone = row.querySelector('td:nth-child(4)').textContent.trim();
                const status = row.querySelector('td:nth-child(5) span').dataset.memberStatusKey;

                if (e.target.classList.contains('edit-icon')) {
                    document.getElementById('oldMemberEmail').value = email;
                    document.getElementById('editMemberFullName').value = name;
                    document.getElementById('editMemberEmail').value = email;
                    document.getElementById('editMemberPhone').value = phone;
                    document.getElementById('editMemberAddress').value = '';
                    document.getElementById('editMemberCity').value = '';
                    document.getElementById('editMemberStatus').value = status;

                    editMemberModal.classList.remove('hidden');
                }
            }
        });
    });
});