import React from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';

const Loading = (): React.JSX.Element => {
  const windowWith = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <ActivityIndicator
      style={{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: windowWith,
        height: windowHeight,
      }}
      size="large"
      color="rgba(0, 66, 147, 1)"
    />
  );
};

export default Loading;
