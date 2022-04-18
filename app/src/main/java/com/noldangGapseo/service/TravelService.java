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

    public List<Travel> travelList(String nickName) {
        return mapper.travelList(nickName);
    }

    public TravelResponse getTravel(Integer travelId) {
        Travel travelOne = mapper.getTravel(travelId);

        return TravelResponse.builder().
                travel(travelOne).
                companionList(mapper.companionList(travelId)).
                todoList(mapper.todoLength3(travelId)).build();
    }

    public ApiResponse updateName(String name, Integer id){
        Integer status = mapper.updateName(name, id);
        ApiResponse response = new ApiResponse();
        if(status == 0){
            return response.setResCode("1111");
        }
        return response.setData(name);
    }

    public List<Cost> costList(Integer travelId) {
        return mapper.costList(travelId);
    }

    public List<Todo> todoList(Integer travelId){
        return mapper.todoList(travelId);
    }

    public ApiResponse setTodoStatus(Integer status, Integer todoId){
       Integer todoStatus = mapper.setTodoStatus(status, todoId);
       ApiResponse response = new ApiResponse();
        if(todoStatus == 0){
           return response.setResCode("1111");
        }
        return response;
    }

    public ApiResponse setTodoName(String name, Integer todoId){
        Integer todoStatus = mapper.setTodoName(name, todoId);
        ApiResponse response = new ApiResponse();
        if(todoStatus == 0){
            return response.setResCode("1111");
        }
        return response;
    }

    public ApiResponse deleteTodo(Integer todoId){
        Integer todoStatus = mapper.deleteTodo(todoId);
        ApiResponse response = new ApiResponse();
        if(todoStatus == 0){
            return response.setResCode("1111");
        }
        return response;
    }
}
