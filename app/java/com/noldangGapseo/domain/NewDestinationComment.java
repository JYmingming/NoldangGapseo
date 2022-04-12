package com.noldangGapseo.domain;


import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public class NewDestinationComment {

    Integer newDestinationId;
    Integer userId;
    Integer destinationId;
    String contents;
    Date regDate;
    Date updateDate;

    @Override
    public String toString() {
        return "NewDestinationComment{" +
                "newDestinationId=" + newDestinationId +
                ", userId=" + userId +
                ", destinationId=" + destinationId +
                ", contents='" + contents + '\'' +
                ", regDate=" + regDate +
                ", updateDate=" + updateDate +
                '}';
    }

    public Integer getNewDestinationId() {
        return newDestinationId;
    }

    public void setNewDestinationId(Integer newDestinationId) {
        this.newDestinationId = newDestinationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Integer destinationId) {
        this.destinationId = destinationId;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
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
}
