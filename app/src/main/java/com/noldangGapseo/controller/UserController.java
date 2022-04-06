package com.noldangGapseo.controller;

import java.util.List;

import com.noldangGapseo.domain.UserResponse;
import com.noldangGapseo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.User;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  UserService service;

  @RequestMapping("/signup")
  public Object signUp(User user){
    if(service.add(user)==1){
      return "success";
    }else{
      return "fail";
    }
  }

  //유저의 전체 리스트를 가져온다
  @GetMapping("/list")
  public UserResponse userlist(){
    return service.userList();
  }

//  @GetMapping("/search")
//  public User search(String nickName) {
//    return userDao.findNickname(nickName);
//  }



}
