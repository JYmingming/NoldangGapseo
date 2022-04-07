package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.User;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserDao {

  Integer insert(User user);

  User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  List<User> findAll();

  User findNickname(String nickName);

}
