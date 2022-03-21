package com.noldangGapseo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/destination")
@RestController
public class DestinationController {

  //놀당갑서의 여행지를 모두 가져온다. 
  @GetMapping("/admin/list")
  String adminList() {
    return "Hello world";
  }

  //놀당갑서의 여행지 하나를 가져온다.
  @GetMapping("/admin/desOne")
  String getAdminDesOne(Integer desId) {
    return "admin Des";
  }

  //유저의 여행지를 모두 가져온다.
  @GetMapping("/user/list")
  String userList() {
    return "tavel/list";
  }

  //유저의 여행지 하나를 가져온다. 
  @GetMapping("/user/desOne")
  String getUserDesOne(Integer desId) {
    return "user Des";
  }





}
