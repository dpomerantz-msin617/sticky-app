
export function updateObject(state, id, propertyName, propertyValue){
    let item = {...state.boards[id],
            [propertyName] : propertyValue
    }
    return {
        ...state.boards,
        [id]: item
    }
}

export const deactivateBoards = (boards) => Object.keys(boards).map(i => ({...boards[i], active: false}));

export const getActiveBoard = (allIds, boards) => allIds.map(i => 
                                                    boards[i]).filter(b => 
                                                            b.active).pop();

 export function removeItem(array, action) {
    return [...array.slice(0, action.index), ...array.slice(action.index + 1)]
  }