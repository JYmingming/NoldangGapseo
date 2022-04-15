package com.noldangGapseo.domain;

import lombok.*;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

   private Integer commentId;
   private Integer destinationId;
   private Integer userId;
   private String nickName;
   private String contents;
   private Date regDate;
   private Date updateDate;
}
