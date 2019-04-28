import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './views/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';
import { Provider } from 'react-redux';
import store from 'data/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
