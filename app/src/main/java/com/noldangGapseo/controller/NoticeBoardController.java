package com.noldangGapseo.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.noldangGapseo.domain.NoticeVO;
import com.noldangGapseo.service.NoticeBoardService;

@RestController
@RequestMapping("/notice")
public class NoticeBoardController {

  @Autowired
  NoticeBoardService service;

  //놀당갑서의 공지사항 타입별로 가져온다. 
  @PostMapping("/list")
  public List<NoticeVO> getNoticeList(HttpServletRequest request, HttpServletResponse response) {

    String type = request.getParameter("type");
    List<NoticeVO> list = service.getNoticeList(type);

    return list;
  }

  @GetMapping("/announcement")
  public ModelAndView announcement(){
    ModelAndView mav = new ModelAndView();
    List<NoticeVO> list = service.getNoticeList("A");
    mav.addObject("list", list);
    mav.setViewName("customorCenter/noticeBoard/announcement.jsp");
    return mav;
  }
}
