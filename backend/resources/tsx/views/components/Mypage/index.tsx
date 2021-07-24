import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from 'react-router-dom';
import {Header} from '../../layout/Header'
import {MyPageIndex} from './mypage';
import {New_type} from './new_type';
import {New_vehicle} from './new_vehicle';
import {NewImages} from './new_images';
import {New_detail} from './new_detail';
import {New_request} from './new_request';
import {New_complete} from './new_complete';


const Request = () => {
	return (
        <Router >
            <Header/>
            <Switch>
                <Route exact path="/account/mypage/" component={MyPageIndex}/>
                <Route  path="/account/request/new/type/" component={New_type}/>
                <Route  path="/account/request/new/vehicle/" component={New_vehicle}/>
                <Route  path="/account/request/new/image/" component={NewImages}/>
                <Route  path="/account/request/new/detail/" component={New_detail}/>
                <Route  path="/account/request/new/request/" component={New_request}/>
                <Route  path="/account/request/new/complete/" component={New_complete}/>                 
            </Switch>
        </Router>
	)
}






    if(document.getElementById('request')){
            ReactDOM.render(
                <Request />,
                document.getElementById('request')
                )
    }