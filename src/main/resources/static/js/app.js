var deleteTargetId = null;

$(document).ready(function () {
    loadTheme();
    loadKtpData();

    // Submit form
    $('#ktpForm').on('submit', function (e) {
        e.preventDefault();
        var id = $('#ktpId').val();

        var data = {
            nomorKtp: $('#nomorKtp').val().trim(),
            namaLengkap: $('#namaLengkap').val().trim(),
            alamat: $('#alamat').val().trim(),
            tanggalLahir: $('#tanggalLahir').val(),
            jenisKelamin: $('#jenisKelamin').val()
        };

        if (id) {
            updateKtp(id, data);
        } else {
            addKtp(data);
        }
    });

    // Tombol batal
    $('#btnCancel').on('click', function () {
        resetForm();
    });

    // Hanya angka di nomor KTP
    $('#nomorKtp').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Tutup modal klik luar
    $('#modal').on('click', function (e) {
        if ($(e.target).is('#modal')) {
            closeModal();
        }
    });
});

// ===== THEME =====
function toggleTheme() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    $('#themeToggle').text(next === 'dark' ? '☀️' : '🌙');
    try { localStorage.setItem('theme', next); } catch(e) {}
}

function loadTheme() {
    try {
        var saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            $('#themeToggle').text('☀️');
        }
    } catch(e) {}
}

// ===== TOAST NOTIFICATION =====
function showToast(type, message) {
    var icon = type === 'success' ? '✅' : '❌';
    var toast = $('<div class="toast toast-' + type + '">' +
        '<span>' + icon + '</span>' +
        '<span>' + message + '</span>' +
        '<div class="toast-progress"></div>' +
        '</div>');

    $('#toastContainer').append(toast);

    setTimeout(function () {
        toast.addClass('removing');
        setTimeout(function () {
            toast.remove();
        }, 300);
    }, 3500);
}

// ===== MODAL =====
function showModal(type, title, message, info, actions) {
    var icons = {
        success: '✅',
        delete: '⚠️',
        error: '❌'
    };

    $('#modalIcon').text(icons[type] || '📋');
    $('#modalTitle').text(title);
    $('#modalMessage').text(message);

    if (info) {
        $('#modalInfo').text(info).removeClass('hidden');
    } else {
        $('#modalInfo').addClass('hidden');
    }

    var $actions = $('#modalActions');
    $actions.empty();

    actions.forEach(function (action) {
        var btn = $('<button class="' + action.className + '">' + action.label + '</button>');
        btn.on('click', action.onClick);
        $actions.append(btn);
    });

    $('#modal').removeClass('hidden');
}

function closeModal() {
    $('#modal').addClass('hidden');
    deleteTargetId = null;
}

// ===== GET - Ambil semua data =====
function loadKtpData() {
    $('#loadingSpinner').removeClass('hidden');
    $('#ktpTable').addClass('hidden');

    $.ajax({
        url: '/ktp',
        method: 'GET',
        success: function (response) {
            $('#loadingSpinner').addClass('hidden');
            $('#ktpTable').removeClass('hidden');
            renderTable(response.data);
        },
        error: function () {
            $('#loadingSpinner').addClass('hidden');
            $('#ktpTable').removeClass('hidden');
            showToast('error', 'Gagal memuat data');
        }
    });
}

// ===== POST - Tambah data =====
function addKtp(data) {
    $('#btnSubmit').prop('disabled', true).text('⏳ Menyimpan...');

    $.ajax({
        url: '/ktp',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            showModal('success', 'Berhasil! 🎉', 'Data KTP berhasil ditambahkan ke database.', null, [
                {
                    label: '👍 OK',
                    className: 'btn-primary',
                    onClick: function () { closeModal(); }
                }
            ]);
            resetForm();
            loadKtpData();
        },
        error: function (xhr) {
            showToast('error', getErrorMessage(xhr));
        },
        complete: function () {
            $('#btnSubmit').prop('disabled', false).text('💾 Simpan Data');
        }
    });
}

// ===== PUT - Update data =====
function updateKtp(id, data) {
    $('#btnSubmit').prop('disabled', true).text('⏳ Memperbarui...');

    $.ajax({
        url: '/ktp/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            showModal('success', 'Berhasil! ✏️', 'Data KTP berhasil diperbarui.', null, [
                {
                    label: '👍 OK',
                    className: 'btn-primary',
                    onClick: function () { closeModal(); }
                }
            ]);
            resetForm();
            loadKtpData();
        },
        error: function (xhr) {
            showToast('error', getErrorMessage(xhr));
        },
        complete: function () {
            $('#btnSubmit').prop('disabled', false).text('💾 Simpan Data');
        }
    });
}

// ===== DELETE - Tampilkan modal konfirmasi =====
function deleteKtp(id, nama) {
    deleteTargetId = id;
    showModal('delete', 'Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus data ini?', 'Nama: ' + nama, [
        {
            label: '🗑 Hapus',
            className: 'btn-modal-danger',
            onClick: function () { confirmDelete(); }
        },
        {
            label: 'Batal',
            className: 'btn-modal-cancel',
            onClick: function () { closeModal(); }
        }
    ]);
}

// ===== DELETE - Konfirmasi =====
function confirmDelete() {
    if (!deleteTargetId) return;

    $.ajax({
        url: '/ktp/' + deleteTargetId,
        method: 'DELETE',
        success: function () {
            closeModal();
            showToast('success', 'Data KTP berhasil dihapus');
            loadKtpData();

            if ($('#ktpId').val() == deleteTargetId) {
                resetForm();
            }
        },
        error: function (xhr) {
            closeModal();
            showToast('error', getErrorMessage(xhr));
        }
    });
}

// ===== GET by ID - Edit =====
function editKtp(id) {
    $.ajax({
        url: '/ktp/' + id,
        method: 'GET',
        success: function (response) {
            var ktp = response.data;
            $('#ktpId').val(ktp.id);
            $('#nomorKtp').val(ktp.nomorKtp);
            $('#namaLengkap').val(ktp.namaLengkap);
            $('#alamat').val(ktp.alamat);
            $('#tanggalLahir').val(ktp.tanggalLahir);
            $('#jenisKelamin').val(ktp.jenisKelamin);

            $('#formTitle').text('✏️ Edit Data KTP');
            $('#btnSubmit').text('💾 Perbarui Data');
            $('#btnCancel').removeClass('hidden');

            $('html, body').animate({ scrollTop: 0 }, 400);
        },
        error: function () {
            showToast('error', 'Gagal mengambil data');
        }
    });
}

// ===== Render Tabel =====
function renderTable(data) {
    var $tbody = $('#ktpTableBody');
    $tbody.empty();

    if (!data || data.length === 0) {
        $tbody.append('<tr><td colspan="7" class="empty">Belum ada data KTP.</td></tr>');
        return;
    }

    for (var i = 0; i < data.length; i++) {
        var ktp = data[i];

        var genderBadge = ktp.jenisKelamin === 'Laki-laki'
            ? '<span class="badge badge-male">Laki-laki</span>'
            : '<span class="badge badge-female">Perempuan</span>';

        var escapedNama = ktp.namaLengkap.replace(/'/g, "\\'");

        var row = '<tr style="animation-delay:' + (i * 0.05) + 's">' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + ktp.nomorKtp + '</td>' +
            '<td>' + ktp.namaLengkap + '</td>' +
            '<td>' + ktp.alamat + '</td>' +
            '<td>' + formatDate(ktp.tanggalLahir) + '</td>' +
            '<td>' + genderBadge + '</td>' +
            '<td>' +
                '<div class="action-buttons">' +
                    '<button class="btn-edit" onclick="editKtp(' + ktp.id + ')">✏️ Edit</button>' +
                    '<button class="btn-delete" onclick="deleteKtp(' + ktp.id + ', \'' + escapedNama + '\')">🗑 Hapus</button>' +
                '</div>' +
            '</td>' +
            '</tr>';
        $tbody.append(row);
    }
}

// ===== Reset Form =====
function resetForm() {
    $('#ktpForm')[0].reset();
    $('#ktpId').val('');
    $('#formTitle').text('Tambah Data KTP');
    $('#btnSubmit').text('💾 Simpan Data').prop('disabled', false);
    $('#btnCancel').addClass('hidden');
}

// ===== Format Tanggal =====
function formatDate(dateStr) {
    if (!dateStr) return '-';
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var parts = dateStr.split('-');
    var day = parseInt(parts[2], 10);
    var month = months[parseInt(parts[1], 10) - 1];
    var year = parts[0];
    return day + ' ' + month + ' ' + year;
}

// ===== Error Message =====
function getErrorMessage(xhr) {
    try {
        var response = JSON.parse(xhr.responseText);
        if (response.message) return response.message;
    } catch (e) {}
    return 'Terjadi kesalahan';
}