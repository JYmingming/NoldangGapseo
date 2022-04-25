package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {

    private Integer scheduleId;
    private Integer destinationId;
    private String destinationName;
    private String contents;
    private String typeName;
    private double latitude;
    private double longitude;
    private Integer routeIndex;

}
