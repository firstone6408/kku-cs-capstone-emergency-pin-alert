package com.kku.emergency_alert_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/hello")
public class HelloController {
    @GetMapping()
    public Map<String, String> helloWorld() {
        return Map.of("message", "Hello World");
    }

}
