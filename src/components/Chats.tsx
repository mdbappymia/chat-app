import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useSelector } from "react-redux";
import useFirebase from "../hooks/useFirebase";

import { RootState } from "../redux/store/store";

const Chats: FC = () => {
  const { logOut } = useFirebase();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.users.user);
  const getFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "f1551e18-1efd-43ce-b128-e788ff1a25c4",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile("https://cdn-icons-png.flaticon.com/512/149/149071.png").then(
          (avatar: any) => {
            formData.append("avatar", avatar, avatar.name);
            axios
              .post("https://api.chatengine.io/users", formData, {
                headers: {
                  "PRIVATE-KEY": "7ee41756-f46e-4b07-af78-3d99451f5f9c",
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log(e));
          }
        );
      });
  }, [user]);
  if (!user.email || loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="chats-pages">
      <div className="nav-bar">
        <div className="logo-tab">Chat</div>
        <div className="logout-tab" onClick={logOut}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="f1551e18-1efd-43ce-b128-e788ff1a25c4"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
