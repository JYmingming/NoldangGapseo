package com.noldangGapseo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.User;

@RestController
public class UserController {

  @Autowired
  UserDao userDao;

  //민수 GIT test

  @GetMapping("/user/list")
  public List<User> list(){
    return userDao.findAll();
  }

  @GetMapping("/user/search")
  public User search(String nickName) {
    return userDao.findNickname(nickName);
  }



}
