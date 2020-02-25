package com.bjkim.video.server.domain.dto;

import java.util.function.Function;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<V> {

  private int code;
  private V data;

  public <T> ApiResponse(Function<T, V> func) {
    this.code = 200;
    this.data = func.apply(null);
  }

}