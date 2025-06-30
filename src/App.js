import "./App.css";
import { StrictMode, useEffect } from "react";
import RootRoutes from "./routes/RootRoutes";
import Header from "./pages/header";
import refreshApi from "./component/refreshApi";

function App() {

  useEffect(() => {
    const res = async() => {
      await refreshApi.get(
        "/user/cookieInit"
      )
      .then((res) => {
        console.log("Cookie res1: ", res);
        return res
      })
    }

    res();
  })

  return (
    <StrictMode>
      <Header />
      <RootRoutes />
    </StrictMode>
  );
}

export default App;
