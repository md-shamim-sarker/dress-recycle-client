import React from 'react';
import {Toaster} from 'react-hot-toast';
import {RouterProvider} from 'react-router-dom';
import router from './routes/Routes';

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <div><Toaster /></div>
    </>
  );
};

export default App;