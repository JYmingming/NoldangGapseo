package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.noldangGapseo.domain.Invite;
import com.noldangGapseo.domain.User;
import com.noldangGapseo.domain.likes;

@Mapper
public interface UserDao {

  Integer insert(User user);

  User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  List<User> findAll();

  List<User> findNickname(String nickName);

  List<User> findNicknameCall(String nickName);

  List<User> findEmail(String email);

  List<User> findPhone(String phone);

  int update(User user);

  int updateImg(User user);

  int delete(User user);

  User get(int userId);

  User findByNo(int userId);

  int checkNickname(String nickname);

  List<Invite> inviteList(String nickName);

  List<likes> likesImg(int userId);
}


