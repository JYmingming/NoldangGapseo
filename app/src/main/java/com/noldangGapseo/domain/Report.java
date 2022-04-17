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
public class Report {


  private String postType;
  private String postId;
  private String userId;
  private String email;
  private String phone;
  private Date regDate;
  private String nickname;
  private String contents;
  private String reportId;



}
