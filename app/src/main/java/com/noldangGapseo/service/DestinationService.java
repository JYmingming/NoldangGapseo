package com.noldangGapseo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.ApiResponse;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;

@Service
public class DestinationService {

  @Autowired
  DestinationDao mapper;

  // 놀당의 여행지 리스트를 가져온다.
  public List<Destination> getAdminDesList() {
    return mapper.getAdminDesList();
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

  // 메인 페이지의 4 여행지를 가져온다.
  public List<Destination> get4Des() {
    return mapper.get4Des();
  }


  // 유저가 작성한 여행지 리스트를 가져온다.
  public List<Destination> getUserDesList(Integer userId) {
    return mapper.getUserDesList(userId);
  }

  // 여행지 작성
  public ApiResponse addDestination(Destination destination) {
    ApiResponse apiResponse = new ApiResponse();
    Integer addResponse = mapper.addDestination(destination);
    if (addResponse == 0) {
      return apiResponse.setResCode("1111").setResStatus("fail");
    }
    List<String> imgList = destination.getImgList();
    for (String img : imgList) {
      mapper.addImgList(destination.getDestinationId(), img);
    }
    System.out.println(apiResponse);
    return apiResponse;
  }

  // 이미지 넣기


  // 좋아요 추가
  public Integer addLike(Integer desId, Integer userId) {
    return mapper.addLike(desId, userId);
  }

  // 좋아요 삭제
  public Integer deleteLike(Integer desId, Integer userId) {
    return mapper.deleteLike(desId, userId);
  }


}

