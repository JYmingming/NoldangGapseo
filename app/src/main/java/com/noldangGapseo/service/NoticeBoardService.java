package com.noldangGapseo.service;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.noldangGapseo.dao.NoticeBoardDao;
import com.noldangGapseo.domain.NoticeVO;

@Service
public class NoticeBoardService {


  @Autowired
  NoticeBoardDao mapper;

  // 놀당의 여행지 리스트를 가져온다.
  public List<NoticeVO> getNoticeList(String type) {
    return  mapper.getNoticeList(type);
  }

  public void regist(HashMap<String, String> map) {
    mapper.regist(map);
  }


  public void delete(Integer service_center_id) throws Exception {
    mapper.delete(service_center_id);
  }


}