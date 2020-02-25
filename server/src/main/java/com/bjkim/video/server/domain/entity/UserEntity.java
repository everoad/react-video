package com.bjkim.video.server.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bjkim.video.server.domain.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;



@Builder
@Getter
@Entity
@Table(name="user")
@AllArgsConstructor
public class UserEntity {

  @Id
  @Column(name = "user_id")
  private String id;
  
  @Column(name = "password")
  private String passwd;

  @Column(name = "user_nm")
  private String name;

  @Column(name = "type")
  private String type;

  @Column(name = "picture")
  private String picture;
  
  public UserEntity() {}

  public void update(UserDTO.save userDTO) {
    this.passwd = userDTO.getPassword();
    this.name = userDTO.getName();
    this.type = userDTO.getType();
    this.picture = userDTO.getPicture();
  }
}