package com.noldangGapseo.domain;

import java.util.Date;

import lombok.*;
import org.springframework.stereotype.Repository;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class User {


  private Integer userId;
  private String id;
  private String nickName;
  private String password;
  private String email;
  private String phone;
  private Date regDate;
  private Date updateDate;
  private String profileImg;


}
