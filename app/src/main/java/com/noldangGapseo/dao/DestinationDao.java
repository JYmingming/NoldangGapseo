package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.Comment;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationImg;
import com.noldangGapseo.paging.Criteria;

@Mapper
public interface DestinationDao {

  List<Destination> getUsersDesList();

  List<Destination> getAdminDesList();

  //페이징 연습
  List<Destination> getAdminDesList1(Criteria criteria);

  Destination getDes(Integer desId);

  List<Destination> getUserDesList(Integer userId);

  List<Comment> getUserCommentList(Integer desId);

  List<Comment> getNoldangCommentList(Integer desId);

  List<DestinationImg> getImg(Integer desId);


}
