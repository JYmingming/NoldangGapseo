package com.noldangGapseo.controller;

import com.noldangGapseo.domain.Tag;
import com.noldangGapseo.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/tag")
public class TagController {

@Autowired
    TagService service;

@GetMapping("/list")
public List<Tag> defaultTagList(){
    return service.defaultTagList();
}

}
