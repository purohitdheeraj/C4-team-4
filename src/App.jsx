import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ProtectedLayout from "layouts/ProtectedLayout";
import HomePage from "views/home";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />

      <Route element={<ProtectedLayout />}>
        <Route path="admin/*" element={<AdminLayout />} />
      </Route>

      {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}

      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<h2>404 not found</h2>} />

      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />

      <Route path="/feed" element={<h2>home feed of documents</h2>} />
    </Routes>
  );
};

export default App;
