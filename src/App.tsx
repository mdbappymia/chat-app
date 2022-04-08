import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import Login from "./components/Login";

const App: FC = () => {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </div>
  );
};

export default App;
