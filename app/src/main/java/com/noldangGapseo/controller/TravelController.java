package com.noldangGapseo.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.noldangGapseo.domain.ApiResponse;
import com.noldangGapseo.domain.Cost;
import com.noldangGapseo.domain.Schedule;
import com.noldangGapseo.domain.Tag;
import com.noldangGapseo.domain.Todo;
import com.noldangGapseo.domain.Travel;
import com.noldangGapseo.domain.TravelResponse;
import com.noldangGapseo.service.TravelService;

@RestController
@RequestMapping("/travel")
public class TravelController {

    @Autowired
    TravelService service;

    // 유저의 여행 리스트를 불러온다.
    @GetMapping("/travelList")
    public List<Travel> travelList(@RequestParam String nickName, @RequestParam Integer companionId) {
        return service.travelList(nickName, companionId);
    }

    // 여행 정보를 불러온다.
    @GetMapping("/getOne")
    public TravelResponse getTravel(@RequestParam Integer travelId) {
        return service.getTravel(travelId);
    }

    // 여행 하나를 생성한다.
    @PostMapping("/add/travel")
    public ApiResponse addTravel(@RequestBody Travel travel) {
        return service.addTravel(travel);
    }

    // 여행 태그 설정
    @PostMapping("/add/tag")
    public ApiResponse addTag(@RequestParam Integer travelId, @RequestBody List<Tag> tagList) {
        return service.addTag(travelId, tagList);
    }

    // 여행 루트 생성
    @PostMapping("/set/route")
    public ApiResponse setRoute(@RequestParam Integer travelId, @RequestParam Integer day, @RequestBody List<Tag> tagList) {
        return service.setRoute(travelId, day, tagList);
    }

    // 여행 루트를 날짜별로 가져온다.
    @GetMapping("/get/routes")
    public List<Schedule> getRoute(@RequestParam Integer id, @RequestParam Integer day) {
        return service.getRoute(id, day);
    }

    // 루트 순서를 바꾼다.
    @PutMapping("/update/route")
    public ApiResponse updateRoute(@RequestParam String ids) {
        ArrayList<Integer> idList = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            Integer id = Integer.parseInt(ids.split(",")[i]);
            idList.add(id);
        }
        return service.updateRoute(idList);
    }

    // 여행 기간을 가져온다.
    @GetMapping("/get/period")
    public Integer getPeriod(@RequestParam Integer id) {
        return service.getPeriod(id);
    }

    // 여행을 삭제한다.
    @DeleteMapping("/delete")
    public ApiResponse deleteTravel(@RequestParam Integer id) {
        return service.deleteTravel(id);
    }

    @PutMapping("/updateName")
    public ApiResponse updateName(@RequestParam Integer id, @RequestParam String name) {
        return service.updateName(name, id);
    }

    // 여행의 비용 항목을 불러온다.
    @GetMapping("/costList")
    public List<Cost> costList(@RequestParam Integer travelId) {
        return service.costList(travelId);
    }

    // 비용을 추가한다.
    @PostMapping("/addCost")
    public Cost addCost(@RequestBody Cost cost) {
        return service.addCost(cost);
    }

    // 비용 업데이트한다.
    @PutMapping("/updateCost")
    public Cost setCost(@RequestBody Cost cost) {
        return service.setCost(cost);
    }

    // 비용을 삭제한다.
    @DeleteMapping("/deleteCost")
    public ApiResponse deleteCost(@RequestParam Integer id) {
        return service.deleteCost(id);
    }

    // 여행의 투두 항목을 불러온다.
    @GetMapping("/todoList")
    public List<Todo> todoList(@RequestParam Integer travelId) {
        return service.todoList(travelId);
    }

    // 투두 추가한다.
    @PostMapping("/addTodo")
    public ApiResponse addTodo(@RequestParam Integer id, @RequestParam String name) {
        return service.addTodo(id, name);
    }

    // 투두 상태를 변경한다.
    @PutMapping("/todoStatus")
    public ApiResponse setTodoStatus(@RequestParam Integer status, @RequestParam Integer todoId) {
        return service.setTodoStatus(status, todoId);
    }

    // 투두 이름을 변경한다.
    @PutMapping("/todoName")
    public ApiResponse setTodoName(@RequestParam String name, @RequestParam Integer todoId) {
        return service.setTodoName(name, todoId);
    }

    // 투두 삭제
    @DeleteMapping("/deleteTodo")
    public ApiResponse deleteTodo(@RequestParam Integer todoId) {
        return service.deleteTodo(todoId);
    }


    // 여행 초대
    @PostMapping("/invite")
    public ApiResponse invite(@RequestParam Integer travelId, @RequestParam Integer companionId) {
        return service.invite(travelId, companionId);
    }


}
