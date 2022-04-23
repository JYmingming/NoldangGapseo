package com.noldangGapseo.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


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
  String thumbNailImg;
  List<String> imgList;
  Date regDate;
  Date updateDate;
}