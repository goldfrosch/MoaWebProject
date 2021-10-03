import React from "react";
import styled from "styled-components";

interface FieldProps {
}

const Field: React.FC<FieldProps> = ({children}) => {
    return <FieldBlock>{children}</FieldBlock>;
};

const FieldBlock = styled.div`
  width: 80%;
  height: 70vh;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export default Field;
