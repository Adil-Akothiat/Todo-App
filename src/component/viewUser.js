import React, { useEffect, useState } from "react";
import './viewUser.css';
const SERVER_URL_API = 'https://'+require('../adil/akothiat/issam/__txt__').default.split('²')[1]+'.firebaseio.com';

export default function ViewUsers() {
    const [admins, setAdmins] = useState([]);
    useEffect(()=> {
        fetch(SERVER_URL_API+'/user.json').then(response=> response.json())
        .then(users=> {
            let userInfo= [];
            for(let key in users) {
                const user= {
                    id: key,
                    ...users[key]
                }
                userInfo.push(user)
            }
            setAdmins(userInfo);
        });
    }, [])
    return (
        <div className="users_admins">
            <h1>
                ADMIN IN TODO APP
            </h1>
            <table>
                <tbody>
                    <tr><th>Admin</th><th>ID</th><th>Date</th><th>Time</th></tr>
                    {
                        admins.map(admin=> {
                            return <tr key={admin.id}><td>{admin.name}</td><td>{admin.id}</td><td>{admin.date}</td><td>{admin.time}</td></tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}