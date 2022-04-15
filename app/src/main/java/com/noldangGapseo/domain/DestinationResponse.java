package com.noldangGapseo.domain;

import lombok.*;

import java.util.List;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class DestinationResponse {

    private Destination destination;
    private List<Comment> commentList;
    private List<DestinationImg> destinationImgList;
}
