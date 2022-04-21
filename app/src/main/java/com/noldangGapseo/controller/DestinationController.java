package com.noldangGapseo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import com.noldangGapseo.service.DestinationService;

@RequestMapping("/destination")
@RestController
public class DestinationController {


  @Autowired
  DestinationService service;

  //놀당갑서의 여행지를 모두 가져온다.
  @GetMapping("/admin/list")
  List<Destination> getAdminDesList() {
    return service.getAdminDesList();
  }

  //유저들이 작성한 여행지 리스트를 가져온다.
  @GetMapping("/users/list")
  List<Destination> getUsersDesList() {
    return service.getUsersDesList();
  }

  // 여행지 하나를 가져온다.
  // type : 놀당 여행지 = N , 유저 여행지 = U
  @GetMapping("/getDes")
  DestinationResponse getDes(@RequestParam Integer desId, @RequestParam String type) {
    return service.getDes(desId, type);
  }

  // 메인 페이지의 4 여행지를 가져온다.
  @GetMapping("/get4Des")
  public List<Destination> get4Des() {
    return service.get4Des();
  }

  // 유저의 새로운 여행지 리스트를 가져온다.
  @GetMapping("/user/list")
  List<Destination> getUserDesList(@RequestParam Integer userId) {
    return service.getUserDesList(userId);
  }

  // 좋아요 추가
  @PostMapping("/addLike")
  Integer addLike(Integer desId, Integer userId) {
    return service.addLike(desId, userId);
  }

  // 좋아요 삭제
  @DeleteMapping("/deleteLike")
  Integer deleteLike(Integer desId, Integer userId) {
    return service.deleteLike(desId, userId);
  }




}




