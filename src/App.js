import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import { UserProvider } from './views/ui-elements/basic/UserContext'; // Change here

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>
    </UserProvider>
  );
};

export default App;
