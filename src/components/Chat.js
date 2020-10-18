import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
        chatHeight();
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

    const leaveChatHandler = () => {
        window.history.back();
    };

const chatHeight = () => {
     if(window.innerWidth <= 767) {
         var mobileChatHeight = window.innerHeight;
        document.getElementById("chat").style.height = mobileChatHeight + "px";
  }
}


    return (

        <div className="chat" id="chat">
            
            <div className="chat__header">

                <ArrowBackIcon className="chat__leaveButton" onClick={leaveChatHandler}/>

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
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
             
                <form>
                    <input 
                     placeholder="Type a message..." 
                     type="text" 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={sendMessage}>Send a message</button>
                </form>
             
            </div>

        </div>
    );
}

export default Chat;