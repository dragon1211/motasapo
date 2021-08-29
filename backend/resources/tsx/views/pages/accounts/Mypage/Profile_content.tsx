import React from 'react';
import {Header} from '../../../layout/Header'
import '../new_post/new_post.css'
import './react_tag.css'
import GlobalNav from '../../../layout/GlobalNav';
import axios from 'axios';
interface State {
    suggestions:any;
    name:any;
    account:any | undefined;
    email:any| undefined;
    profile:any | undefined;
    status:string;
}

export class ProfileAccountEdit extends React.Component<{},State> {

    constructor(props:any) {
        super(props);
        this.state = {
            status: '',
            suggestions: '',
            name: '',
            account: '',
            email: '',
            profile: '',
        };
    }

    componentWillMount = () => {
        axios.post('/account/request/profiledata')
        .then(response=>{
            var data = response.data[0];
            this.setState({
                suggestions: data,
                name: data.name,
                account: data.account,
                email: data.email,
                profile: data.profile,
                status: 'load'
            })
        })
    }

    handleNameChange(e:any){
        e.preventDefault();
        var val = e.target.value;
        this.setState({ name: val })
    }
    handleAccountChange(e:any){
        e.preventDefault();
        var val = e.target.value;
        this.setState({ account: val })
    }
    handleEmailChange(e:any){
        e.preventDefault();
        var val = e.target.value;
        this.setState({ email: val })
    }
    handleChange(e:any){
        e.preventDefault();
        var val = e.target.value;
        this.setState({ profile: val })
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', this.state.name);
        formdata.append('account', this.state.account);
        formdata.append('email', this.state.email);
        formdata.append('profile', this.state.profile);

        axios.post('/account/profile/account_edit', formdata)
        .then(response => {
            if(response.data=="success"){
                window.location.href = '/account/request/profile';
            }
        })
    }
    render() {
        if(this.state.status !== 'load') return <div className="profile-loading">データの読み込み中...</div>

        return (
        <>
            <Header title="LOGO"/>
            <div className="account-edit">
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <div className="p-20">
                        <label className="form-label" htmlFor="name">お名前</label>
                        <input type = "text" className="is-invalid" id="name" name="name" value = {this.state.name} onChange={this.handleNameChange.bind(this)} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="account">ユーザー名</label>
                        <input type = "text" className="is-invalid accountName-disabled" id="account" name="account" value = {this.state.account} onChange={this.handleAccountChange.bind(this)} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="email">メール</label>
                        <input type = "text" className="is-invalid" id="email" name="email" value = {this.state.email} onChange={this.handleEmailChange.bind(this)} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="profile">自己紹介</label>
                        <textarea className="is-invalid" id="profile" rows = {7} value = {this.state.profile} name="profile" onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div className="p-20">
                        <button type="submit" className="collect-btn" >変更内容を保存する</button>
                    </div>
                </form>
            </div>
            <GlobalNav />
        </>
        );
    }
}
