import React from "react";

import LoginForm from "components/common/template/LoginForm";

interface SearchPasswordProps {}

const SearchPassword: React.FC<SearchPasswordProps> = () => {
  return (
    <LoginForm title="비밀번호 찾기">
      <form>
        <input placeholder="이메일을 입력하세요" />
        <input placeholder="PW" />
      </form>
    </LoginForm>
  );
};

export default SearchPassword;
