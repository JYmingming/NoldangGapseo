package com.noldangGapseo.domain;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Accessors(chain = true) 

public class ReportResponse {

  private Report reportuser;
  private Integer userCnt;
  private List<Report> reportuserList;
}
