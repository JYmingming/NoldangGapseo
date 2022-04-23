package com.noldangGapseo.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import com.noldangGapseo.service.DestinationService;

@RequestMapping("/destination")
@RestController
public class DestinationController {


  @Autowired
  DestinationService service;

  //놀당갑서의 여행지를 모두 가져온다.
  @GetMapping("/admin/list")
  List<Destination> getAdminDesList() {
    return service.getAdminDesList();
  }


  //유저 여행지 페이징 관련
  @GetMapping("/admin/pagelist")
  List<Destination> getAdminDesList1(
      @RequestParam(value="pageNo", defaultValue="1") int pageNo, 
      @RequestParam(value="pageSize", defaultValue="5") int pageSize, 
      Map<String,Object> model) throws Exception {

    int totalPageSize = 0;

    try { // pageSize 파라미터 값이 있다면 기본 값을 변경한다.
      if (pageSize < 5 || pageSize > 100) {
        pageSize = 5;
      }
    } catch (Exception e) {}

    //게시글 전체 개수를 알아내서 페이지 개수를 계산한다.

    Integer destinationSize = service.countAll(); 

    totalPageSize = destinationSize / pageSize; // 예: 게시글개수 / 페이지당개수 = 16 / 5 = 3 
    if ((destinationSize % pageSize) > 0) {
      totalPageSize++;
    }

    try { // pageNo 파라미터 값이 있다면 기본 값을 변경한다.
      if (pageNo < 1 || pageNo > totalPageSize) {// pageNo 유효성 검증
        pageNo = 1;
      }
    } catch (Exception e) {}

    // 2) 서비스 객체 실행
    //List<Destination> destinations = service.findAll(pageSize, pageNo);
    List<Destination> destinations = service.find8(pageSize, pageNo);
    //    List<Destination> destinations = service.findAll(8, 2);
    // 3) 출력 데이터 준비
    model.put("list", destinations);
    model.put("pageNo", pageNo);
    model.put("pageSize", pageSize);
    model.put("totalPageSize", totalPageSize);


    System.out.println(totalPageSize);
    return destinations;
  }



  //유저들이 작성한 여행지 리스트를 가져온다.
  @GetMapping("/users/list")
  List<Destination> getUsersDesList() {
    return service.getUsersDesList();
  }

  // 여행지 하나를 가져온다.
  // type : 놀당 여행지 = N , 유저 여행지 = U
  @GetMapping("/getDes")
  DestinationResponse getDes(@RequestParam Integer desId, @RequestParam String type) {
    return service.getDes(desId, type);
  }

  // 메인 페이지의 4 여행지를 가져온다.
  @GetMapping("/get4Des")
  public List<Destination> get4Des() {
    return service.get4Des();
  }

  // 유저의 새로운 여행지 리스트를 가져온다.
  @GetMapping("/user/list")
  List<Destination> getUserDesList(@RequestParam Integer userId) {
    return service.getUserDesList(userId);
  }

  // 좋아요 추가
  @PostMapping("/addLike")
  Integer addLike(Integer desId, Integer userId) {
    return service.addLike(desId, userId);
  }

  // 좋아요 삭제
  @DeleteMapping("/deleteLike")
  Integer deleteLike(Integer desId, Integer userId) {
    return service.deleteLike(desId, userId);
  }




}










