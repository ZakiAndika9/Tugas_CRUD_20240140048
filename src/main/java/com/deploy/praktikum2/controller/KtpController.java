package com.deploy.praktikum2.controller;

import com.deploy.praktikum2.model.dto.KtpAddRequest;
import com.deploy.praktikum2.model.dto.KtpDto;
import com.deploy.praktikum2.service.KtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

public class KtpController {
    @Autowired
    private KtpService ktpService;

    @PostMapping(
            path = "/ktp",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Map<String, Object>> AddKtp(@RequestBody KtpAddRequest request) {
        KtpDto result = ktpService.AddKtp(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "status", "success",
                "data", result
        ));
    }

    @GetMapping(
            path = "/ktp",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Map<String, Object>> getAllKtp() {
        List<KtpDto> result = ktpService.getAllKtp();
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "status", "success",
                "data", result
        ));
    }

    @GetMapping(
            path = "/ktp/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Map<String, Object>> getKtpById(@PathVariable("id") Integer id) {
        KtpDto result = ktpService.getKtpByID(id);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "status", "success",
                "data", result
        ));
    }

    @PutMapping(
            path = "/ktp/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Map<String, Object>> UpdateKtp(
            @PathVariable("id") Integer id,
            @RequestBody KtpAddRequest request
    ) {
        KtpDto result = ktpService.UpdateKtp(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "status", "success",
                "data", result
        ));
    }

    @DeleteMapping(
            path = "/ktp/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Map<String, Object>> DeleteKtp(@PathVariable("id") Integer id) {
        ktpService.DeleteKtp(id);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "status", "success delete ktp with id " + id
        ));
    }

}