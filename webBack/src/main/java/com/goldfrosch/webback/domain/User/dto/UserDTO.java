package com.goldfrosch.webback.domain.User.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String email;

    private String nickName;

    private int rank;

    private String uuid;

    private String profile;
}
