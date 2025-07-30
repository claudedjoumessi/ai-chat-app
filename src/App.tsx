import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./_auth/forms/LoginForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Chat } from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

function App() {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Chat />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
