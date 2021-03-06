export const deactivateBoards = (boards) => Object.keys(boards).map(i => ({...boards[i], active: false}));

export const getActiveBoard = (allIds, boards) => {
    return allIds.map(i => 
                    boards[i]).filter(b => 
                            b.active).pop();}

 export function removeItem(array, action) {
    return [...array.slice(0, action.index), ...array.slice(action.index + 1)]
  }