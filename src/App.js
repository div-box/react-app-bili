import "./App.less";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./router";
import { withRouter } from "@/utils";
import Login from "./pages/login";
import Home from "./pages/home";
import NoPage from "@/router/404";
function App() {
  const renderRouter = (routes) => {
    return routes.map((item, index) => {
      let TheComponent = withRouter(item.component);
      if (item.component) {
        return (
          <Route exact key={index} path={item.path} element={<TheComponent />}>
            {item.routes && renderRouter(item.routes)}
          </Route>
        );
      } else {
        return item.routes && renderRouter(item.routes);
      }
    });
  };
  return (
    <Router>
      <Routes>
        <Route exact key="/login" path="login" element={<Login />}></Route>
        <Route key="/" path="/" element={<Home />}>
          {renderRouter(routes)}
        </Route>
        <Route path="/*" element={NoPage}></Route>
      </Routes>
    </Router>
  );
}

export default App;
