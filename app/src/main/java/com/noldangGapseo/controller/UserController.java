package com.noldangGapseo.controller;

import java.util.List;

import com.noldangGapseo.domain.ApiResponse;
import com.noldangGapseo.domain.UserResponse;
import com.noldangGapseo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.noldangGapseo.dao.UserDao;
import com.noldangGapseo.domain.User;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {


  @Autowired
  UserService service;

  @RequestMapping("/signup")
  public ApiResponse signUp(User user){
    ApiResponse apires =new ApiResponse();
    if(service.add(user)==1){
      return apires;
    }else{
      apires.setResCode("0000");
      apires.setResStatus("fail");
    }
    return apires;
  }

  @RequestMapping("/signin")
  public Object signin(String email, String password, boolean saveEmail, HttpServletResponse response, HttpSession session) {
    ApiResponse apires =new ApiResponse();
    User loginUser = service.get(email, password);
    if (loginUser == null) {
      apires.setResCode("0000");
      apires.setResStatus("fail");
      return apires;
    }

    // 로그인이 성공하면,
    // 다른 요청을 처리할 때 로그인 회원의 정보를 사용할 있도록 세션에 보관한다.
    session.setAttribute("loginUser", loginUser);

    Cookie cookie = null;
    if (saveEmail) {
      // 클라이언트로 보낼 데이터인 쿠키에 이메일을 저장한다.
      cookie = new Cookie("userEmail", email);
    } else {
      cookie = new Cookie("userEmail", "");
      cookie.setMaxAge(0); // 클라이언트에게 해당 이름의 쿠키를 삭제하도록 요구한다.
    }
    response.addCookie(cookie); // 응답할 때 쿠키 정보를 응답헤더에 포함시킨다.
    apires.setResCode("1111");
    apires.setResStatus("success");
    return apires;
  }
  @RequestMapping("/getLoginUser")
  public Object getLoginUser(HttpSession session) {
    Object user = session.getAttribute("loginUser");
    if (user != null) {
      return new ApiResponse()
              .setResStatus("success")
              .setData(user);
    } else {
      return new ApiResponse()
              .setResStatus("fail")
              .setData("로그인 하지 않았습니다.");
    }
  }

  @RequestMapping("/signout")
  public Object signout(HttpSession session) {
    session.invalidate();
    return new ApiResponse().setResStatus("success");
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
