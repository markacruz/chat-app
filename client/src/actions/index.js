export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username
    }
}

export const clearUsername = () => {
    return {
        type: 'CLEAR_USERNAME'
    }
}

export const setChannel = (channel) => {
    return {
        type: 'SET_CHANNEL',
        payload: channel
    }
}

export const clearChannel = () => {
    return {
        type: 'CLEAR_CHANNEL'
    }
}

export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}



