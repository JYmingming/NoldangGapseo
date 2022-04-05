package com.noldangGapseo.domain;

import lombok.*;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Data
public class DestinationComment {

   private Integer commentId;
   private Integer destinationId;
   private Integer userId;
   private String nickName;
   private  String contents;
   private Date regDate;
   private Date updateDate;
}
