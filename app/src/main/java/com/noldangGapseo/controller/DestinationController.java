package com.noldangGapseo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

  //page 만들기 연습
  @GetMapping("/admin/list1")
  List<Destination> getAdminDesList1() {
    return service.getAdminDesList1();
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

  // 유저의 새로운 여행지 리스트를 가져온다.
  @GetMapping("/user/list")
  List<Destination> getUserDesList(@RequestParam Integer userId) {return service.getUserDesList(userId);}

}
