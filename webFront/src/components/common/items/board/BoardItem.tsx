import styled from "styled-components";

type BoardItemBlockProps = {
  type: "important" | "normal";
};
const BoardItemBlock = styled.tr<BoardItemBlockProps>`
  width: 100%;
  background-color: ${props =>
    props.type === "important" ? "#f6f6f6" : "#ffffff"};

  @media (max-width: 768px) {
    padding: 0 4px;
  }

  & > td {
    padding: 16px 0;
    & > span {
      display: flex;
      align-items: center;
      & > .title {
        @media (max-width: 768px) {
          width: 64px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      & > img {
        width: 24px;
        height: 24px;

        margin-right: 8px;
      }
    }

    & > .info {
      display: flex;
      align-items: center;
      & > img {
        width: 16px;
        height: 16px;
      }
      & > .nick {
        color: #464646;
        font-weight: 500;

        padding-left: 6px;
        @media (max-width: 768px) {
          font-size: 2vw;
        }
      }
    }

    & > .times {
      display: flex;
      justify-content: center;

      color: #797979;
      font-size: 12px;
      @media (max-width: 768px) {
        font-size: 1vw;
      }
    }
  }

  & > td:nth-child(2) {
    padding: 16px;
    & > span {
      text-align: left;
    }
  }

  & > .profile {
    display: flex;
    align-items: center;
    & > img {
      width: 24px;
      height: 24px;

      margin-right: 8px;
    }
    & > .form {
      & > .title {
        display: flex;
        & > .prefix {
          font-size: 12px;
          font-weight: 500;
        }
        & > .title {
          padding-left: 6px;
          font-size: 14px;
          font-weight: 400;
        }
      }
      & > .info {
        display: flex;
        align-items: center;
        & > img {
          width: 16px;
          height: 16px;
        }
        & > .nick {
          color: #464646;
          font-size: 12px;
          font-weight: 500;

          padding-left: 6px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    padding: 0 4px;
    & > .profile .form .title {
      @media (max-width: 360px) {
        flex-direction: column;
      }
      & > .title {
        max-width: 150px;

        display: block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export default BoardItemBlock;
