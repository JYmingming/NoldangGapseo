package com.noldangGapseo.controller;

import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.NoldangDestinationResponse;
import com.noldangGapseo.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

  //놀당갑서의 여행지 하나를 가져온다.
  @GetMapping("/admin/desOne")
  NoldangDestinationResponse getAdminDesOne(Integer desId) {
    return service.getNoldangDes(desId);
  }

  //유저의 여행지를 모두 가져온다.
  @GetMapping("/user/list")
  List<Destination> getUserDesList() {
    return service.getUserDesList();
  }

  //유저의 여행지 하나를 가져온다. 
  @GetMapping("/user/desOne")
  Destination getUserDesOne(Integer desId) {
    return service.getUserDesOne(desId);
  }


}
