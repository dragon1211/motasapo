
import React, {Component} from 'react';
import  '../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Profile.css';
import GlobalNav from '../../../layout/GlobalNav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { FaThemeisle } from 'react-icons/fa';

export class ShopProfilePageCancel extends Component <{}> {

    handleSubmit = (e:any) => {
        
        axios.post('/account/profile/account_cancel')
        .then(response => {
            if(response.data=="success"){
                window.location.href = '/account/post';
            } else {
                console.log(response.data);
            }
        })
    }

    render(){
        return (
            <>
                <div>
                    <div className="info profile-body">
                        <div className="profile-body-cancel">
                            <div className="row">
                                <div className="col-sm-12">
                                    <p>本当に退会してもよろしいでしょうか?</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            <button type="submit" className="profile-cancel text-center">退会する</button>
                        </form>
                        <Link to="/account/request/shop_profile/"><button className="profile-cancel text-center">キャンセル</button></Link>
                    </div>
                </div>
                <GlobalNav />
            </>
        );
    }

}

