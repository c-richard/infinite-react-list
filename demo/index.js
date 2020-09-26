import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteList from '../src/InfiniteList';
import 'regenerator-runtime';

const App = () => {
  let f0 = 0;
  let f1 = 1;
  let old = 0;

  function* fibonacho(maxN) {
    for (f0 = 0, f1 = 1, old = 0; f1 < maxN; old = f1, f1 += f0, f0 = old) {
      yield (
        <div key={`${f0}${f1}`}>
          {f0}
        </div>
      );
    }
  }

  const itemGenerator = fibonacho(10000000);

  return (
    <div>
      <h1>demonstration</h1>
      <InfiniteList next={() => itemGenerator.next()} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
