# CRUD Data KTP Application

## Deskripsi

Project ini merupakan aplikasi sederhana yang dibuat untuk mengimplementasikan konsep **CRUD (Create, Read, Update, Delete)** dalam pengembangan aplikasi web.
Aplikasi ini digunakan untuk mengelola data **Kartu Tanda Penduduk (KTP)** yang tersimpan dalam database.

Dengan aplikasi ini, pengguna dapat menambahkan data baru, melihat daftar data yang tersedia, memperbarui data, serta menghapus data yang tidak diperlukan.

---

## Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan beberapa teknologi berikut:

* **Java**
* **Spring Boot**
* **MySQL**
* **HTML**
* **CSS**
* **JavaScript**

---

## Fitur Aplikasi

Fitur yang tersedia pada aplikasi ini antara lain:

* Menambahkan data KTP baru
* Menampilkan daftar data KTP
* Mengedit atau memperbarui data
* Menghapus data dari database

---

## Struktur Database

Database yang digunakan adalah **spring** dengan tabel **ktp**.

| Kolom        | Tipe Data | Keterangan                  |
| ------------ | --------- | --------------------------- |
| id           | INT       | Primary Key, Auto Increment |
| nomorKtp     | VARCHAR   | Nomor identitas KTP         |
| namaLengkap  | VARCHAR   | Nama lengkap pemilik KTP    |
| alamat       | VARCHAR   | Alamat tempat tinggal       |
| tanggalLahir | DATE      | Tanggal lahir               |
| jenisKelamin | VARCHAR   | Jenis kelamin               |

---

## Struktur Project

Berikut gambaran struktur folder dari project ini:

```
src
 ┣ main
 ┃ ┣ java
 ┃ ┃ ┗ com.example
 ┃ ┃   ┣ controller
 ┃ ┃   ┣ model
 ┃ ┃   ┣ repository
 ┃ ┃   ┗ service
 ┃ ┗ resources
 ┃   ┣ static
 ┃   ┣ templates
 ┃   ┗ application.properties
```

Struktur tersebut digunakan untuk memisahkan bagian **controller, model, repository, dan service** agar kode lebih terorganisir.

---



## Tujuan Project

Tujuan dari pembuatan aplikasi ini adalah untuk mempelajari bagaimana cara menghubungkan aplikasi web dengan database serta mengimplementasikan operasi **CRUD** menggunakan framework **Spring Boot**.
