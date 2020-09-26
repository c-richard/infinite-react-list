import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteList from '../src/InfiniteList';

const App = () => {
  let f0 = 0;
  let f1 = 1;

  const itemGenerator = () => {
    const oldF0 = f1;
    f1 += f0;
    f0 = oldF0;

    return (
      <div key={`${f0}${f1}`}>
        <b>{f0}</b>
      </div>
    );
  };

  return (
    <div>
      <h1>demonstration</h1>
      <InfiniteList itemGenerator={itemGenerator} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
