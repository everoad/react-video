package com.bjkim.video.server.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchDTO {

  private String channelId;
  private String keyword;
  private String token;

}