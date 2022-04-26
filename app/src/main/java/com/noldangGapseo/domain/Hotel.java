package com.noldangGapseo.domain;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Hotel {
  String hotelName; // ok
  Integer hotelPrice; // ok
  String hotelLocation; // ok
  String hotelComment; // ok
  ArrayList<String> imgUrl; // ok

}