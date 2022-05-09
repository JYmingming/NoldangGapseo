package com.noldangGapseo.domain;

import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse extends ApiResponse{

   private List<Schedule> scheduleList;
   Integer period;
}
