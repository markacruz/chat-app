const usernameReducer = (state = "", action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_USERNAME':
            return payload;
        case 'CLEAR_USERNAME':
            return "";
        default:
            return state;
    }
}

export default usernameReducer;