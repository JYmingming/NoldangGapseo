package com.noldangGapseo.domain;


import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ApiResponse {

 private String resCode = "0000";
 private String resStatus = "success";
}
