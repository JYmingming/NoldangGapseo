package com.noldangGapseo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import com.noldangGapseo.paging.Criteria;

@Service
public class DestinationService {

  @Autowired
  DestinationDao mapper;

  // 놀당의 여행지 리스트를 가져온다.
  public List<Destination> getAdminDesList() {
    return mapper.getAdminDesList();
  }

  // 페이징 연습
  public List<Destination> getAdminDesList1(Criteria criteria) {
    return mapper.getAdminDesList1(criteria);
  }


  // 유저들의 여행지 리스트를 가져온다.
  public List<Destination> getUsersDesList() {
    return mapper.getUsersDesList();
  }

  // 여행지 하나를 가져온다.
  public DestinationResponse getDes(Integer desId, String type) {

    return DestinationResponse.builder()
        .destination(mapper.getDes(desId))
        .commentList(type.equals("N") ? mapper.getNoldangCommentList(desId) : mapper.getUserCommentList(desId))
        .destinationImgList(mapper.getImg(desId))
        .build();
  }

  // 유저의 새로운 여행지 리스트를 가져온다.
  public List<Destination> getUserDesList(Integer userId) {
    return mapper.getUserDesList(userId);
  }


}
