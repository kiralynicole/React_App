import { useReducer } from 'react';
import clsx from 'clsx';
import styles from './Counter.module.css';

interface Action {
  type: 'update' | 'reset';
  payload: number;
}

function counterReducer(oldState: number, action: Action) {
  let newState = oldState;
  switch (action.type) {
    case 'update':
      newState = newState + action.payload;
      break;
    case 'reset':
      newState = action.payload;
      break;
    default:
      throw new Error(`Action '${action.type} is not implemented.'`);
  }

  return newState;
}

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, dispatch] = useReducer(counterReducer, initialCount);

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output
          className={clsx({
            [styles.positive]: count > 0,
            [styles.negative]: count < 0,
          })}
        >
          {count}
        </output>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'update', payload: -5 })}>
          -5
        </button>
        <button onClick={() => dispatch({ type: 'update', payload: -1 })}>
          -
        </button>
        <button
          onClick={() => dispatch({ type: 'reset', payload: initialCount })}
        >
          Reset
        </button>
        <button onClick={() => dispatch({ type: 'update', payload: 1 })}>
          +
        </button>
        <button onClick={() => dispatch({ type: 'update', payload: 5 })}>
          +5
        </button>
      </p>
    </>
  );
}

// let state;
// function myUseState(initialState) {
//   if(state === undefined) {
//     state = initialState;
//   }

//   function setState(newState) {
//     state = newState;
//     Counter();
//   }

//   return [state, setState];
// }
// const [count, setCount] = myUseState(0);

// return (
//   React.createElement('div', null,
//     React.createElement('h1'),
//     React.createElement('p')
//   )
// )
