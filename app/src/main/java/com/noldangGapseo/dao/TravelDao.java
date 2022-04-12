package com.noldangGapseo.dao;

import com.noldangGapseo.domain.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TravelDao {

    public List<Travel> travelList(String nickName);

    public Travel getTravel(Integer travelId);

    public List<Companion> companionList(Integer travelId);

    public List<Todo> todoLength3(Integer travelId);

    public List<Todo> todoList(Integer travelId);

    public List<Cost> costList(Integer travelId);
}
