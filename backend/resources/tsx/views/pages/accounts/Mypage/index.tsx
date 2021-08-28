import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from 'react-router-dom';
import {Header} from '../../../layout/Header'
import {MyPageIndex} from './mypage';
import {ShopPageIndex} from './shoppage';
import {ProfileIndex} from './Profile_index';
import {ProfileAccountEdit} from './Profile_content';
import {ProfilePassEdit} from './Profile_passedit';
import {ShopPassEdit} from './Shop_passedit';
import {ProfilePageCancel} from './Profile_cancel';
import {ShopProfilePageCancel} from './shopProfile_cancel';
import {ProfileImage} from './Profile_image';
import {ShopImage} from './Shop_image';
import {ShopProfileContent} from './Shop_content';
import {ShopProfileEdit} from './Shop_profileEdit';
import {New_type} from './new_type';
import {New_vehicle} from './new_vehicle';
import {NewImages} from './new_images';
import {New_detail} from './new_detail';
import {New_request} from './new_request';
import {New_complete} from './new_complete';


const Request = () => {
	return (
        <Router >
            <Header title="LOGO"/>
            <Switch>
                <Route exact path="/account/mypage/" component={MyPageIndex}/>
                <Route  path="/account/request/profile/" component={ProfileIndex}/>
                <Route  path="/account/request/profile_account/" component={ProfileAccountEdit}/>
                <Route  path="/account/request/pass_edit/" component={ProfilePassEdit}/>
                <Route  path="/account/request/image_edit/" component={ProfileImage}/>
                <Route  path="/account/request/profilePage-cancel/" component={ProfilePageCancel}/>
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
const ShopRequest = () => {
	return (
        <Router >
            <Header title="LOGO"/>
            <Switch>
                <Route exact path="/account/mypage/" component={ShopPageIndex}/>
                <Route  path="/account/request/shop_profile/" component={ShopProfileContent}/>
                <Route  path="/account/request/shop_profielEdit/" component={ShopProfileEdit}/>
                <Route  path="/account/request/shop_image_edit/" component={ShopImage}/>
                <Route  path="/account/request/shopPass_edit/" component={ShopPassEdit}/>
                <Route  path="/account/request/shopProfilePage-cancel/" component={ShopProfilePageCancel}/>
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

if(document.getElementById('shoprequest')){
    ReactDOM.render(
        <ShopRequest />,
        document.getElementById('shoprequest')
    )
}
