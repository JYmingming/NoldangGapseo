package com.noldangGapseo.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.NoticeVO;
import com.noldangGapseo.service.NoticeBoardService;

@RestController
@RequestMapping("/notice")
public class NoticeBoardController {

  @Autowired
  NoticeBoardService service;

  //놀당갑서의 공지사항을 가져온다. 
  @PostMapping("/list")
  public List<NoticeVO> getNoticeList(HttpServletRequest request, HttpServletResponse response) {

    List<NoticeVO> list = service.getNoticeList();
    System.out.println(list);

    return list;
  }

}
