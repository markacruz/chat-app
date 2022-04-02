const users = [];

const addUser = ({ id, username, channel }) => {
    const newUsername = username?.trim().toLowerCase();
    const existingUser = users.find((user) => user.channel === channel && user.username === newUsername)

    if (existingUser) return { error:  'Username is taken!'};

    const user = { id, newUsername, channel };

    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (channel) => {
    return users.filter((user) => user.channel === channel)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };