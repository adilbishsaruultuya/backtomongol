"use client";
import React from "react";
import { AuthProvider, useAuth } from "./_providers/AuthProvider";
import SignIn from "./_component/SignIn";
import Dashboard from "./_component/Dashboard";
import { DataProvider } from "./_providers/DataProvider";

function App() {
  return <Main />;
}

function Main() {
  const { loggedIn } = useAuth();
  if (loggedIn === null) {
    return <p>Loading...</p>; // ログイン状態を確認するまでローディング表示
  }
  return loggedIn ? <Dashboard /> : <SignIn />;
}

export default App;
