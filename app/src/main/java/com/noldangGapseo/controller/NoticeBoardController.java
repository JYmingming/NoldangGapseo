package com.noldangGapseo.controller;

import java.util.HashMap;
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

  //놀당갑서의 공지사항 타입별로 가져온다. 
  @PostMapping("/list")
  public List<NoticeVO> getNoticeList(HttpServletRequest request, HttpServletResponse response) {

    String type = request.getParameter("type");
    List<NoticeVO> list = service.getNoticeList(type);


    return list;
  }

  @PostMapping("/regist")
  public void regist(HttpServletRequest request, HttpServletResponse response) {

    String title = request.getParameter("title");
    String content = request.getParameter("content");

    HashMap <String, String> map = new HashMap<String, String>();
    map.put("title", title);
    map.put("content", content);
    service.regist(map);
  }


  @PostMapping("/update")
  public void update(HttpServletRequest request, HttpServletResponse response) {

    String centerid = request.getParameter("idx");
    String title = request.getParameter("title");
    String content = request.getParameter("content");
    HashMap <String, String> map = new HashMap<String, String>();
    map.put("service_center_id", centerid);
    map.put("title", title);
    map.put("content", content);
    service.update(map);
  }



  @PostMapping("/delete")
  public void delete(HttpServletRequest request, HttpServletResponse response) {
    int service_center_id = Integer.parseInt(request.getParameter("idx"));
    service.delete(service_center_id);

  }

  @PostMapping("/updateContent")
  public NoticeVO updateContent(HttpServletRequest request, HttpServletResponse response) {

    String idx = request.getParameter("idx");
    NoticeVO list = service.updateContent(idx);

    return list;
  }
}
