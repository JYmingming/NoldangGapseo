package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.User;

@Mapper
public interface UserDao {
//dddd
  List<User> findAll();

  User findNickname(String nickName);

}
