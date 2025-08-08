import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Library from "./pages/Library";
import Discover from "./pages/Discover";
import Achievements from "./pages/Achievements";
import Friends from "./pages/Friends";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Library />
            </Layout>
          }
        />
        <Route
          path="/discover"
          element={
            <Layout>
              <Discover />
            </Layout>
          }
        />
        <Route
          path="/achievements"
          element={
            <Layout>
              <Achievements />
            </Layout>
          }
        />
        <Route
          path="/friends"
          element={
            <Layout>
              <Friends />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
