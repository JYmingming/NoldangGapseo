package com.noldangGapseo.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Accessors(chain = true)
public class ApiResponse {
  // 실패시
  // resCode = "1111"
  // resStatus = "fail"
  private String resCode = "0000";
  private String resStatus = "success";
  private  Object data;
}
