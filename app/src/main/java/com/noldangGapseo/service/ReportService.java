package com.noldangGapseo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.ReportDao;
import com.noldangGapseo.domain.Report;


@Service
public class ReportService {

  @Autowired
  ReportDao mapper;


  public List<Report> reportfindAll() {
    return mapper.reportfindAll();
  }





}