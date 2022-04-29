package com.noldangGapseo.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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

  // 닉네임으로 유저 찾기
  @GetMapping("/search/nickName")
  public List<User> search(String nickName) {
    return service.findNickname(nickName);
  }
  @GetMapping("/search/nickNameCall")
  public List<User> nicknameSearch(String nickName) {
    return service.findNicknameCall(nickName);
  }
  @GetMapping("/search/email")
  public List<User> emailSearch(String email) {
    return service.findEmail(email);
  }
  @GetMapping("/search/phone")
  public List<User> phoneSearch(String phone) {
    return service.findPhone(phone);
  }

  @GetMapping("/admin/list")
  List<User> findAll() {
    return service.findAll();
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
  public List<Invite> inviteList(String nickName) {
    return service.inviteList(nickName);
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

  @RequestMapping("/likesImg")
  public Object likesImg(int userId) {
    return service.likesImg(userId);
  }

  /*--------------- 사진업로드 ----------------*/

  @RequestMapping("/updateImg")
  public Object updateImg(User user, MultipartFile file) {
    try {
      user.setProfileImg(saveFile(file));
      int count = service.updateImg(user);

      if (count == 1) {
        return new ApiResponse().setResStatus("success");
      } else {
        return new ApiResponse().setResStatus("fail").setData("게시글 번호가 유효하지 않거나 게시글 작성자가 아닙니다.");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new ApiResponse().setResStatus("fail").setData(e.getMessage());
    }
  }

  @RequestMapping("/photo")
  public ResponseEntity<Resource> profileImg(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/user/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다.
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);



      //      // HTTP 응답 생성기를 사용하여 다운로드 파일의 응답 데이터를 준비한다.
      //      BodyBuilder http응답생성기 = ResponseEntity.ok(); // 요청 처리에 성공했다는 응답 생성기를 준비한다.
      //      http응답생성기.headers(header); // HTTP 응답 헤더를 설정한다.
      //      http응답생성기.contentLength(downloadFile.length()); // 응답 콘텐트의 파일 크기를 설정한다.
      //      http응답생성기.contentType(MediaType.APPLICATION_OCTET_STREAM); // 응답 데이터의 MIME 타입을 설정한다.
      //      
      //      // 응답 데이터를 포장한다.
      //      ResponseEntity<Resource> 응답데이터 = http응답생성기.body(resource);
      //      
      //      return 응답데이터; // 포장한 응답 데이터를 클라이언트로 리턴한다.

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {

      return null;
    }
  }


  private String saveFile(MultipartFile file) throws Exception {
    if (file != null && file.getSize() > 0) { 
      // 파일을 저장할 때 사용할 파일명을 준비한다.
      String filename = UUID.randomUUID().toString();

      // 파일명의 확장자를 알아낸다.
      int dotIndex = file.getOriginalFilename().lastIndexOf(".");
      if (dotIndex != -1) {
        filename += file.getOriginalFilename().substring(dotIndex);
      }

      // 파일을 지정된 폴더에 저장한다.
      File photoFile = new File("./upload/user/" + filename); // App 클래스를 실행하는 프로젝트 폴더
      file.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

      return filename;

    } else {
      return null;
    }
  }



}