import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import { getUser } from "./redux/user/user-selector";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/user/user-operations";

function App() {

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
