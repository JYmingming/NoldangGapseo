package com.noldangGapseo.controller;

import com.noldangGapseo.domain.ReserveResponse;
import com.noldangGapseo.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/reserve")
@RestController
public class ReserveController {

    @Autowired
    ReserveService service;

    @GetMapping("/get")
    public ReserveResponse get(String startDate, String endDate , String link){
        return service.driverStarter(startDate, endDate, link);
    }
}
