package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {

    Integer destinationId;
    Integer userId;
    String nickName;
    Integer destinationTypeId;
    String destinationTypeName;
    String destinationName;
    String contents;
    String phone;
    Float latitude;
    Float longitude;
    String address;
    Integer likesCnt;
    Integer commentsCnt;
    Date regDate;
    Date updateDate;
}
