package com.noldangGapseo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.UserResponse;

@Service
public class UserService {

  @Autowired
  UserDao mapper;

  public UserResponse userList() {
    return new UserResponse().setUserList(mapper.findAll());
  }

}
