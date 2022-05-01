package com.noldangGapseo.service;

import java.util.List;

import com.noldangGapseo.domain.Comment;
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

    // 페이지 계산
    public Integer calculPage(Integer limit, Integer nextPage) {
        Integer page = 0;
        if (nextPage == 1) {
            return page = ((nextPage - 1) * (limit + 1));
        } else {
            return page = ((nextPage - 1) * (limit + 1)) - 1;
        }
    }

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
    public List<Destination> getUserDesList(Integer userId, Integer limit, Integer nextPage) {
        nextPage = calculPage(limit, nextPage);

        return mapper.getUserDesList(userId, limit, nextPage);
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
        return apiResponse;
    }

    public ApiResponse updateDes(Destination destination) {
        Integer updateRes = mapper.updateDes(destination);
        if (updateRes == 0) {
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

    // 이미지 삭제
    public ApiResponse deleteImgs(Integer imgId) {
        ApiResponse apiResponse = new ApiResponse();
        Integer response = mapper.deleteImg(imgId);
        if (response == 0) {
            return apiResponse.setResCode("1111").setResStatus("fail");
        }
        return apiResponse;
    }

    // 여행지 삭제
    public ApiResponse deleteDes(Integer desId) {
        ApiResponse apiResponse = new ApiResponse();
        if (mapper.deleteDes(desId) == 0) {
            return apiResponse.setResStatus("fail").setResCode("1111");
        }
        return apiResponse;
    }

    // 좋아요 추가
    public Integer addLike(Integer desId, Integer userId) {
        return mapper.addLike(desId, userId);
    }

    //여행지 갯수 카운트
    public Integer countAll() {
        return mapper.countAll();
    }

    //여행지 8개씩 페이징
    public List<Destination> findAll(int rowCount, int offset) {
        return mapper.findAll(rowCount, offset);
    }

    //여행지 8개씩 페이징
    public List<Destination> find8(int rowCount, int offset) {
        return mapper.find8(rowCount, (offset - 1) * 8 + 1); //여행지가 1개씩 이동하는 문제 때문에 작성
    }

    // 좋아요 삭제
    public Integer deleteLike(Integer desId, Integer userId) {
        return mapper.deleteLike(desId, userId);
    }

    // 게시글 수
    public Integer userDesCnt(Integer userId) {
        return mapper.userDesCnt(userId);
    }

    // 좋아요 체크
    public Integer checkLike(Integer desId, Integer userId) {
        return mapper.checkLike(desId, userId);
    }

    // 댓글 추가
    public ApiResponse addComment(Comment comment, String type) {
        Integer mapperRes = 0;
        if (type.equals("N")) {
            mapperRes = mapper.addNolComment(comment);
        } else {
            mapperRes = mapper.addUserComment(comment);
        }
        if (mapperRes == 0) {
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

    // 댓글 수정
    public ApiResponse updateComment(Comment comment, String type) {
        Integer mapperRes = 0;
        if (type.equals("N")) {
            mapperRes = mapper.updateNolComment(comment);
        } else {
            mapperRes = mapper.updateUserComment(comment);
        }
        if (mapperRes == 0) {
            return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

    // 댓글 하나 가져오기
    public String getCom(Integer commentId, String type) {
        if (type.equals("N")) {
            return mapper.getNolCom(commentId);
        }
        return mapper.getUserCom(commentId);
    }

    // 댓글 지우기
    public ApiResponse delCom(Integer commentId, String type){
        Integer mapperRes = 0;
        if(type.equals("N")){
            mapperRes = mapper.delNolCom(commentId);
        } else {
            mapperRes = mapper.delUserCom(commentId);
        }
        if(mapperRes == 0){
           return new ApiResponse("1111", "fail", null);
        }
        return new ApiResponse();
    }

}


