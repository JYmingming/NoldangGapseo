package com.noldangGapseo.controller;


import com.noldangGapseo.domain.Cost;
import com.noldangGapseo.domain.Todo;
import com.noldangGapseo.domain.Travel;
import com.noldangGapseo.domain.TravelResponse;
import com.noldangGapseo.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/travel")
public class TravelController {

    @Autowired
    TravelService service;

    // 유저의 여행 리스트를 불러온다.
    @GetMapping("/travelList")
    public List<Travel> travelList(String nickName) {
        return service.travelList(nickName);
    }

    // 여행 정보를 불러온다.
    @GetMapping("/travelOne")
    public TravelResponse getTravel(Integer travelId){
        return service.getTravel(travelId);
    }

    // 여행의 비용 항목을 불러온다.
    @GetMapping("/costList")
    public List<Cost> costList(Integer travelId){
        return service.costList(travelId);
    }

    // 여행의 투두 항목을 불러온다.
    @GetMapping("/todoList")
    public List<Todo> todoList(Integer travelId){
        return service.todoList(travelId);
    }
}
