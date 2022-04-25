package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse extends ApiResponse{

   private List<Schedule> scheduleList;
   Integer period;
}
