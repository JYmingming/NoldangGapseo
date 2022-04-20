package com.noldangGapseo.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cost {

    private Integer costId;
    private String name;
    private Integer cost;
    private Integer travelId;
}
