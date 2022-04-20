package com.noldangGapseo.dao;

import com.noldangGapseo.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TravelDao {

    public List<Travel> travelList(String nickName);

    public Travel getTravel(Integer travelId);

    public Integer updateName(@Param("name") String name, @Param("id") Integer id);

    public List<Companion> companionList(Integer travelId);

    public List<Todo> todoLength3(Integer travelId);

    public List<Todo> todoList(Integer travelId);

    public Integer addTodo(@Param("id") Integer id, @Param("name") String name);

    public Integer setTodoStatus(@Param("status") Integer status, @Param("todoId") Integer todoId);

    public Integer setTodoName(@Param("name") String name, @Param("todoId") Integer todoId);

    public Integer deleteTodo(Integer todoId);

    public List<Cost> costList(Integer travelId);
}
