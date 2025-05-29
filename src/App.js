import logo from "./logo.svg";
import "./App.css";
import { StrictMode } from "react";
import RootRoutes from "./routes/RootRoutes";

function App() {
  return (
    <StrictMode>
      <RootRoutes />
    </StrictMode>
  );
}

export default App;
