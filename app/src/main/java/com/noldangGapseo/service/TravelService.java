package com.noldangGapseo.service;


import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

import com.noldangGapseo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.TagDao;
import com.noldangGapseo.dao.TravelDao;

@Service
public class TravelService {

    @Autowired
    TravelDao mapper;

    @Autowired
    TagDao tagMapper;

    // 유저의 여행 리스틑 불러온다.
    public List<Travel> travelList(String nickName, Integer companionId) {
        return mapper.travelList(nickName, companionId);
    }

    // 여행 하나를 불러온다.
    // 동행자와 투두리스트 3개를 불러온다.
    public TravelResponse getTravel(Integer travelId) {
        Travel travelOne = mapper.getTravel(travelId);

        return TravelResponse.builder().
                travel(travelOne).
                companionList(mapper.companionList(travelId)).
                todoList(mapper.todoLength3(travelId)).
                tagList(tagMapper.travelTagList(travelId))
                .build();
    }

    // 여행을 생성한다.
    public ApiResponse addTravel(Travel travel) {
        ApiResponse apiResponse = new ApiResponse();
        Integer addResponse = mapper.addTravel(travel);
        if (addResponse == 0) {
            apiResponse.setResCode("1111").setResStatus("fail");
        }
        return apiResponse.setData(travel.getTravelId());
    }

    // 여행 태그 설정
    public ApiResponse addTag(Integer travelId, List<Tag> tagList) {
        Integer response = null;
        for (Tag tag : tagList) {
            response = mapper.addTag(travelId, tag.getTagId());
        }
        if (response == 0) {
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

    // 여행 루트 설정
    public ApiResponse setRoute(Integer travelId, Integer days, List<Tag> list) {
        System.out.println(list);
        ArrayList<Integer> tagList = new ArrayList<>();
        for (Tag tag : list) {
            tagList.add(tag.getTagId());
        }
        System.out.println(tagList);
        Integer response = null;
        for (int i = 0; i < days; i++) {
            Integer day = i + 1;
            response = mapper.setRoute(travelId, day, tagList);
        }
        System.out.println(response);
        return new ApiResponse();
    }

    // 여행의 루트를 날짜별로 가져온다.
    public List<Schedule> getRoute(Integer travelId, Integer day) {
        return mapper.getRoute(travelId, day);
    }

    // 루트 순서를 바꿔준다.
    public ApiResponse updateRoute(List<Integer> idList){
        Integer mapperRes = null;
        for (int i = 0; i < idList.size(); i++) {
            Integer routeIndex = i+1;
            Integer id = idList.get(i);
           mapperRes = mapper.updateRoute(routeIndex, id);
        }
        if(mapperRes == 0){
            return new ApiResponse("1111","fali",null);
        }
        return new ApiResponse();
    }

    // 여행의 기간을 가져온다.
    public Integer getPeriod(Integer travelId) {
        return mapper.getPeriod(travelId);
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

    // 여행을 지운다.
    public ApiResponse deleteTravel(Integer traveId){
        Integer response = mapper.deleteTravel(traveId);
        if(response == 0){
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

    // 여행 초대 하기
    public ApiResponse invite(Integer travelId, Integer companionId){
        Integer response = mapper.invite(travelId, companionId);
        if(response == 0){
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }
}
