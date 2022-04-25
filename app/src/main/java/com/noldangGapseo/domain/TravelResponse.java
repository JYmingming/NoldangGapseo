package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelResponse {
    private Travel travel;
    private List<Tag> tagList;
    private List<Companion> companionList;
    private List<Todo> todoList;
    private List<Cost> costList;
}
