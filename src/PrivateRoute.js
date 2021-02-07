import { Route, Redirect } from "react-router-dom"
import { useAuth } from './hooks/useAuth';

 const PrivateRoute = ({ children, ...rest }) =>{
    const { currentUser } = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect to='/signin'/>
        )
      }
      ></Route>
    )
  }
  export default PrivateRoute;