package com.goldfrosch.webback.domain.User.application;

import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.domain.User.entity.dao.PasswordDAO;
import com.goldfrosch.webback.domain.User.entity.dto.UserDTO;
import com.goldfrosch.webback.domain.User.persistance.UserQueryRepository;
import com.goldfrosch.webback.domain.User.persistance.UserRepository;

import com.goldfrosch.webback.global.utils.FileUpload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{
    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다"));
    }

    @Transactional
    public UserDTO getUserService(User user) {
        UserDTO getProfile = new UserDTO();
        getProfile.setEmail(user.getEmail());
        getProfile.setNickName(user.getNickName());
        getProfile.setRank(user.getRank());
        getProfile.setUuid(user.getUuid());
        getProfile.setProfile(user.getProfile());

        return getProfile;
    }

    @Transactional
    public String updateUserPassword(String pw, User user) {
        userQueryRepository.updatePassword(pw, user.getId());
        return "성공적으로 변경되었습니다";
    }

    @Transactional
    public String updateUserProfile(User user, MultipartFile file, Boolean isDelete) {
        String newFileData;
        if(isDelete) {
            newFileData = null;
        } else {
            newFileData = file == null ? ""
                    : FileUpload.uploadImage(file,
                    "profile/" + user.getId()
            );
        }
        userQueryRepository.updateProfile(newFileData, user.getId());
        return "성공적으로 반영되었습니다";
    }
}
