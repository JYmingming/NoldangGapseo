package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.Report;

@Mapper
public interface ReportDao {



  List<Report> reportfindAll();









}


