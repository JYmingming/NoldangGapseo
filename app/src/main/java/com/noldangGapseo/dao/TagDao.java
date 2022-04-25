package com.noldangGapseo.dao;

import com.noldangGapseo.domain.Tag;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagDao {

    public List<Tag> defaultTagList();

    public List<Tag> travelTagList(Integer id);


}
