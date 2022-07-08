import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearUsername, clearChannel, signOut } from '../actions'
import { useParams } from "react-router-dom";

export default function ChatLobby({ socket }) {

    const [users, setUsers] = useState([])
    const [typedMessage, setTypedMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const username = useSelector(state => state.username);
    const { channel } = useParams();
    const dispatch = useDispatch();

    document.title = `Chat App - Channel ${channel}`;
    
    useEffect(() => {
        socket.emit('join', ({ username, channel }))
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
            console.log(message)
        })
        socket.on("channelData", ({ users }) => {
            setUsers(users);
          });

    }, [])

    function onLeaveRoom() {
        dispatch(clearUsername());
        dispatch(clearChannel());
        dispatch(signOut());
    }

    function onSubmitMessage(e) {
        e.preventDefault();
        socket.emit("sendMessage", typedMessage);
        setTypedMessage("");
    }

    return (
        <div className='bg-[#5865F2] flex justify-center items-center h-screen'>
            <div className='bg-[#2C2F33] rounded-sm w-[1000px] h-[650px]'>
                <div className="flex bg-white rounded-t-sm font-bold h-[50px] items-center">
                    <div className="w-[900px] p-3">
                        <i className="bi bi-arrow-right"></i> Lobby: <span className="font-normal">Channel 1</span>
                    </div>
                    <div className="w-[100px]">
                        <Button size="sm" variant="danger" onClick={e => onLeaveRoom(e)}>
                            <i className="bi bi-arrow-bar-left"></i> Leave
                        </Button>
                    </div>
                </div>
                <div className="flex text-white">
                    <div className="px-3 pt-2 bg-[#23272A] w-[300px] h-[600px] rounded-bl-sm">
                        <div className="">
                            <i className="bi bi-people"></i> Active Users
                        </div>
                    
                        <div className="max-h-[550px] h-[550px] overflow-y-scroll">
                            {users.map(user => (
                                <div key={user.id}>
                                    {user.newUsername}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <div className="h-[500px] max-h-[525px] overflow-y-scroll p-4 mx-1 my-2">
                            <div>
                                {messages.map(message => (
                                    <div key={message.text}>
                                        {message.user === username.toLowerCase() ?
                                        <div className="text-right block">
                                            <div className="px-2 mb-1">
                                                You
                                            </div>
                                            <div className="bg-gray-600 px-3 py-2 rounded-2xl mb-2 w-fit text-right inline-block">
                                                {message.text}
                                            </div>
                                        </div>
                                        :
                                        <div className="text-left">
                                            <div className="px-1 mb-1">
                                                {message.user}
                                            </div>
                                            <div className="bg-gray-600 px-3 py-2 rounded-2xl mb-2 w-fit">
                                                {message.text}
                                            </div>
                                        </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Form className="flex items-center gap-x-2 h-[75px] px-4"
                        onSubmit={(e) => onSubmitMessage(e)}>
                            <Form.Group className="w-[600px]">
                                <Form.Control type="text" 
                                placeholder={`Message Channel ${channel}`} 
                                value={typedMessage}
                                onChange={(e) => setTypedMessage(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit">
                                <i className="bi bi-send"></i>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
