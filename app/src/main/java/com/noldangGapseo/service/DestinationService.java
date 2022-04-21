package com.noldangGapseo.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import org.springframework.web.multipart.MultipartFile;

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
  public List<Destination> get4Des(){
    return mapper.get4Des();
  }


  // 유저의 새로운 여행지 리스트를 가져온다.
  public List<Destination> getUserDesList(Integer userId) {
    return mapper.getUserDesList(userId);
  }

  // 좋아요 추가
  public Integer addLike(Integer desId, Integer userId){
    return mapper.addLike(desId, userId);
  }

  // 좋아요 삭제
  public Integer deleteLike(Integer desId, Integer userId){
    return mapper.deleteLike(desId, userId);
  }

  // 이미지 추가
  public String saveFile(MultipartFile imgs) throws Exception {
    if (imgs != null && imgs.getSize() > 0) {
      // 파일을 저장할 때 사용할 파일명을 준비한다.
      String filename = UUID.randomUUID().toString();
      System.out.println(filename);

      // 파일명의 확장자를 알아낸다.
      int dotIndex = imgs.getOriginalFilename().lastIndexOf(".");
      if (dotIndex != -1) {
        filename += imgs.getOriginalFilename().substring(dotIndex);
      }

      // 파일을 지정된 폴더에 저장한다.
      File photoFile = new File("/static/img/destination/userDesImg" + filename); // App 클래스를 실행하는 프로젝트 폴더
      imgs.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

      return filename;

    } else {
      return null;
    }
  }
}

