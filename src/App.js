import "./App.css";
import { StrictMode } from "react";
import RootRoutes from "./routes/RootRoutes";
import Header from "./pages/header";

function App() {
  return (
    <StrictMode>
      <Header />
      <RootRoutes />
    </StrictMode>
  );
}

export default App;
