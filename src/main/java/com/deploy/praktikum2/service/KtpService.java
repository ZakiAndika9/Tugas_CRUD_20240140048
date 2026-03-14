package com.deploy.praktikum2.service;

import com.deploy.praktikum2.model.dto.KtpAddRequest;
import com.deploy.praktikum2.model.dto.KtpDto;

import java.util.List;

public interface KtpService {
    KtpDto AddKtp(KtpAddRequest request);
    List<KtpDto> getAllKtp();
    KtpDto getKtpByID(Integer id);
    KtpDto UpdateKtp(Integer id, KtpAddRequest request);
    void DeleteKtp(Integer id);
}
