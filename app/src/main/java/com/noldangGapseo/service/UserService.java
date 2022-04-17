package com.noldangGapseo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.User;
import com.noldangGapseo.domain.UserResponse;

@Service
public class UserService {

  @Autowired
  UserDao mapper;

  public Integer add(User user) {
    return mapper.insert(user);
  }

  public User get(String email, String password) {
    return mapper.findByEmailAndPassword(email, password);
  }

  public UserResponse userList() {
    return new UserResponse().setUserList(mapper.findAll());
  }

  public User findNickname(String nickName) {
    return mapper.findNickname(nickName);
  }


  public List<User> findAll() {
    return mapper.findAll();
  }





}