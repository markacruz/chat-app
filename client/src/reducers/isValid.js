const isValidReducer = (state = false, action) => {
    const { type } = action;
    switch (type) {
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
            return false;
        default:
            return state;
    }
}

export default isValidReducer;