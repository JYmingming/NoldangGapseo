package com.noldangGapseo.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.noldangGapseo.domain.ApiResponse;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import com.noldangGapseo.service.DestinationService;


@RequestMapping("/destination")
@RestController
public class DestinationController {

  private static final Logger log = LogManager.getLogger();

  @Autowired
  DestinationService service;

  //놀당갑서의 여행지를 모두 가져온다.
  @GetMapping("/admin/list")
  List<Destination> getAdminDesList() {
    return service.getAdminDesList();
  }

  //유저들이 작성한 여행지 리스트를 가져온다.
  @GetMapping("/users/list")
  List<Destination> getUsersDesList() {
    return service.getUsersDesList();
  }

  // 여행지 하나를 가져온다.
  // type : 놀당 여행지 = N , 유저 여행지 = U
  @GetMapping("/getDes")
  DestinationResponse getDes(@RequestParam Integer desId, @RequestParam String type) {
    return service.getDes(desId, type);
  }

  // 메인 페이지의 4 여행지를 가져온다.
  @GetMapping("/get4Des")
  public List<Destination> get4Des() {
    return service.get4Des();
  }

  // 유저의 새로운 여행지 리스트를 가져온다.
  @GetMapping("/user/list")
  public List<Destination> getUserDesList(@RequestParam Integer userId) {
    return service.getUserDesList(userId);
  }

  // 여행지를 작성한다.

  @PostMapping("/add/destination")
  public ApiResponse addDestination(MultipartFile[] imgs, Destination destination) {
    ApiResponse response = new ApiResponse();
    ArrayList<String> imgList = new ArrayList<>();
    try{
      for (int i = 0; i < imgs.length; i++) {
        imgList.add(saveFile(imgs[i]));
      }
      destination.setImgList(imgList);
      return service.addDestination(destination);
    } catch (Exception e){
      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out.toString());
      return response.setResCode("1111").setResStatus("fail");
    }

  }

  // 여행지 이미지를 삭제한다.
  @DeleteMapping("/delete/img")
  public ApiResponse deleteImgs(@RequestParam Integer id){
    return service.deleteImgs(id);
  }

  // 여행지를 삭제한다.
  @DeleteMapping("/delete/des")
  public ApiResponse deleteDes(@RequestParam Integer id){
    return service.deleteDes(id);
  }

  // 좋아요 추가
  @PostMapping("/addLike")
  public Integer addLike(Integer desId, Integer userId) {
    return service.addLike(desId, userId);
  }

  // 좋아요 삭제
  @DeleteMapping("/deleteLike")
  public Integer deleteLike(Integer desId, Integer userId) {
    return service.deleteLike(desId, userId);
  }

  // 이미지 추가
  private String saveFile(MultipartFile imgs) throws Exception {
    if (imgs != null && imgs.getSize() > 0) {
      // 파일을 저장할 때 사용할 파일명을 준비한다.
      String filename = UUID.randomUUID().toString();

      // 파일명의 확장자를 알아낸다.
      int dotIndex = imgs.getOriginalFilename().lastIndexOf(".");
      if (dotIndex != -1) {
        filename += imgs.getOriginalFilename().substring(dotIndex);
      }

      // 파일을 지정된 폴더에 저장한다.
      File photoFile = new File("./src/main/resources/static/img/destination/userDesImg/" + filename); // App 클래스를 실행하는 프로젝트 폴더
      imgs.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

      return filename;

    } else {
      return null;
    }
  }


  // img 가져오기
  @GetMapping("/img")
  public ResponseEntity<Resource> getImg(String filename) {
    try {
      File downloadFile = new File("./src/main/resources/static/img/destination/userDesImg/" + filename);
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath());
      InputStreamResource resource = new InputStreamResource(fileIn);


      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");


      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);


      return ResponseEntity.ok()
          .headers(header)
          .contentLength(downloadFile.length())
          .contentType(MediaType.APPLICATION_OCTET_STREAM)
          .body(resource);

    } catch (Exception e) {

      return null;
    }
  }

}

