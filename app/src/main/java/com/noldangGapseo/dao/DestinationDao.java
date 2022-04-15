package com.noldangGapseo.dao;

import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.Comment;
import com.noldangGapseo.domain.DestinationImg;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DestinationDao {

 List<Destination> getUsersDesList();

 List<Destination> getAdminDesList();

 Destination getDes(Integer desId);

 List<Destination> getUserDesList(Integer userId);

 List<Comment> getUserCommentList(Integer desId);

 List<Comment> getNoldangCommentList(Integer desId);

 List<DestinationImg> getImg(Integer desId);


}
