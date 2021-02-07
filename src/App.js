import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/editdata/Create";
import NotFound from "./components/notfound/NotFound";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Profile from "./components/userprofile/Profile";
import  PrivateRoute  from "./PrivateRoute";
import ResetPassword from "./components/auth/ResetPassword";
import Update from "./components/userprofile/Update";
import Footer from "./components/footer/footer";
import Social from "./components/social/sociallinks";
function App() {
  return (
      <AuthContextProvider>
    <Router>
    <div className="App">
      <Navbar/>
   
      <div className="content">
        <Switch>
        <Route exact path='/'>
          <Home />
          </Route>
          <Route path='/signin'>
          <Signin/>
          </Route>
          <Route path='/reset'>
          <ResetPassword/>
          </Route>
          <Route path='/signup'>
          <Signup/>
          </Route>
          <PrivateRoute path='/profile'>
          <Profile/>
          </PrivateRoute>
          <PrivateRoute path='/update'>
          <Update/>
          </PrivateRoute>
          <PrivateRoute path='/create'>
          <Create/>
          </PrivateRoute>
          <Route path='*'>
          <NotFound/>
          </Route>
          
        </Switch>
      </div>
      <Footer/>
      <Social/>
    </div>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
