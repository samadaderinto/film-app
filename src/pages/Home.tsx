import { useContext, useEffect } from "react";
import { AddTaskBtn, Tasks } from "../components";
import {
  GreetingHeader,
  Offline,
} from "../styles";

import { WifiOff } from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const Home = () => {
  const { user } = useContext(UserContext);
  const { tasks, name } = user;


  

  const isOnline = useOnlineStatus();

  useEffect(() => {
    
    document.title = "Filmo";
  }, []);




  return (
    <>
      <GreetingHeader>
        
        {name && <span translate="no">Hi, {name}</span>}
      </GreetingHeader>

      {!isOnline && (
        <Offline>
          <WifiOff /> You're offline but you can use the app!
        </Offline>
      )}
      
      <Tasks />

      <AddTaskBtn animate={tasks.length === 0} />
    </>
  );
};

export default Home;
