package com.noldangGapseo.controller;

import com.noldangGapseo.domain.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/session")
public class SessionController {

    //세션정보를 가져온다.
//    @GetMapping("/get")
//    public ApiResponse getSession(HttpSession session) {
//        Object user = session.getAttribute("loginUser");
//        if(user != null){
//            return new ApiResponse()
//                    .getResCode()
//                    .setData(user);
//        } else {
//            return new
//        }
//    }

}
