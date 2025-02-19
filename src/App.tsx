import AuthComp from "./Components/AuthComp/AuthComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EmpForm from "./Components/EmpForm/EmpForm";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { dark, shadesOfPurple } from "@clerk/themes";

function App() {
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (isSignedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isSignedIn]);
  console.log(isSignedIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthComp />}>
            <Route path="/" element={<EmpForm />} />
          </Route>

          <Route
            path="/sign-in"
            element={
              <div className="flex items-center justify-center h-screen">
                <SignIn
                  appearance={{
                    baseTheme: theme === "dark" ? dark : shadesOfPurple,
                  }}
                />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
