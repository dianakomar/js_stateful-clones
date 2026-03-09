'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        const stateCopy = { ...currentState };

        Object.assign(stateCopy, extraData);

        history.push(stateCopy);
        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const stateCopy = { ...currentState };

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        history.push(stateCopy);
        currentState = stateCopy;
        break;
      }

      default:
        currentState = {};
        history.push(currentState);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
