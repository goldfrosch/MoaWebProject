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
        It just portpolio for GoldFrosch
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

  font-size: 12px;

  & > .content {
    color: #949494;
  }

  @media (max-width: 768px) {
    padding: 16px;

    font-size: 8px;
  }
`;

export default Footer;
