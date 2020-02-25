package com.bjkim.video.server.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Entity
@Table(name = "category")
@AllArgsConstructor
public class CategoryEntity {

  @Id
  @Column(name = "category_id")
  private int id;
  
  @Column(name = "keyword")
  private String keyword;
  
  @ManyToOne
	@JoinColumn(name ="user_id")
  private UserEntity user;

  public CategoryEntity() {}

}