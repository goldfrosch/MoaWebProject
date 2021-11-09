import React, { useRef, useState } from "react";
import styled from "styled-components";

const DragDrop: React.FunctionComponent = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<HTMLLabelElement | null>(null);
  return (
    <DragDropBlock>
      <input type="file" id="fileUpload" style={{ display: "none" }} />
      <label
        className={
          isDragging
            ? "alignCenter uploadFile dragging"
            : "alignCenter uploadFile"
        }
        htmlFor="fileUpload"
      >
        <div>파일 첨부</div>
      </label>
    </DragDropBlock>
  );
};

const DragDropBlock = styled.div`
  .alignCenter {
    display: flex;
    flex-direction: column;
    -ms-flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .uploadFile {
    width: 200px;
    height: 300px;
    border: 2px solid black;
    border-radius: 10px;

    cursor: pointer;
    transition: 0.12s ease-in;
  }
  .uploadFile:hover {
    background-color: #0000001c;
  }
  .dragging {
    background-color: black;
    color: white;
  }
`;

export default DragDrop;
