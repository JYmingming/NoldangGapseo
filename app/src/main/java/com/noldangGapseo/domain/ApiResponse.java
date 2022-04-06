package com.noldangGapseo.domain;


import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ApiResponse {
// 실패시
// resCode = "1111"
// resStatus = "fail"


 private String resCode = "0000";
 private String resStatus = "success";
}
