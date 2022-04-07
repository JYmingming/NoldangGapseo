package com.noldangGapseo.domain;


import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ApiResponse {
// 실패시
// resCode = "0000"
// resStatus = "fail"


 private String resCode = "1111";
 private String resStatus = "success";

}
