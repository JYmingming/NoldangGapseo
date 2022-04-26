package com.noldangGapseo.domain;

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
public class Report {


  private String postType;
  private String postId;
  private String userId;
  private String email;
  private String phone;
  private String regDate;
  private String nickname;
  private String contents;
  private String reportId;
  private String address;


}
