package com.noldangGapseo.controller;


import java.util.List;

import com.noldangGapseo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.noldangGapseo.service.TravelService;

@RestController
@RequestMapping("/travel")
public class TravelController {

  @Autowired
  TravelService service;

  // 유저의 여행 리스트를 불러온다.
  @GetMapping("/travelList")
  public List<Travel> travelList(@RequestParam String nickName) {
    return service.travelList(nickName);
  }

  // 여행 정보를 불러온다.
  @GetMapping("/getOne")
  public TravelResponse getTravel(@RequestParam Integer travelId){
    return service.getTravel(travelId);
  }

  // 여행의 이름을 바꾼다.
  @PutMapping("/setTravelName")
  public ApiResponse setTravelName(@RequestParam String name, Integer id){
    return service.setTravelName(name,id);
  }

  // 여행의 비용 항목을 불러온다.
  @GetMapping("/costList")
  public List<Cost> costList(@RequestParam Integer travelId){
    return service.costList(travelId);
  }

  // 여행의 투두 항목을 불러온다.
  @GetMapping("/todoList")
  public List<Todo> todoList(@RequestParam Integer travelId){
    return service.todoList(travelId);
  }

  // 투두 상태를 변경한다.
  @PutMapping("/todoStatus")
  public ApiResponse setTodoStatus(@RequestParam Integer status, @RequestParam Integer todoId){
    return service.setTodoStatus(status, todoId);
  }

  // 투두 이름을 변경한다.
  @PutMapping("/todoName")
  public ApiResponse setTodoName(@RequestParam String name, @RequestParam Integer todoId){
    return service.setTodoName(name, todoId);
  }

  // 투두 삭제
  @DeleteMapping("deleteTodo")
  public ApiResponse deleteTodo(@PathVariable Integer todoId){
    return service.deleteTodo(todoId);
  }
}
