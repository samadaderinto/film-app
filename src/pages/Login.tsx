import {
  Button,
  TextField,

} from "@mui/material";

import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TopBar } from "../components";
import { USER_NAME_MAX_LENGTH } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { ColorPalette } from "../styles";
import { getFontColor } from "../utils";
import { PASSWORD_MAX_LENGTH } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user} = useContext(UserContext);

  const [loginInfo, setloginInfo] = useState<{email: string, password: string}>({email: "", password: ""});
  const n = useNavigate();

  useEffect(() => {
    document.title = `Filmo App - Login`;
  });


  const handleLogin = () => {
    
    console.log(user)
    
    toast.success((t) => (
      <div onClick={() => toast.dismiss(t.id)}>You have been successfully logged in</div>
    ));

    n("/")
  };



  return (
    <>
      <TopBar title="Login" />
      <Container>
        <UserName translate="no">Login to Filmo</UserName>

        <StyledInput
          label={"Email"}
          value={loginInfo.email}
          onChange={(e) => setloginInfo({...loginInfo, email: e.target.value})}
          error={loginInfo.email.length > USER_NAME_MAX_LENGTH}
          helperText={
            loginInfo.email.length> USER_NAME_MAX_LENGTH
              ? `Name is too long maximum ${USER_NAME_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />

        <StyledInput
          label={"Password"}
          value={loginInfo.password}
          onChange={(e) => setloginInfo({...loginInfo, password: e.target.value})}
          error={loginInfo.password.length > PASSWORD_MAX_LENGTH}
          helperText={
            loginInfo.password.length >  PASSWORD_MAX_LENGTH
              ? `Name is too long maximum ${PASSWORD_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />
        <SaveBtn
          onClick={handleLogin}
          disabled={loginInfo.password.length > PASSWORD_MAX_LENGTH}
        >
          Log in
        </SaveBtn>
      </Container>
      
    </>
  );
};

export default Login;
const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 64px 48px;
  border-radius: 48px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
  color: ${ColorPalette.fontDark};
  transition: border 0.3s;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 72px -1px ${({ theme }) => theme.primary + "bf"};
  display: flex;
  gap: 14px;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 16px;
    width: 300px;
  }
`;
const SaveBtn = styled(Button)`
  width: 300px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  font-size: 18px;
  padding: 14px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover {
    background: ${({ theme }) => theme.primary};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: white;
  }
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;
