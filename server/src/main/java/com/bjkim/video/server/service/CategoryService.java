package com.bjkim.video.server.service;

import java.util.List;

import com.bjkim.video.server.domain.dto.CategoryDTO;

public interface CategoryService {

  public List<CategoryDTO.list> findCategoryList(String userId);
  
}