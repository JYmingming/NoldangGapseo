package com.noldangGapseo.domain;

import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public class DestinationComment {
//dd
    Integer commentId;
    Integer destinationId;
    Integer userId;
    String contents;
    Date regDate;
    Date updateDate;
}
