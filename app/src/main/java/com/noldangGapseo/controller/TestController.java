package com.noldangGapseo.controller;

import com.noldangGapseo.domain.Tag;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {

    @RequestMapping("/test")
    public List<Tag> getTagList(@RequestBody List<Tag> tagList) {
        return tagList;
    }
}
