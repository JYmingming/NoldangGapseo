package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.noldangGapseo.domain.User;

@Mapper
public interface UserDao {

  Integer insert(User user);

  User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  List<User> findAll();

  List<User> findNickname(String nickName);






}


