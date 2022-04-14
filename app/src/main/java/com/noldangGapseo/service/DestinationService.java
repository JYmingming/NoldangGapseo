package com.noldangGapseo.service;

import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.DestinationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
                .CommentList(type.equals("N") ? mapper.getNoldangCommentList(desId) : mapper.getUserCommentList(desId))
                .build();
    }

    // 유저의 새로운 여행지 리스트를 가져온다.
    public List<Destination> getUserDesList(Integer userId) {
        return mapper.getUserDesList(userId);
    }


}
