package com.deploy.praktikum2.service.Impl;

import com.deploy.praktikum2.mapper.KtpMapper;
import com.deploy.praktikum2.model.dto.KtpAddRequest;
import com.deploy.praktikum2.model.dto.KtpDto;
import com.deploy.praktikum2.model.entity.Ktp;
import com.deploy.praktikum2.repository.KtpRepository;
import com.deploy.praktikum2.service.KtpService;
import com.deploy.praktikum2.util.ValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class KtpServiceImpl implements KtpService {
    @Autowired
    private KtpRepository ktpRepository;

    @Autowired
    private ValidationUtil validationUtil;

    @Override
    public KtpDto AddKtp(KtpAddRequest request) {
        validationUtil.validate(request);

        if (ktpRepository.existsByNomorKtp(request.getNomorKtp())) {
            throw new RuntimeException("Nomor KTP sudah terdaftar");
        }

        Ktp saveKtp = Ktp.builder()
                .nomorKtp(request.getNomorKtp())
                .namaLengkap(request.getNamaLengkap())
                .alamat(request.getAlamat())
                .tanggalLahir(request.getTanggalLahir())
                .jenisKelamin(request.getJenisKelamin())
                .build();

        ktpRepository.save(saveKtp);

        KtpDto ktpDto = KtpMapper.MAPPER.toKtpDtoData(saveKtp);

        return ktpDto;
    }

    @Override
    public List<KtpDto> getAllKtp() {
        List<Ktp> ktpList = ktpRepository.findAll();
        List<KtpDto> ktpDto = new ArrayList<>();
        for (Ktp ktp : ktpList) {
            ktpDto.add(KtpMapper.MAPPER.toKtpDtoData(ktp));
        }
        return ktpDto;
    }

    @Override
    public KtpDto getKtpByID(Integer id) {
        Ktp ktp = ktpRepository.findById(id).orElseThrow(() -> new RuntimeException("Data KTP tidak ditemukan"));
        return KtpMapper.MAPPER.toKtpDtoData(ktp);
    }

    @Override
    public KtpDto UpdateKtp(Integer id, KtpAddRequest request) {
        validationUtil.validate(request);

        Ktp existingKtp = ktpRepository.findById(id).orElseThrow(() -> new RuntimeException("Data KTP tidak ditemukan"));

        Ktp ktp = Ktp.builder()
                .id(existingKtp.getId())
                .nomorKtp(request.getNomorKtp())
                .namaLengkap(request.getNamaLengkap())
                .alamat(request.getAlamat())
                .tanggalLahir(request.getTanggalLahir())
                .jenisKelamin(request.getJenisKelamin())
                .build();

        ktpRepository.save(ktp);

        return KtpMapper.MAPPER.toKtpDtoData(ktp);
    }

    @Override
    public void DeleteKtp(Integer id) {
        Ktp ktp = ktpRepository.findById(id).orElseThrow(() -> new RuntimeException("Data KTP tidak ditemukan"));
        ktpRepository.delete(ktp);
    }
}