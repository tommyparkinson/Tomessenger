import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { Avatar } from "@material-ui/core";
import db from "../firebase.js"; 
import { useStateValue } from "../StateProvider";

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(
            snapshot => (
                setRooms(snapshot.docs.map(doc =>
                    ({
                        id: doc.id,
                        data: doc.data(),
                    })))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>

            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;