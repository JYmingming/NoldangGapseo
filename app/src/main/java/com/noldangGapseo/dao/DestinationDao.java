package com.noldangGapseo.dao;

import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DestinationDao {

 List<Destination> getUsersDesList();

 List<Destination> getAdminDesList();

 Destination getUserDes(Integer desId);

 Destination getNoldangDes(Integer desId);

 List<DestinationComment> getNoldangDesComment(Integer desId);

 List<Destination> getUserDesList(Integer userId);


}
