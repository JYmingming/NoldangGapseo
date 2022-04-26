package com.noldangGapseo.controller;

import java.util.List;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.ApiResponse;
import com.noldangGapseo.domain.Invite;
import com.noldangGapseo.domain.User;
import com.noldangGapseo.domain.UserResponse;
import com.noldangGapseo.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

  private static final org.slf4j.Logger log = LoggerFactory.getLogger(UserController.class);

  @Autowired
  UserService service;

  @RequestMapping("/signup")
  public ApiResponse signUp(User user){
    ApiResponse apires =new ApiResponse();
    if(service.add(user)==1){
      return apires;
    }else{
      apires.setResCode("1111");
      apires.setResStatus("fail");
    }
    return apires;
  }

  @RequestMapping("/signin")
  public Object signin(String email, String password, boolean saveEmail, HttpServletResponse response, HttpSession session) {
    ApiResponse apires =new ApiResponse();
    User loginUser = service.get(email, password);
    if (loginUser == null) {
      apires.setResCode("1111");
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

  @GetMapping("/search/nickName")
  public List<User> search(String nickName) {
    return service.findNickname(nickName);
  }

  @GetMapping("/admin/list")
  List<User> findAll() {
    return service.findAll();
  }

  @RequestMapping("/resignin")
  public Object resignin(String password, HttpServletResponse response, HttpSession session) {
    ApiResponse apires =new ApiResponse();
    User loginUser = service.get(password);
    if (loginUser == null) {
      apires.setResCode("1111");
      apires.setResStatus("fail");
      return apires;
    }
    return apires;

  }

  @RequestMapping("/get")
  public Object get(int userId) {
    User user = service.get(userId);
    if (user == null) {
      return new ApiResponse().setResStatus("fail").setData("해당 번호의 게시글이 없습니다.");
    }
    return new ApiResponse().setResStatus("success").setData(user);
  }

  @GetMapping("/inviteList")
  public List<Invite> inviteList(@RequestParam String invitedNick, @RequestParam String travelName ) {
    return service.inviteList(invitedNick, travelName);
  }

  @RequestMapping("/update")
  public Object update(User user, HttpSession session) {
    log.debug(user.toString());
    User loginUser = (User) session.getAttribute("loginUser");
    user.setUserId(loginUser.getUserId());

    int count = service.update(user);


    if (count == 1) {
      return new ApiResponse().setResStatus("success");
    } else {
      return new ApiResponse().setResStatus("fail").setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/delete")
  public Object delete(User user, HttpSession session) {
    User loginUser = (User) session.getAttribute("loginUser");
    User delUser = new User();
    user.setUserId(loginUser.getUserId());

    int count =service.delete(user);

    if (count == 1) {
      return new ApiResponse().setResStatus("success");
    } else {
      return new ApiResponse().setResStatus("fail").setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
    }
  }

  @RequestMapping("/checkNickname")
  public Object checkNickname(String nickname) {
    return service.checkNickname(nickname);
  }
}