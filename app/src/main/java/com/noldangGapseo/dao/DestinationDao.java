package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.noldangGapseo.domain.Comment;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationImg;


@Mapper
public interface DestinationDao {

  List<Destination> getUsersDesList();

  List<Destination> getAdminDesList();


  Destination getDes(Integer desId);

  List<Destination> get4Des();


  Integer addDestination(Destination destination);


  List<Destination> getUserDesList(Integer userId);

  List<Comment> getUserCommentList(Integer desId);

  List<Comment> getNoldangCommentList(Integer desId);


  List<DestinationImg> getImg(Integer desId);


  Integer addLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  Integer deleteLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  //여행지 갯수 카운트
  Integer countAll();

  List<Destination> findAll(@Param("rowCount") int rowCount, @Param("offset") int offset);

  List<Destination> find8(@Param("rowCount") int rowCount, @Param("offset") int offset);

}