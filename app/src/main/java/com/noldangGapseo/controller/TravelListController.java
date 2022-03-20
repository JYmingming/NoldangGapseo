package com.noldangGapseo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TravelListController {

  @RequestMapping("/hello")
  String hello() {
    return "Hello world23";
  }



  @RequestMapping("/tavel/list")
  String travelList() {
    return "tavel/list";
  }





}
