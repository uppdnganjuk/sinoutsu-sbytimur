import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import SipekatPage from './Pages/SipekatPage'
import ArsipNomorMasuk from './Pages/ArsipNomorMasuk';
import NomorMasukPage from './Pages/NomorMasukPage';
import StatusPage from './Pages/StatusPage';
import WelcomePage from './Pages/WelcomePage';
import HomePage from './Pages/HomePage';
import NomorPage from './Pages/NomorPage';
import ArsipNomor from './Pages/ArsipNomor';
import AdminPage from './Pages/AdminPage';
import AdminLogin from './Pages/AdminLogin';
import PrintPage from './Pages/PrintPage';
import WaPush from './Pages/WaPush';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={HomePage}></Route>
    <Route path="/home" component={NomorPage}></Route>
    <Route path="/nomormasuk" component={NomorMasukPage}/>
    <Route path="/sipekat" component={SipekatPage}></Route>
    <Route path="/laporjual" component={StatusPage}></Route>
    <Route path="/nomorkeluar" component={NomorPage}></Route>
    <Route path="/arsip/nomorkeluar" component={ArsipNomor}></Route>
    <Route path="/arsip/nomormasuk" component={ArsipNomorMasuk}></Route>
    <Route path="/admin" component={AdminPage}></Route>
    <Route path="/adminlogin" component={AdminLogin}></Route>
    <Route path="/cetak" component={PrintPage}></Route>
    <Route path="/whatsapppush" component={WaPush}></Route>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
