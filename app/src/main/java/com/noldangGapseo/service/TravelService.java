package com.noldangGapseo.service;


import com.noldangGapseo.dao.TravelDao;
import com.noldangGapseo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelService {

    @Autowired
    TravelDao mapper;

    // 유저의 여행 리스틑 불러온다.
    public List<Travel> travelList(String nickName) {
        return mapper.travelList(nickName);
    }

    // 여행 하나늘 불러온다.
    // 동행자와 투두리스트 3개를 불러온다.
    public TravelResponse getTravel(Integer travelId) {
        Travel travelOne = mapper.getTravel(travelId);

        return TravelResponse.builder().
                travel(travelOne).
                companionList(mapper.companionList(travelId)).
                todoList(mapper.todoLength3(travelId)).build();
    }

    // 여행의 이름 바꾼다.
    // 성공시 바뀐 이름을 return.
    public ApiResponse updateName(String name, Integer id) {
        Integer status = mapper.updateName(name, id);
        ApiResponse response = new ApiResponse();
        if (status == 0) {
            return response.setResCode("1111");
        }
        return response.setData(name);
    }

    // ===== 비용 =====
    // 비용리스트를 불러온다.
    public List<Cost> costList(Integer travelId) {
        return mapper.costList(travelId);
    }

    // 비용을 추가한다.
    public Cost addCost(Cost cost) {
        Integer mapperCost = mapper.addCost(cost);
        if (mapperCost == 0) {
            return null;
        }
        return Cost.builder().cost(cost.getCost()).name(cost.getName()).costId(cost.getCostId()).build();
    }

    // 비용을 업데이트 한다.
    public Cost setCost(Cost cost) {
        Integer mapperCost = mapper.setCost(cost);
        if (mapperCost == 0) {
            return null;
        }
        return Cost.builder().cost(cost.getCost()).name(cost.getName()).build();
    }

    // 비용을 삭제한다.
    public ApiResponse deleteCost(Integer costId) {
        ApiResponse response = new ApiResponse();
        Integer mapperCost = mapper.deleteCost(costId);
        if (mapperCost == 0) {
            return response.setResCode("1111");
        }
        return response;
    }

    // ==== 투두 ====
    // 투두리스트를 불러온다.
    public List<Todo> todoList(Integer travelId) {
        return mapper.todoList(travelId);
    }

    // 투두를 추가한다.
    public ApiResponse addTodo(Integer id, String name) {
        Integer todo = mapper.addTodo(id, name);
        ApiResponse response = new ApiResponse();
        if (todo == 0) {
            return response.setResCode("1111");
        }
        return response.setData(name);
    }


    // 투두의 상태를 변경시킨다.
    public ApiResponse setTodoStatus(Integer status, Integer todoId) {
        Integer todoStatus = mapper.setTodoStatus(status, todoId);
        ApiResponse response = new ApiResponse();
        if (todoStatus == 0) {
            return response.setResCode("1111");
        }
        return response;
    }

    // 투두 이름을 변경시킨다.
    public ApiResponse setTodoName(String name, Integer todoId) {
        Integer todoStatus = mapper.setTodoName(name, todoId);
        ApiResponse response = new ApiResponse();
        if (todoStatus == 0) {
            return response.setResCode("1111");
        }
        return response.setData(name);
    }

    // 투두를 지워준다.
    public ApiResponse deleteTodo(Integer todoId) {
        Integer todoStatus = mapper.deleteTodo(todoId);
        ApiResponse response = new ApiResponse();
        if (todoStatus == 0) {
            return response.setResCode("1111");
        }
        return response;
    }
}
