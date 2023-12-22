// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';

// const PrivateRoute = ({ element, email, authenticated, ...props }) => {
//   return authenticated ? (
//     email === 'zfarhsa@gmail.com' ? (
//       <Route {...props} element={element} />
//     ) : (
//       <Navigate to="/get-students" replace state={{ from: props.location }} />
//     )
//   ) : (
//     <Navigate to="/user" replace state={{ from: props.location }} />
//   );
// };

// export default PrivateRoute;
