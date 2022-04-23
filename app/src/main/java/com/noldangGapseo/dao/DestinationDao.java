package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
<<<<<<< HEAD
import org.apache.ibatis.annotations.Param;
import com.noldangGapseo.domain.Comment;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationImg;
=======
import com.noldangGapseo.domain.Comment;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationImg;
import com.noldangGapseo.paging.Criteria;
>>>>>>> 755a86a62d12e4fc22b4e891d273cfa578f06a08

@Mapper
public interface DestinationDao {

  List<Destination> getUsersDesList();

  List<Destination> getAdminDesList();

<<<<<<< HEAD
  Destination getDes(Integer desId);

  List<Destination> get4Des();
=======
  //페이징 연습
  List<Destination> getAdminDesList1(Criteria criteria);

  Destination getDes(Integer desId);
>>>>>>> 755a86a62d12e4fc22b4e891d273cfa578f06a08

  List<Destination> getUserDesList(Integer userId);

  List<Comment> getUserCommentList(Integer desId);

  List<Comment> getNoldangCommentList(Integer desId);
<<<<<<< HEAD
=======

  List<DestinationImg> getImg(Integer desId);
>>>>>>> 755a86a62d12e4fc22b4e891d273cfa578f06a08

  List<DestinationImg> getImg(Integer desId);

  Integer addLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  Integer deleteLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  //여행지 갯수 카운트
  Integer countAll();

  List<Destination> findAll(@Param("rowCount") int rowCount, @Param("offset") int offset);

  List<Destination> find8(@Param("rowCount") int rowCount, @Param("offset") int offset);

}