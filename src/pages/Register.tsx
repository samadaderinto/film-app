import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

  TextField,
  Tooltip,
} from "@mui/material";

import styled from "@emotion/styled";
import { AddAPhotoRounded, Delete } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TopBar } from "../components";
import { PROFILE_PICTURE_MAX_LENGTH, USER_NAME_MAX_LENGTH } from "../constants";
import { defaultUser } from "../constants/defaultUser";
import { UserContext } from "../contexts/UserContext";
import {  ColorPalette, DialogBtn } from "../styles";
import { getFontColor } from "../utils";
import { PASSWORD_MAX_LENGTH } from "../constants/constants";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [openChangeImage, setOpenChangeImage] = useState<boolean>(false);

  const [registerInfo, setregisterInfo] = useState<{name: string, email: string, password: string}>({name: "", email: "", password: ""});

  const n = useNavigate();


  useEffect(() => {
    document.title = `Filmo App - Register`;
  });


  const handleOpenImageDialog = () => {
    setOpenChangeImage(true);
  };
  const handleCloseImageDialog = () => {
    setOpenChangeImage(false);
  };


  const handleRegister = () => {
    setUser({...defaultUser, name: registerInfo.name, email: registerInfo.email, password: registerInfo.password});
    console.log(user)
    
    toast.success((t) => (
      <div onClick={() => toast.dismiss(t.id)}>You have been successfully logged in</div>
    ));

    n("/")
  };

  const handleSaveImage = () => {
    if (
      profilePictureURL.length <= PROFILE_PICTURE_MAX_LENGTH &&
      profilePictureURL.startsWith("https://")
    ) {
      handleCloseImageDialog();
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: profilePictureURL,
      }));

      toast.success((t) => <div onClick={() => toast.dismiss(t.id)}>Changed profile picture.</div>);
    }
  };

  return (
    <>
      <TopBar title="Sign Up" />
      <Container>
        <UserName translate="no">Register to Filmo</UserName>
        <Tooltip title={"Add profile picture"}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                onClick={handleOpenImageDialog}
                sx={{
                  background: "#9c9c9c81",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                }}
              >
                <AddAPhotoRounded />
              </Avatar>
            }
          >
            <Avatar
              onClick={handleOpenImageDialog}
              src={(profilePictureURL as string) || undefined}
              onError={() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  profilePicture: null,
                }));
                throw new Error("Error in profile picture URL");
              }}
              sx={{
                width: "96px",
                height: "96px",
                cursor: "pointer",
                fontSize: "45px",
              }}
            >
              {!profilePictureURL && registerInfo.name
                ? registerInfo.name[0].toUpperCase()
                : !user.profilePicture && !registerInfo.name && registerInfo.name
                ? registerInfo.name[0].toUpperCase()
                : undefined}
            </Avatar>
          </Badge>
        </Tooltip>

        <StyledInput
          label={"Name"}
          value={registerInfo.name}
          onChange={(e) => setregisterInfo({...registerInfo, name: e.target.value})}
         
          error={registerInfo.name.length > USER_NAME_MAX_LENGTH}
          helperText={
            registerInfo.name.length > USER_NAME_MAX_LENGTH
              ? `Name is too long maximum ${USER_NAME_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />

        <StyledInput
          label={"Email"}
          value={registerInfo.email}
          onChange={(e) => setregisterInfo({...registerInfo, email: e.target.value})}
          onKeyDown={(e) => e.key === "Enter"}
          error={registerInfo.name.length > USER_NAME_MAX_LENGTH}
          helperText={
            registerInfo.name.length > USER_NAME_MAX_LENGTH
              ? `Name is too long maximum ${USER_NAME_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />

        <StyledInput
          label={"Password"}
          value={registerInfo.password}
          onChange={(e) => setregisterInfo({...registerInfo, password: e.target.value})}
          onKeyDown={(e) => e.key === "Enter"}
          error={registerInfo.name.length > USER_NAME_MAX_LENGTH}
          helperText={
            registerInfo.name.length > USER_NAME_MAX_LENGTH
              ? `Name is too long maximum ${USER_NAME_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />
        <SaveBtn
          onClick={handleRegister}
          disabled={registerInfo.password.length > PASSWORD_MAX_LENGTH}>
          Register
        </SaveBtn>
      </Container>
      <Dialog open={openChangeImage} onClose={handleCloseImageDialog}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <StyledInput
            autoFocus
            label="Link to profile picture"
            sx={{ margin: "8px 0" }}
            value={profilePictureURL}
            onChange={(e) => {
              setProfilePictureURL(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSaveImage()}
            error={profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH}
            helperText={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH
                ? `URL is too long maximum ${PROFILE_PICTURE_MAX_LENGTH} characters`
                : ""
            }
            autoComplete="url"
            type="url"
          />
          <br />
          <Button
            onClick={() => {
              handleCloseImageDialog();
              toast.success((t) => (
                <div onClick={() => toast.dismiss(t.id)}>Deleted profile image.</div>
              ));
              setUser({ ...user, profilePicture: null });
            }}
            color="error"
            variant="outlined"
            sx={{ margin: "16px 0", p: "12px 20px", borderRadius: "14px" }}
          >
            <Delete /> &nbsp; Delete Image
          </Button>
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={handleCloseImageDialog}>Cancel</DialogBtn>
          <DialogBtn
            disabled={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH ||
              !profilePictureURL.startsWith("https://")
            }
            onClick={handleSaveImage}
          >
            Save
          </DialogBtn>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Register;

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
