package com.bjkim.video.server.controller;

import java.util.List;

import com.bjkim.video.server.domain.dto.CategoryDTO;
import com.bjkim.video.server.service.CategoryService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class CategoryController {

  private CategoryService cateSvc;

  @GetMapping("/category/{userId}")
  public List<CategoryDTO.list> getCategoryList(@PathVariable String userId) {
    return cateSvc.findCategoryList(userId);
  }
}