import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const zeroState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  it('should return a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' };

    const state = counterReducer(undefined, action);
    expect(state).toEqual(zeroState);
  });

  it('handles the GOOD action', () => {
    const action = { type: 'GOOD' };
    const initialState = zeroState;

    deepFreeze(initialState);
    const state = counterReducer(initialState, action);
    expect(state).toEqual({ ...zeroState, good: 1 });
  });
});
