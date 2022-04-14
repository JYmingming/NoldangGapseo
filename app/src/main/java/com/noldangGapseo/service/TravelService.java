package com.noldangGapseo.service;


import com.noldangGapseo.dao.TravelDao;
import com.noldangGapseo.domain.Cost;
import com.noldangGapseo.domain.Todo;
import com.noldangGapseo.domain.Travel;
import com.noldangGapseo.domain.TravelResponse;
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

    public List<Cost> costList(Integer travelId) {
        return mapper.costList(travelId);
    }

    public List<Todo> todoList(Integer travelId){
        return mapper.todoList(travelId);
    }
}
