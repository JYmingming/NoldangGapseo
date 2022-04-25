package com.noldangGapseo.service;

import com.noldangGapseo.dao.TagDao;
import com.noldangGapseo.domain.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    TagDao mapper;

    public List<Tag> defaultTagList() {
        return mapper.defaultTagList();
    }

}
