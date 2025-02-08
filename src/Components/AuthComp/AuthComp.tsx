import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModeToggle } from "../Toggle/mode-toggle";

export default function AuthComp() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") == null) {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <header className="flex items-center  justify-between">
        <h1 className="font-medium p-1 pl-9">
          Employee Registration Dashboard
        </h1>
        <div className="p-1.5 flex items-center  justify-between ">
          <div className="p-1.5 flex items-center  justify-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <ModeToggle />
        </div>
      </header>

      {loggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />}
    </>
  );
}
