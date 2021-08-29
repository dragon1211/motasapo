import React from 'react';
import {Header} from '../../../layout/Header'
import '../new_post/new_post.css'
import './react_tag.css'
import axios from 'axios';
interface State {
    oldpass:any;
    newpass:any | undefined;
    confirmpass:any| undefined;
}

export class ProfilePassEdit extends React.Component<{},State> {

    constructor(props:any) {
        super(props);
        this.state = {
            oldpass: '',
            newpass: '',
            confirmpass: '',
        };
    }
    
    handleChange(e:any, type:string){
        e.preventDefault();
        var val = e.target.value;
        if(type=='oldpass') this.setState({oldpass: val})
        else if(type=='newpass') this.setState({newpass: val})
        else if(type=='confirm') this.setState({confirmpass: val})
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        if(this.state.newpass == this.state.confirmpass) {
            const formdata = new FormData();
            formdata.append('oldPass', this.state.oldpass);
            formdata.append('newPass', this.state.newpass);
    
            axios.post('/account/profile/pass_update', formdata)
            .then(response => {
                if(response.data=="success"){
                    window.location.href = '/account/request/profile';
                } else {
                    alert('パスワード更新に失敗し');
                }
            })
        } else {
            alert('パスワードを再確認してください。');

        }
    }
    render() {

        return (
        <>
            <Header title="LOGO"/>
            <div className="account-edit">
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <div className="p-20">
                        <label className="form-label" htmlFor="oldpass">旧パスワード</label>
                        <input type = "password" className=" is-invalid" id="oldpass" name="oldpass" placeholder = "旧パスワード" onChange={(e)=>this.handleChange(e,'oldpass')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="newpass">新パスワード</label>
                        <input type = "password" className=" is-invalid" id="newpass" name="newpass" placeholder = "新パスワード"  onChange={(e)=>this.handleChange(e, 'newpass')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="confirm">確認用新パスワード</label>
                        <input type = "password" className=" is-invalid" id="confirm" name="confirm" placeholder = "確認用新パスワード" onChange={(e)=>this.handleChange(e,'confirm')} required/>
                    </div>
                    
                    <div className="p-20">
                        <button type="submit" className="collect-btn" >パスワードを更新</button>
                    </div>
                </form>
            </div>
        </>
        );
    }
}
