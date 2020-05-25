
export function updateObject(state, id, propertyName, propertyValue){
    let item = {...state.boards[id],
            [propertyName] : propertyValue
    }
    return {
        ...state.boards,
        [id]: item
    }
}

 export function removeItem(array, action) {
    return [...array.slice(0, action.index), ...array.slice(action.index + 1)]
  }