package com.noldangGapseo.domain;

import lombok.*;

import java.util.List;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class NoldangDestinationResponse {

    private Destination destination;
    private DestinationComment destinationComment;
    private List<DestinationComment> destinationCommentList;
}
