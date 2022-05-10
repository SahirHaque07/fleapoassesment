import React from 'react'
import Header from './Component/Header';
import {Routes,Route} from "react-router-dom";
import ImageCropper from './Component/ImageCropper';
import "../src/bootstrap.min.css";
import "./App.css";
import Footer from './Component/Footer';
import ImageNewCrop from './Component/ImageNewCrop';
import Cropper from './Component/Cropper';
import Images from './Component/Images';

const App = () => {
  return (
    <div>
        <Header />
        
        <main>
          <Routes>
            <Route path='/' element={<ImageCropper />}/>
            <Route path='/path/:path' element={<ImageCropper />}/>
            <Route path='/images' element={<Images />}/>
          </Routes>
         
        {/* <ImageNewCrop /> */}
        {/* <Cropper /> */}
        </main>
       
        <Footer />
    </div>
  )
}

export default App