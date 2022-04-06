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

  Integer userId;
  String id;
  String nickName;
  String password;
  String email;
  String phone;
  Date regDate;
  Date updateDate;
  String profileImg;

}
