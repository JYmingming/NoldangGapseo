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
public class Invite {


  private Integer inviteId;
  private String userNickName;
  private String invitedNickName;
  private String travelName;
  private String nickName;
}
