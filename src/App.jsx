import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import { CatchAllRoute } from "./pages/builder.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<CatchAllRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
