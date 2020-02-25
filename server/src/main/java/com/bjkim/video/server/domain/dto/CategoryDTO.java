package com.bjkim.video.server.domain.dto;

import lombok.Getter;
import lombok.Setter;

public class CategoryDTO {


  @Getter
  @Setter
  public static class list {
    
    private int id;
    private String keyword;
    private UserDTO.one user;

  }

}