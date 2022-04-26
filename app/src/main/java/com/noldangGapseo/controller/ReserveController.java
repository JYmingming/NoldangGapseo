package com.noldangGapseo.controller;

import com.noldangGapseo.domain.Air;
import com.noldangGapseo.domain.ReserveResponse;
import com.noldangGapseo.service.AirReserveService;
import com.noldangGapseo.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/reserve")
@RestController
public class ReserveController {

    @Autowired
    ReserveService service;

    @Autowired
    AirReserveService airService;

    @GetMapping("/get")
    public ReserveResponse get(String startDate, String endDate , String link){
        return service.driverStarter(startDate, endDate, link);
    }
    @GetMapping("/getAir")
    public List<Air> getAir(String startDate, String endDate,String startLocation) throws Exception {
      return airService.airCrawl(startDate,endDate,startLocation);
    }



}
