package com.deploy.praktikum2.mapper;

import com.deploy.praktikum2.model.dto.KtpDto;
import com.deploy.praktikum2.model.entity.Ktp;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper

public interface KtpMapper {
    KtpMapper MAPPER = Mappers.getMapper(KtpMapper.class);
    KtpDto toKtpDtoData(Ktp ktp);
}