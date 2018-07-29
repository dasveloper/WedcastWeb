import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import SlideShow from './components/SlideShow';

import Home from './components/Home';

const renderApplication = () => {
  ReactDOM.render(
    <SlideShow /> ,
    document.querySelector('#root')
  );
}

renderApplication(SlideShow);

