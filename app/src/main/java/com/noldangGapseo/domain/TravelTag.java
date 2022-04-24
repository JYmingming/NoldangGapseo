package com.noldangGapseo.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper=false)
public class TravelTag extends ApiResponse{
    private Integer travelId;
    private List<Tag> tagList;
}
