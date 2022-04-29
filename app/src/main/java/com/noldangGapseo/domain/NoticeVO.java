package com.noldangGapseo.domain;

import java.sql.Date;
import org.springframework.stereotype.Repository;

@Repository

public class NoticeVO {
  Date regdate;
  Integer viewcount;
  String contents;
  Integer sevice_center_id;
  String title;
  String nickname;

  public Date getRegdate() {
    return regdate;
  }

  public void setRegdate(Date regdate) {
    this.regdate = regdate;
  }

  public Integer getViewcount() {
    return viewcount;
  }

  public void setViewcount(Integer viewcount) {
    this.viewcount = viewcount;
  }

  public String getNick_name() {
    return nickname;
  }

  public void setNick_name(String nickname) {
    this.nickname = nickname;
  }

  public Integer getSevice_senter_id() {
    return sevice_center_id;
  }
  public void setSevice_senter_id(Integer sevice_center_id) {
    this.sevice_center_id = sevice_center_id;
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

  @Override
  public String toString() {
    return "NoticeVO [regdate=" + regdate + ", viewcount=" + viewcount + ", contents=" + contents
        + ", sevice_center_id=" + sevice_center_id + ", title=" + title + ", nickname=" + nickname
        + "]";
  }

}