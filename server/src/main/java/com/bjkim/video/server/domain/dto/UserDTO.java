package com.bjkim.video.server.domain.dto;

import com.bjkim.video.server.domain.entity.UserEntity;

import lombok.Getter;
import lombok.Setter;

public class UserDTO {

  
  @Getter
  @Setter
  public static class list {

    private String id;
    private String name;
    private String type;

    public list() {}

    public UserEntity toEntity() {
      return UserEntity.builder()
              .id(id)
              .name(name)
              .type(type)
              .build();
    }

  }


  @Getter
  @Setter
  public static class save {
    private String id;
    private String name;
    private String password;
    private String type;
    private String picture;

    public save() {}

    public UserEntity toEntity() {
      return UserEntity.builder()
              .id(id)
              .name(name)
              .passwd(password)
              .type(type)
              .picture(picture)
              .build();
    }
  }


  @Getter
  @Setter
  public static class one {
    private String id;
    private String name;
    private String type;
    private String picture;

    public one() {}

    public UserEntity toEntity() {
      return UserEntity.builder()
              .id(id)
              .name(name)
              .type(type)
              .build();
    }
  }

}