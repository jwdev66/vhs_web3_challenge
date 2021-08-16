import styled from "styled-components";

export const Header = styled.h2`  
  color: black;  
  text-align: center;
`;

export const ConnectButton = styled.button`  
  height: 40px;
  width: 200px;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0px;
`;

export const Container = styled.div`  
  flex: 1;
  overflow-y: auto;  
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  border: 1px solid #ddd;    
  cursor: pointer;  
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #aaa;
  }
`;

export const TH = styled.th`
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  background-color: #aaa;
`;

export const TD = styled.td`
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;  
`;

export const Message = styled.h3`
  color: black;
  text-align: center;
`

export const BackButton = styled.button`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  width: fit-content;
  border: none;
  background-color: transparent;
  &:hover {
    color: blue;
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Input = styled.input`
  width: 200px;
  height: 30px;  
`

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`