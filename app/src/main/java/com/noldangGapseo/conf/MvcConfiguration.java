package com.noldangGapseo.conf;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.noldangGapseo.interceptor.AuthInterceptor;

    @Configuration
    public class MvcConfiguration implements WebMvcConfigurer{

        private static final Logger log = LogManager.getLogger(AuthInterceptor.class);
        // WebMvcConfiguerer 인터페이스
        // => 이 규칙에 따라 메서드를 작성하면
        // 스프링부트는 해당 메소드를 호출하여 그 메서드가 요구하는대로 설정을 수행한다.

        // 인터셉터를 추가하고 싶다면 다음 메서드를 규칙에 따라 정의하라!
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            log.debug("MvcConfiguration");
            // 이 메서드가 정의되어 있다면,
            // 스프링부트는 이 메서드를 호출하여 추가할 인터셉터의 정보를 InterceptorRegistry로 받는다.
            registry.addInterceptor(new AuthInterceptor())
                    .addPathPatterns("/**/add*","/**/update*","/**/delete*","/**/set*");
        }
}
