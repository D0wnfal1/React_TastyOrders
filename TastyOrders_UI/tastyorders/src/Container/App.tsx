import React from 'react';
import Header from '../Components/Layout/Header.tsx';
import Footer from '../Components/Layout/Footer.tsx';
import { useState, useEffect } from 'react';
import menuItemModel from '../Interfaces/menuItemModel.ts';
import Home from '../Pages/Home.tsx';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound.tsx';
import MenuItemDetails from '../Pages/MenuItemDetails.tsx';

function App() {


  return (
    <div>
      <Header/>
      <div className='pb-5'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails />}></Route>
          <Route path='*' element={<NotFound />}>
            
          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
