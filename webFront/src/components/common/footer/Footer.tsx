import React from "react";
import styled from "styled-components";
import { Palette } from "styles/Pallete";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterBlock>
      <div className="content">
        Corporation: Minecraft_Moa_Server
        <br />
        Copyright@2021 Moa Server All Wrong Reserved
        <br />
        It just portpolio of GoldFrosch
        <br />
        Help ME
      </div>
    </FooterBlock>
  );
};

const FooterBlock = styled.div`
  width: 100%;
  height: 15vh;
  background-color: ${Palette.header};

  padding: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > .content {
    color: #949494;
    font-size: 12px;
  }
  @media (max-width: 800px) {
    padding: 16px;
    & > .content {
      font-size: 6px;
    }
  }
`;

export default Footer;
