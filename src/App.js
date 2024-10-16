import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { Fragment } from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((item) => {
            const { path, component: Component, layout: Layout } = item;
            let L = Layout ?? Fragment;

            return (
              <Route
                key={path}
                path={path}
                element={
                  <L>
                    <Component />
                  </L>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
