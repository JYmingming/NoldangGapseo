package com.noldangGapseo.controller;

import java.util.List;
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
  UserDao userDao;
  //kkk
  //유저의 전체 리스트를 가져온다
  @GetMapping("/list")
  public List<User> list(){
    return userDao.findAll();
  }

  @GetMapping("/search")
  public User search(String nickName) {
    return userDao.findNickname(nickName);
  }



}
