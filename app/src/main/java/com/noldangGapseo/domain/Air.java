package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Air {
  String AirType;
  String AirUrl;
  Integer AirPrice;
  String AirStartTime;
  String AirEndTime;
  Integer AirFlag;

}