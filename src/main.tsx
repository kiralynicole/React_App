import React from 'react';
import ReactDOM from 'react-dom/client';
// named import
import { App } from './components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//default import
// import Paul from './components/App';

// const o = {
//   prop: 1,
// };

// const { prop: altNume } = o;

// const title = React.createElement(
//   'h1',
//   null,
//   'Hello from ',
//   React.createElement(
//     'a',
//     { href: 'https://react.dev', target: '_blank' },
//     'React'
//   )
// );

// const title = (
//   <h1>
//     Hello from{' '}
//     <a href="https://react.dev" target="_blank">
//       JSX
//     </a>
//   </h1>
// );

// const ourContent = React.createElement(App, null, null);
