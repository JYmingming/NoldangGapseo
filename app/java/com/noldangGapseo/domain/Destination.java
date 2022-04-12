package com.noldangGapseo.domain;

import org.springframework.stereotype.Repository;

import java.sql.Date;


@Repository
public class Destination {
//ss
    Integer destinationId;
    Integer userId;
    String nickName;
    Integer destinationTypeId;
    String destinationTypeName;
    String destinationName;
    String contents;
    String phone;
    Float latitude;
    Float longitude;
    String address;
    Date regDate;
    Date updateDate;

    @Override
    public String toString() {
        return "Destination{" +
                "destinationId=" + destinationId +
                ", userId=" + userId +
                ", nickName='" + nickName + '\'' +
                ", destinationTypeId=" + destinationTypeId +
                ", destinationTypeName='" + destinationTypeName + '\'' +
                ", destinationName='" + destinationName + '\'' +
                ", contents='" + contents + '\'' +
                ", phone='" + phone + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", address='" + address + '\'' +
                ", regDate=" + regDate +
                ", updateDate=" + updateDate +
                '}';
    }

    public Integer getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Integer destinationId) {
        this.destinationId = destinationId;
    }

    public Integer getDestinationTypeId() {
        return destinationTypeId;
    }

    public void setDestinationTypeId(Integer destinationTypeId) {
        this.destinationTypeId = destinationTypeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getRegDate() {
        return regDate;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getDestinationTypeName() {
        return destinationTypeName;
    }

    public void setDestinationTypeName(String destinationTypeName) {
        this.destinationTypeName = destinationTypeName;
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
}
