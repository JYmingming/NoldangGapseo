package com.noldangGapseo.dao;

import java.util.List;

import com.noldangGapseo.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TravelDao {

  public List<Travel> travelList(@Param("nickName") String nickName,@Param("companionId") Integer companionId);

  public Travel getTravel(Integer travelId);

  public Integer addTravel(Travel travel);

  public Integer addTag(@Param("travelId") Integer travelId, @Param("tagId") Integer tagId);

  public Integer setRoute(@Param("travelId") Integer travelId, @Param("day") Integer day, @Param("tagList") List<Integer> tagList);

  public List<Schedule> getRoute(@Param("travelId") Integer travelId, @Param("day") Integer day);

  public Integer updateRoute(@Param("routeIndex") Integer routeIndex, @Param("id") Integer id);

  public Integer getPeriod(Integer travelId);

  public Integer updateName(@Param("name") String name, @Param("id") Integer id);

  public List<Companion> companionList(Integer travelId);

  public List<Todo> todoLength3(Integer travelId);

  public List<Todo> todoList(Integer travelId);

  public Integer addTodo(@Param("id") Integer id, @Param("name") String name);

  public Integer setTodoStatus(@Param("status") Integer status, @Param("todoId") Integer todoId);

  public Integer setTodoName(@Param("name") String name, @Param("todoId") Integer todoId);

  public Integer deleteTodo(Integer todoId);

  public List<Cost> costList(Integer travelId);

  public Integer addCost(Cost cost);

  public Integer setCost(Cost cost);

  public Integer deleteCost(Integer costId);

  public Integer deleteTravel(Integer travelId);

  public Integer invite(@Param("travelId") Integer travelId, @Param("companionId") Integer companionId);
}