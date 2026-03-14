package com.deploy.praktikum2.model.dto;

import lombok.Data;

import java.time.LocalDate;

@Data

public class KtpAddRequest {
    private Integer Id;
    private String nomorKtp;
    private String namaLengkap;
    private String alamat;
    private LocalDate tanggalLahir;
    private String jenisKelamin;
}