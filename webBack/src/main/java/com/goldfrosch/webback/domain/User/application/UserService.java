package com.goldfrosch.webback.domain.User.application;

import com.goldfrosch.webback.domain.User.domain.User;
import com.goldfrosch.webback.domain.User.entity.dao.PasswordDAO;
import com.goldfrosch.webback.domain.User.entity.dto.UserDTO;
import com.goldfrosch.webback.domain.User.persistance.UserQueryRepository;
import com.goldfrosch.webback.domain.User.persistance.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;


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
    public String updateUserPassword(PasswordDAO pw, User user) {
        if(userQueryRepository.findOverlapPassword(user.getId()).equals(pw.getNowPass())) {
            userQueryRepository.updatePassword(pw.getNewPass(), user.getId());

            return "성공적으로 변경되었습니다";
        } else {
            return "현재 비밀번호가 다릅니다";
        }
    }
}
