package com.noldangGapseo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.Invite;
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

  public User get(String password) {
    return mapper.findByPassword(password);
  }

  public UserResponse userList() {
    return new UserResponse().setUserList(mapper.findAll());
  }

  public List<User> findNickname(String nickName) {
    return mapper.findNickname(nickName);
  }
  public List<User> findNicknameCall(String nickName) {
    return mapper.findNicknameCall(nickName);
  }


  public List<User> findAll() {
    return mapper.findAll();
  }


  public int update(User user) {
    return mapper.update(user);
  }

  public int updateImg(User user) {
    return mapper.update(user);
  }

  public int delete(User user) {
    return mapper.delete(user);
  }

  public User get(int userId) {
    User user = mapper.findByNo(userId);
    return user;
  }

  public int checkNickname(String nickname) {
    return mapper.checkNickname(nickname);
  }

  public List<Invite> inviteList(String nickName) {
    return mapper.inviteList(nickName);
  }

}