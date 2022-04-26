package com.noldangGapseo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.Report;
import com.noldangGapseo.service.ReportService;


@RestController
@RequestMapping("/report")
public class ReportController {


  @Autowired
  ReportService service;


  @RequestMapping("/user/list")
  List<Report> reportfindAll() {
    return service.reportfindAll();
  }



}
