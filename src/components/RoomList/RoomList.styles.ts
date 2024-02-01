import styled from "@emotion/styled";

export const Content = styled.div`
  width: 100%;
  margin: 20px 40px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: auto;
  overflow-y: auto;
  max-height: 70vh;
`;

export const DisplayMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: lightgray;
`;

export const ModalActions = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 10px;
  justify-content: space-between;
`;
