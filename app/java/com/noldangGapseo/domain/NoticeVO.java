package com.noldangGapseo.domain;

import java.util.Date;
import org.springframework.stereotype.Repository;

/* 번호 : service_senter_id
 * 제목 : title
 * 등록일 : reg_date
 * 조회수 : view_count
 * 게시글 : contents
 */

@Repository
public class NoticeVO {
  Date regdate;
  Integer viewcount;
  String contents;
  Integer sevice_senter_id;
  String title;

  @Override
  public String toString() {
    return "NoticeVO [sevice_senter_id=" + sevice_senter_id + ", title=" + title + ", regdate="
        + regdate + ", viewcount=" + viewcount + ", contents=" + contents + "]";
  }

  public Integer getSevice_senter_id() {
    return sevice_senter_id;
  }
  public void setSevice_senter_id(Integer sevice_senter_id) {
    this.sevice_senter_id = sevice_senter_id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public Date getReg_date() {
    return regdate;
  }
  public void setReg_date(Date regdate) {
    this.regdate = regdate;
  }
  public Integer getView_count() {
    return viewcount;
  }
  public void setView_count(Integer viewcount) {
    this.viewcount = viewcount;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }

}
