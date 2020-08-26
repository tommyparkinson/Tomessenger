import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import  MoreVertIcon  from "@material-ui/icons/MoreVert";
import  SearchOutlined  from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase.js";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";


function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)));
            db.collection('rooms')
            .doc(roomId).collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed: ", input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    };
    

    return (

        <div className="chat">

            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {messages.map(message => (
                    //In production, need to change to id's because 2 people might have the same name
                <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                     placeholder="Type a message..." 
                     type="text" 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    );
}

export default Chat;