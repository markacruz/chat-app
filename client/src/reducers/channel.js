const channelReducer = (state = '1', action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CHANNEL':
            return payload;
        case 'CLEAR_CHANNEL':
            return '1';
        default:
            return state;
    }
}

export default channelReducer;