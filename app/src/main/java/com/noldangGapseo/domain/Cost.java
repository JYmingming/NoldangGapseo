package com.noldangGapseo.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cost {

    private Integer costId;
    private String name;
    private Integer cost;
}
