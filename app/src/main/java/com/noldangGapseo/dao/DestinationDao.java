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

  Integer updateDes(Destination destination);

  Integer addImgList(@Param("userId") Integer userId, @Param("imgName") String imgName);

  Integer deleteImg(Integer desId);

  Integer deleteDes(Integer desId);

  List<Destination> getUserDesList(@Param("userId") Integer userId, @Param("limit") Integer limit, @Param("offset") Integer offset);

  List<Comment> getUserCommentList(Integer desId);

  List<Comment> getNoldangCommentList(Integer desId);

  List<DestinationImg> getImg(Integer desId);

  Integer addLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  Integer deleteLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  //여행지 갯수 카운트
  Integer countAll();

  List<Destination> findAll(@Param("rowCount") int rowCount, @Param("offset") int offset);

  List<Destination> find8(@Param("rowCount") int rowCount, @Param("offset") int offset);

  Integer userDesCnt(Integer userId);

  Integer checkLike(@Param("desId") Integer desId, @Param("userId") Integer userId);

  Integer addNolComment(Comment comment);

  Integer addUserComment(Comment comment);

  Integer updateNolComment(Comment comment);

  Integer updateUserComment(Comment comment);

  String getNolCom(Integer commentId);

  String getUserCom(Integer commentId);

  Integer delNolCom(Integer commentId);

  Integer delUserCom(Integer commentId);

}