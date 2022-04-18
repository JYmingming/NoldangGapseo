package com.noldangGapseo.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.noldangGapseo.domain.NoticeVO;

@Mapper
public interface NoticeBoardDao {

  //@Select("SELECT * FROM noldang.service_center")
  List<NoticeVO> getNoticeList(String type);

}
