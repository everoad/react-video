package com.bjkim.video.server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationConfig {




  @Bean
  public RestTemplate youtubeRestTemplate() {
    RestTemplate template = new RestTemplate();
    return template;
  }


  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

}