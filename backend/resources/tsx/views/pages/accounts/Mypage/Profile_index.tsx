
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

interface State {
    test_data: any;
    status: string;
}
export class ProfileIndex extends Component <{},State> {

    _isMounted = false

    test_data:any;
    constructor(Props:any){
        super(Props);
        
        this.state = {
            test_data: '',
            status: ''
        }
        
    }

    componentDidMount(){
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    getData =  () =>{
        axios.post('/account/request/profiledata')
        .then(response=>{
            var data = response.data[0];
            this.setState({
                test_data: data,
                status: 'load'
            })
        })

    }

    render(){
        if(this.state.status !== 'load') return <div className="profile-loading">データの読み込み中...</div>
        
        return (
            <>
                <div>
                    <div className="info profile-body">
                        <div className="profile-row">
                            <div className="img-content">
                                <img className="avatar" src={this.state.test_data.img} />
                            </div>
                            <Link to="/account/request/image_edit/" className="image-change">プロフィール画像を変更する</Link><hr className="profile-hr"></hr>
                            <div className="col-sm-12 text-left">
                                <div className="row profile-content">
                                    <div className="follow profile-list">
                                        <p>お名前</p>
                                        <p>ユーザー名</p>
                                        <p>メール</p>
                                        <p>パスワード</p>
                                        <p>自己紹介</p>
                                    </div>
                                    <div className="col-sm-8 text-left txt-content">
                                        <p>{this.state.test_data.name}</p>
                                        <p>{this.state.test_data.account}</p>
                                        <p>{this.state.test_data.email}</p>
                                        <Link to="/account/request/pass_edit/" className="image-change"><p>パスワードを変更</p></Link>
                                        <p>{this.state.test_data.profile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="btnBox">
                            <div className="edit-btn">
                                <div className="col-sm-12 account-btn">
                                    <Link to="/account/request/profile_account/">編集する</Link>
                                </div>
                                <div className="col-sm-12 text-center">
                                    <Link to="/account/request/profilePage-cancel/">退会する</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GlobalNav />
            </>
        );
    }

}

