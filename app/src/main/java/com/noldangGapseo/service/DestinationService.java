package com.noldangGapseo.service;

import com.noldangGapseo.dao.DestinationDao;
import com.noldangGapseo.domain.Destination;
import com.noldangGapseo.domain.NoldangDestinationResponse;
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

    // 유저들의 여행지 리스트를 가져온다.
   public List<Destination> getUsersDesList() {
       return mapper.getUsersDesList();
    }

    // 유저의 여행지 하나를 가져온다.
   public Destination getUserDes(Integer desId){
       return mapper.getUserDes(desId);
   }

   // 유저의 새로운 여행지 리스트를 가져온다.
   public List<Destination> getUserDesList(Integer userId){
        return mapper.getUserDesList(userId);
   }

   
   
   public NoldangDestinationResponse getNoldangDes(Integer desId){
        return NoldangDestinationResponse.builder().destination(mapper.getNoldangDes(desId))
                .destinationCommentList(mapper.getNoldangDesComment(desId)).build();
   }
   
   


}
