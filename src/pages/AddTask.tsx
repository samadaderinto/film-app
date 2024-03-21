import { useTheme } from "@emotion/react";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CategorySelect, ColorPicker, CustomEmojiPicker, TopBar } from "../components";
import { DESCRIPTION_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { useStorageState } from "../hooks/useStorageState";
import { AddTaskButton, ColorPalette, Container, StyledInput } from "../styles";
import { Category, Task } from "../types/user";
import { getFontColor } from "../utils";

const AddTask = () => {
  const { user, setUser } = useContext(UserContext);
  const theme = useTheme();
  const [name, setName] = useStorageState<string>("", "name", "sessionStorage");
  const [emoji, setEmoji] = useStorageState<string | null>(null, "emoji", "sessionStorage");
  const [color, setColor] = useStorageState<string>(theme.primary, "color", "sessionStorage");
  const [description, setDescription] = useStorageState<string>(
    "",
    "description",
    "sessionStorage"
  );
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useStorageState<Category[]>(
    [],
    "categories",
    "sessionStorage"
  );

  const n = useNavigate();

  useEffect(() => {
    document.title = "Filmo - Onboard Film";
    if (name.length > TASK_NAME_MAX_LENGTH) {
      setNameError(`Name should be less than or equal to ${TASK_NAME_MAX_LENGTH} characters`);
    } else {
      setNameError("");
    }
    if (description.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(
        `Description should be less than or equal to ${DESCRIPTION_MAX_LENGTH} characters`
      );
    } else {
      setDescriptionError("");
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.length > TASK_NAME_MAX_LENGTH) {
      setNameError(`Name should be less than or equal to ${TASK_NAME_MAX_LENGTH} characters`);
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    if (newDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(
        `Description should be less than or equal to ${DESCRIPTION_MAX_LENGTH} characters`
      );
    } else {
      setDescriptionError("");
    }
  };

 

  const handleAddTask = () => {
    if (name !== "") {
      if (name.length > TASK_NAME_MAX_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
        return; // Do not add the task if the name or description exceeds the maximum length
      }

      const newTask: Task = {
        id: new Date().getTime() + Math.floor(Math.random() * 1000),
        
        pinned: false,
        name,
        description: description !== "" ? description : undefined,
        emoji: emoji ? emoji : undefined,
        color,
        date: new Date(),
        genres: selectedCategories ? selectedCategories : [],
      };

      setUser((prevUser) => ({
        ...prevUser,
        tasks: [...prevUser.tasks, newTask],
      }));

      n("/");
      toast.success((t) => (
        <div onClick={() => toast.dismiss(t.id)}>
          Added Film - <b>{newTask.name}</b>
        </div>
      ));

      const itemsToRemove = ["name", "color", "description", "emoji", "posted", "genres"];
      itemsToRemove.map((item) => sessionStorage.removeItem(item));
    } else {
      toast.error((t) => <div onClick={() => toast.dismiss(t.id)}>Film name is required.</div>);
    }
  };

  return (
    <>
      <TopBar title="Add New Film" />
      <Container>
        <CustomEmojiPicker
          emoji={typeof emoji === "string" ? emoji : undefined}
          setEmoji={setEmoji}
          color={color}
          theme={getFontColor(theme.secondary) === ColorPalette.fontDark ? "dark" : "light"}
        />
        <StyledInput
          label="Film Name"
          name="name"
          placeholder="Enter film name"
          autoComplete="off"
          value={name}
          onChange={handleNameChange}
          focused
          required
          error={nameError !== ""}
          helpercolor={nameError && ColorPalette.red}
          helperText={
            name === ""
              ? undefined
              : !nameError
              ? `${name.length}/${TASK_NAME_MAX_LENGTH}`
              : nameError
          }
        />
        <StyledInput
          label="film Description (optional)"
          name="name"
          placeholder="About the film..."
          autoComplete="off"
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          focused
          error={descriptionError !== ""}
          helpercolor={descriptionError && ColorPalette.red}
          helperText={
            description === ""
              ? undefined
              : !descriptionError
              ? `${description.length}/${DESCRIPTION_MAX_LENGTH}`
              : descriptionError
          }
        />
      
        {user.settings[0].enableCategories !== undefined && user.settings[0].enableCategories && (
          <>
            <br />
            <CategorySelect
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              width="400px"
              fontColor={getFontColor(theme.secondary)}
            />
            <Link to="/genres">
              <Button
                sx={{
                  margin: "8px 0 24px 0 ",
                  p: "12px 20px",
                  borderRadius: "14px",
                }}
              >
                <Edit /> &nbsp; Modify Genres
              </Button>
            </Link>
          </>
        )}
        <ColorPicker
          color={color}
          width="400px"
          onColorChange={(color) => {
            setColor(color);
          }}
          fontColor={getFontColor(theme.secondary)}
        />
        <AddTaskButton
          onClick={handleAddTask}
          disabled={
            name.length > TASK_NAME_MAX_LENGTH || description.length > DESCRIPTION_MAX_LENGTH
          }
        >
          Create Film
        </AddTaskButton>
      </Container>
    </>
  );
};

export default AddTask;
