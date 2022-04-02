import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setChannel, signIn } from '../actions'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

document.title = "Chat App";

export default function Portal({ socket }) {

    const username = useSelector(state => state.username);
    const channel = useSelector(state => state.channel);
    const isValid = useSelector(state => state.isValid);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onFormSubmit(event) {
        event.preventDefault();
        dispatch(signIn());
        navigate(`/room/${channel}`);
    }

    return (
        <div className='bg-[#5865F2] flex justify-center items-center h-screen'>
            <Form className='bg-[#2C2F33] text-white px-4 py-4 rounded-sm w-[300px]'
            onSubmit={(e) => onFormSubmit(e)}>
                <div className="flex justify-center items-center gap-x-2">
                    <div className="font-extrabold text-[50px]">
                        Chat App
                    </div>
                    <i className="bi bi-chat-dots"></i>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control size="md"
                    placeholder="Enter username"
                    type="text"
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Lobby
                    </Form.Label>
                    <Form.Select size="md" onChange={(e) => dispatch(setChannel(e.target.value))}>
                        <option defaultValue="1">Channel 1</option>
                        <option value="2">Channel 2</option>
                        <option value="3">Channel 3</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Choose a lobby to join.
                    </Form.Text>
                </Form.Group>
                <Button className="w-full bg-blue-600 text-center rounded-sm" 
                type="submit">
                    Join
                </Button>
            </Form>
        </div>
    )
}