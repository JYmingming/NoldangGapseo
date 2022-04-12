package com.noldangGapseo.service;

import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.NoldangDestinationResponse;
import com.noldangGapseo.domain.UserDestinationResponse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    @Autowired
    DestinationDao mapper;

    // 놀당의 여행지 리스트를 가져온다.
    public List<Destination> getAdminDesList() {
        return  mapper.getAdminDesList();
    }

    // 유저의 여행지 리스트를 가져온다.
   public List<Destination> getUserDesList() {
       return mapper.getUserDesList();
    }

    // 유저의 여행지 하나를 가져온다.
   public Destination getUserDesOne(Integer desId){
       return mapper.getUserDesOne(desId);
   }


   public NoldangDestinationResponse getNoldangDes(Integer desId){
        return NoldangDestinationResponse.builder().destination(mapper.getNoldangDes(desId))
                .destinationCommentList(mapper.getNoldangDesComment(desId)).build();
   }


}
