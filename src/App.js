import './App.less';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import routes from './router';
import { withRouter } from '@/utils'
function App() {
  const renderRouter = (routes) => {
    return routes.map((item) => {
      if (!item.routes) {
        let TheComponent = withRouter(item.component)
        return (
          <Route
            exact
            key={item.path}
            path={item.path}
            element={<TheComponent />}
          ></Route>
        )
      } else {
        return renderRouter(item.routes)
      }
    })
  }
  return (
    <Router>
      <Routes>{renderRouter(routes)}</Routes>
    </Router>
  )
}

export default App;
