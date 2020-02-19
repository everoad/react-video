package com.bjkim.video.server.lib;

import java.util.Arrays;



public enum ApiType {

  YOUTUBE("youtube", 1),
  TWITCH("twitch", 2),
  EMPTY("empty", 3);

  private String type;
  private int test;

  private ApiType(String type, int test) {
    this.type = type;
    this.test = test;
  }

  public static ApiType findApiType(String type) {
    return Arrays.asList(ApiType.values()).stream().filter(one -> one.type.equals(type)).findAny().orElse(EMPTY);
  }

  /**
   * @return the test
   */
  public int getTest() {
    return test;
  }


  /**
   * @return the type
   */
  public String getType() {
    return type;
  }

}