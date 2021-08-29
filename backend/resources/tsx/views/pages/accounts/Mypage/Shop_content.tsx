
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
export class ShopProfileContent extends Component <{},State> {

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
        axios.post('/account/request/shopProfiledata')
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
                            <Link to="/account/request/shop_image_edit/" className="image-change">プロフィール画像を変更する</Link><hr className="profile-hr"></hr>
                            <div className="col-sm-12 text-left">
                                <div className="row">
                                    <div className="shopcontent">
                                        <p className="title">カテゴリー</p>
                                        <p className="title-content">{this.state.test_data.category_name}</p>
                                        <p className="title">ショップ名</p>
                                        <p className="title-content">{this.state.test_data.name}</p>
                                        <p className="title">ユーザー名</p>
                                        <p className="title-content">{this.state.test_data.account}</p>
                                        <p className="title">メール</p>
                                        <p className="title-content">{this.state.test_data.email}</p>
                                        <p className="title">パスワード</p>
                                        <p className="title-content"><Link to="/account/request/shopPass_edit/" className="image-change">パスワード</Link></p>
                                        <p className="title">URL</p>
                                        <p className="title-content">{this.state.test_data.url}</p>
                                        <p className="title">詳細</p>
                                        <p className="title-content">{this.state.test_data.detail}</p>
                                        <p className="title">営業時間</p>
                                        <p className="title-content">{this.state.test_data.hour}</p>
                                        <p className="title">会社名</p>
                                        <p className="title-content">{this.state.test_data.company}</p>
                                        <p className="title">代表者名</p>
                                        <p className="title-content">{this.state.test_data.person}</p>
                                        <p className="title">電話番号</p>
                                        <p className="title-content">{this.state.test_data.tel}</p>
                                        <p className="title">郵便番号</p>
                                        <p className="title-content">{this.state.test_data.post}</p>
                                        <p className="title">都道府県</p>
                                        <p className="title-content">{this.state.test_data.prefecture_name}</p>
                                        <p className="title">住所</p>
                                        <p className="title-content">{this.state.test_data.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="btnBox">
                            <div className="edit-btn">
                                <div className="col-sm-12 account-btn">
                                    <Link to="/account/request/shop_profielEdit/">編集する</Link>
                                </div>
                                <div className="col-sm-12 text-center">
                                    <Link to="/account/request/shopProfilePage-cancel/">退会する</Link>
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

