package com.noldangGapseo.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.noldangGapseo.domain.Comment;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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


    //유저 여행지 페이징 관련
    @GetMapping("/admin/pagelist")
    List<Destination> getAdminDesList1(
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "8") int pageSize,
            Map<String, Object> model) throws Exception {

        int totalPageSize = 0;

        try { // pageSize 파라미터 값이 있다면 기본 값을 변경한다.
            if (pageSize < 5 || pageSize > 100) {
                pageSize = 5;
            }
        } catch (Exception e) {
        }

        //게시글 전체 개수를 알아내서 페이지 개수를 계산한다.

        Integer destinationSize = service.countAll();

        totalPageSize = destinationSize / pageSize; // 예: 게시글개수 / 페이지당개수 = 16 / 5 = 3
        System.out.println(totalPageSize);
        if ((destinationSize % pageSize) > 0) {
            totalPageSize++;
        }

        try { // pageNo 파라미터 값이 있다면 기본 값을 변경한다.
            if (pageNo < 1 || pageNo > totalPageSize) {// pageNo 유효성 검증
                pageNo = 0;
            }
        } catch (Exception e) {
        }

        // 2) 서비스 객체 실행
        //List<Destination> destinations = service.findAll(pageSize, pageNo);
        List<Destination> destinations = service.find8(pageSize, pageNo);
        //    List<Destination> destinations = service.findAll(8, 2);
        // 3) 출력 데이터 준비
        model.put("list", destinations);
        model.put("pageNo", pageNo);
        model.put("pageSize", pageSize);
        model.put("totalPageSize", totalPageSize);


        System.out.println(totalPageSize);
        return destinations;
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

    // 유저가 작성한 여행지 리스트를 가져온다.
    @GetMapping("/user/list")
    public List<Destination> getUserDesList(@RequestParam Integer userId,
                                            @RequestParam Integer limit,
                                            @RequestParam Integer nextPage) {
        return service.getUserDesList(userId, limit, nextPage);
    }

    // 유저가 작성한 여행지 리스트 갯수.
    @GetMapping("/user/cnt")
    public Integer userDesCnt(@RequestParam Integer userId) {
        return service.userDesCnt(userId);
    }

    // 여행지를 작성한다.
    @PostMapping("/add/destination")
    public ApiResponse addDestination(MultipartFile[] imgs, Destination destination) {
        ApiResponse response = new ApiResponse();
        ArrayList<String> imgList = new ArrayList<>();
        try {
            for (int i = 0; i < imgs.length; i++) {
                imgList.add(saveFile(imgs[i]));
            }
            destination.setImgList(imgList);
            return service.addDestination(destination);
        } catch (Exception e) {
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
            log.error(out.toString());
            return response.setResCode("1111").setResStatus("fail");
        }

    }

    // 여행지를 업데이트 한다.
    @PutMapping("/update/des")
    public ApiResponse updateDes(@RequestBody Destination destination) {
        return service.updateDes(destination);
    }

    // 여행지 이미지를 삭제한다.
    @DeleteMapping("/delete/img")
    public ApiResponse deleteImgs(@RequestParam Integer id) {
        return service.deleteImgs(id);
    }

    // 여행지를 삭제한다.
    @DeleteMapping("/delete/des")
    public ApiResponse deleteDes(@RequestParam Integer id) {
        return service.deleteDes(id);
    }

    // 좋아요 추가
    @PostMapping("/addLike")
    public Integer addLike(@RequestParam  Integer desId, @RequestParam Integer userId) {
        return service.addLike(desId, userId);
    }

    // 좋아요 삭제
    @DeleteMapping("/deleteLike")
    public Integer deleteLike(@RequestParam Integer desId, @RequestParam Integer userId) {
        return service.deleteLike(desId, userId);
    }

    // 좋아요 체크
    @GetMapping("check/like")
    public ApiResponse checkLike(@RequestParam Integer desId, @RequestParam Integer userId) {
        return new ApiResponse().setData(service.checkLike(desId, userId));
    }

    // 댓글 추가
    // type : 놀당 여행지 = N , 유저 여행지 = U
    @PostMapping("add/comment")
    public ApiResponse addComment(@RequestBody Comment comment, @RequestParam String type) {
        return service.addComment(comment, type);
    }

    // 댓글 수정
    @PostMapping("update/comment")
    public ApiResponse updateComment(@RequestBody Comment comment, @RequestParam String type) {
        return service.updateComment(comment, type);
    }

    // 댓글 하나를 가져온다.
    @GetMapping("get/com")
    public String getCom(@RequestParam Integer commentId, @RequestParam String type) {
        return service.getCom(commentId, type);
    }

    // 댓글 삭제
    @DeleteMapping("delete/com")
    public ApiResponse delCom(@RequestParam Integer commentId, @RequestParam String type){
        return service.delCom(commentId, type);
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

