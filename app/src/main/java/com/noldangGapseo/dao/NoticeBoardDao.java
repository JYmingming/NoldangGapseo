package com.noldangGapseo.dao;

import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.NoticeVO;

@Mapper
public interface NoticeBoardDao {

  //@Select("SELECT * FROM noldang.service_center")
  List<NoticeVO> getNoticeList(String type);

  public void regist(HashMap<String, String> map);

  public void update(String String) throws Exception;


  public void delete(Integer service_center_id) throws Exception;


}
