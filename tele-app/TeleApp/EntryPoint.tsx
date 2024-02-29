import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import App from './App';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;
