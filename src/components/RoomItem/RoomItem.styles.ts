import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const Item = styled.li`
  display: flex;
  padding: 0 60px;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

export const Details = styled.div`
  color: black;
  display: grid;
  grid-template-columns: 10% 70% 30%;
  width: 100%;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
`;

export const Action = styled(IconButton)`
  color: #72a0c1;
  cursor: pointer;
  padding: 8px;
`;
