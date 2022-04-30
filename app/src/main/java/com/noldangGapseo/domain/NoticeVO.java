package com.noldangGapseo.domain;

import java.sql.Date;
import org.springframework.stereotype.Repository;

@Repository

public class NoticeVO {
  Date regdate;
  Integer viewcount;
  String contents;
  Integer servicecenterid;
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

  public Integer getServicecenterid() {
    return servicecenterid;
  }
  public void setSevicecenterid(Integer servicecenterid) {
    this.servicecenterid = servicecenterid;
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
        + ", servicecenterid=" + servicecenterid + ", title=" + title + ", nickname=" + nickname
        + "]";
  }

}