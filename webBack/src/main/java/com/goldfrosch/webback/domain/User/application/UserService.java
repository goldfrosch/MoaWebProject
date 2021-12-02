package com.goldfrosch.webback.domain.User.application;

import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.domain.User.entity.dao.PasswordDAO;
import com.goldfrosch.webback.domain.User.entity.dto.UserDTO;
import com.goldfrosch.webback.domain.User.persistance.UserQueryRepository;
import com.goldfrosch.webback.domain.User.persistance.UserRepository;

import com.goldfrosch.webback.global.utils.FileUpload;
import com.goldfrosch.webback.global.utils.MailUtils;
import com.goldfrosch.webback.global.utils.RandomUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{
    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;

    private MailUtils mailUtils = new MailUtils();

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

    @Transactional
    public Boolean findUserByEmail(String email) {
        return userRepository.findByEmail(email).isEmpty();
    }
    
    @Transactional
    public String resetPassword(String email, PasswordEncoder passwordEncoder) {
        boolean check = findUserByEmail(email);

        if(check) {
            return "존재하지 않는 이메일입니다";
        }
        RandomUtils randomUtils = new RandomUtils();

        String newPassword = randomUtils.GenerateNewPassword();

        String msg = "<p>새 비밀번호: " + newPassword + "</p><p>행복한 하루 되세요!</p><p>- 모아 웹사이트 골드 드림</p>";
        mailUtils.sendEmail(email, "비밀번호가 초기화되었습니다!", msg);
        userQueryRepository.updatePassword(
            passwordEncoder.encode(newPassword),
            userRepository.findByEmail(email).get().getId()
        );

        return "해당 주소로 이메일을 전송했습니다";
    }
}
