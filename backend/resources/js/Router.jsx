import React from 'react'
import { Route, Switch } from "react-router-dom";
import { ChatMessages } from "./templates";
import Chatrooms from './templates/Chatrooms';

import Profile from './pages/shop/Profile';

const Router = () => {
    return(
        <Switch>
            // user_id を入れる
            <Route path="/account/chatroom" component={Chatrooms} />
            <Route path="/account/:user1/chat/:id/:user2" component={ChatMessages} />

            <Route path="/shop/profile/:id" children={<Profile />} />
        </Switch>
    )
}

export default Router
