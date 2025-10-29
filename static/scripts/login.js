document.addEventListener('DOMContentLoaded', () => {
    // Elemen baru untuk fitur show/hide
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // --- FITUR BARU: Lihat/Sembunyikan Kata Sandi ---
    togglePassword.addEventListener('click', () => {
        // Ambil tipe input saat ini (text atau password)
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        
        // Ubah tipe input
        passwordInput.setAttribute('type', type);
        
        // Ubah ikon mata (fa-eye-slash berarti tersembunyi, fa-eye berarti terlihat)
        togglePassword.classList.toggle('fa-eye-slash');
        togglePassword.classList.toggle('fa-eye'); // Secara eksplisit menambahkan/menghapus kelas awal untuk memastikan kebalikan
    });
    // ---------------------------------------------------
});