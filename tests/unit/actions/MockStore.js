import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];

/**
 * Redux store
 */
export default function mockStore(actions, done) {
  if (!Array.isArray(actions)) {
    throw new Error('The type of actions should be an array.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('The type of done should be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      dispatch(action) {
        const expected = actions.shift();
        try {
          expect(action).toEqual(expected);
          if (done && !actions.length) {
            done();
          }
          return action;
        } catch (e) {
          done(e);
          return undefined;
        }
      },
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares,
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}
