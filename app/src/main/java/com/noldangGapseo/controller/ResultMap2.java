package com.noldangGapseo.controller;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ResultMap2 {

  public static final String SUCCESS = "success";
  public static final String FAIL = "fail";

  private String status;
  private Object data;

  //페이징
  private int pageNo; //요청한 페이지번호
  private int totalPageSize; //전체 페이지 개수
  private int totalListCount; //전체 글 개수

  //게시글 번호
  private int no;
}