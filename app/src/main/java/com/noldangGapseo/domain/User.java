package com.noldangGapseo.domain;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class User {


  private Integer userId;
  private String nickName;
  private String password;
  private String email;
  private String phone;
  private String regDate;
  private Date updateDate;
  private String profileImg;



}
