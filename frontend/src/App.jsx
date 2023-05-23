import './App.css'
import Home from './pages/Home'
import useAuth from './hooks/useAuth'
import Fetch from './pages/Fetch'
import Preview from './pages/Preview'
import Categories from './pages/Categories'
import categories from './categories'
import Category from './pages/Category'
import { useState } from 'react';
import {
  useLocation,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function RequireAuth({ children, user, authLoading }) {
  let location = useLocation();
  if (authLoading) {
    return <div>
      LOADING...
    </div>;
  }
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function App() {

  const { user, loading: authLoading } = useAuth();
  const [jsonResult, setJsonResult] = useState();

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          
          <Route
            path="/main"
            element={
              <RequireAuth user={user} authLoading={authLoading}>
                <Fetch setJsonResult={setJsonResult} />
              </RequireAuth>
            }
          />

          <Route
            path="/preview"
            element={
              <RequireAuth user={user} authLoading={authLoading}>
                <Preview jsonResult={jsonResult} user={user} />
              </RequireAuth>
            }
          />

          <Route
            path="/categories"
            element={
              <RequireAuth user={user} authLoading={authLoading}>
                <Categories />
              </RequireAuth>
            }
          />

          {categories.map((ele) => {
            return <Route
              key={ele}
              path={`/category/${ele.toLowerCase()}`}
              element={
                <RequireAuth user={user} authLoading={authLoading}>
                  <Category category={ele} user={user} />
                </RequireAuth>
              }
            />
          })}

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
