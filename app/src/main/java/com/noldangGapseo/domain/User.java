package com.noldangGapseo.domain;

import java.util.Date;
import org.springframework.stereotype.Repository;

@Repository
public class User {

  Integer userId;
  String id;
  String nickName;
  String email;
  String phone;
  Date regDate;
  Date updateDate;
  String profileImg;
//ssss
  @Override
  public String toString() {
    return "User [userId=" + userId + ", id=" + id + ", nickName=" + nickName + ", email=" + email
        + ", phone=" + phone + ", regDate=" + regDate + ", updateDate=" + updateDate
        + ", profileImg=" + profileImg + "]";
  }


  public Integer getUserId() {
    return userId;
  }
  public void setUserId(Integer userId) {
    this.userId = userId;
  }
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getNickName() {
    return nickName;
  }
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPhone() {
    return phone;
  }
  public void setPhone(String phone) {
    this.phone = phone;
  }
  public Date getRegDate() {
    return regDate;
  }
  public void setRegDate(Date regDate) {
    this.regDate = regDate;
  }
  public Date getUpdateDate() {
    return updateDate;
  }
  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }
  public String getProfileImg() {
    return profileImg;
  }
  public void setProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

}
