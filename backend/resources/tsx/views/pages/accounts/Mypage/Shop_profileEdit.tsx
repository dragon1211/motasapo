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
    url: string;
    detail: string;
    hour: string;
    company:string;
    presentName:string;
    phone:string;
    postcode:string;
    prefecture:string;
    prefecture_id:string;
    address:string;
    category:string;
    profile:any | undefined;
    status:string;
    show_category: Boolean;
    categoryAdd:string;
    prefecture_list:Array<any>;
}

export class ShopProfileEdit extends React.Component<{},State> {

    _isMounted = false

    constructor(props:any) {
        super(props);
        this.state = {
            status: '',
            suggestions: '',
            name: '',
            account: '',
            email: '',
            url: '',
            detail: '',
            hour: '',
            company: '',
            presentName: '',
            phone: '',
            postcode: '',
            prefecture: '',
            prefecture_id: '',
            address: '',
            category: '',
            profile: '',
            show_category:false,
            categoryAdd:'',
            prefecture_list: []
        };
    }

    componentWillMount = () => {
        axios.post('/account/request/shopProfiledata')
        .then(response=>{
            var data = response.data[0];
            this.setState({
                suggestions: data,
                name: data.name,
                account: data.account,
                email: data.email,
                url: data.url,
                detail: data.detail,
                hour: data.hour,
                company: data.company,
                presentName: data.person,
                phone: data.tel,
                postcode: data.post,
                // prefecture: data.prefecture_name,
                address: data.address,
                // category:data.category_name,
                prefecture_list:data.prefecture_list,
                prefecture_id: data.prefecture_id,
                status: 'load'
            })
        })
    }

    handleChange(e:any, type:string){
        e.preventDefault();
        var val = e.target.value;
        switch (type) {
            case 'name':
                this.setState({name: val})
                break;
            case 'account':
                this.setState({account: val})
                break;
            case 'email':
                this.setState({email: val})
                break;
            case 'url':
                this.setState({url: val})
                break;
            case 'detail':
                this.setState({detail: val})
                break;
            case 'hour':
                this.setState({hour: val})
                break;
            case 'company':
                this.setState({company: val})
                break;
            case 'presentName':
                this.setState({presentName: val})
                break;
            case 'phone':
                this.setState({phone: val})
                break;
            case 'postcode':
                this.setState({postcode: val})
                break;
            case 'prefecture':
                this.setState({prefecture: val})
                break;
            case 'address':
                this.setState({address: val})
                break;
            case 'category':
                this.setState({category: val})
                break;
            case 'categoryAdd':
                this.setState({categoryAdd: val})
                break;
        }
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', this.state.name);
        formdata.append('account', this.state.account);
        formdata.append('email', this.state.email);
        formdata.append('url', this.state.url);
        formdata.append('detail', this.state.detail);
        formdata.append('hour', this.state.hour);
        formdata.append('company', this.state.company);
        formdata.append('presentName', this.state.presentName);
        formdata.append('phone', this.state.phone);
        formdata.append('postcode', this.state.postcode);
        formdata.append('prefecture', this.state.prefecture);
        formdata.append('address', this.state.address);
        if(this.state.categoryAdd) {
            if(this.state.categoryAdd != "") {
                formdata.append('categoryAdd', this.state.categoryAdd);
            } else {
                alert('?????????????????????????????????????????????');
                return;
            }

        } else {
            if(this.state.category != "") {
                formdata.append('category', this.state.category);
            } else {
                alert('?????????????????????????????????????????????');
                return;
            }
        }
        axios.post('/account/profile/shopProfile_update', formdata)
        .then(response => {
            if(response.data=="success"){
                window.location.href = '/account/request/shop_profile';
            } else {
                console.log(response.data);
            }
        })
    }

    render() {
        if(this.state.status !== 'load') return <div className="profile-loading">???????????????????????????...</div>

        return (
        <>
            <Header title="LOGO"/>
            <div className="account-edit">
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <div className="p-20">
                        <label className="form-label" htmlFor="name">???????????????</label>
                        <input type = "text" className=" is-invalid" id="name" name="name" value = {this.state.name} onChange={(e)=>this.handleChange(e, 'name')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label accountName-disabled" htmlFor="account">????????????????????????????????????</label>
                        <input type = "text" className="is-invalid accountName-disabled" id="account" name="account" value = {this.state.account} onChange={(e)=>this.handleChange(e, 'account')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="email">?????????????????????</label>
                        <input type = "text" className=" is-invalid" id="email" name="email" value = {this.state.email} onChange={(e)=>this.handleChange(e, 'email')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="url">URL</label>
                        <input type = "text" className="is-invalid" id="url" name="url" value = {this.state.url} onChange={(e)=>this.handleChange(e, 'url')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="detail">??????</label>
                        <textarea className="is-invalid" id="detail" rows = {7} value = {this.state.detail} name="detail" onChange={(e)=>this.handleChange(e, 'detail')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="hour">????????????</label>
                        <textarea className="is-invalid" id="hour" rows = {7} value = {this.state.hour} name="hour" onChange={(e)=>this.handleChange(e, 'hour')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="company">?????????</label>
                        <input type = "text" className="is-invalid" id="company" name="company" value = {this.state.company} onChange={(e)=>this.handleChange(e, 'company')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="presentName">????????????</label>
                        <input type = "text" className="is-invalid" id="presentName" name="presentName" value = {this.state.presentName} onChange={(e)=>this.handleChange(e, 'presentName')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="phone">????????????</label>
                        <input type = "text" className="is-invalid" id="phone" name="phone" value = {this.state.phone} onChange={(e)=>this.handleChange(e, 'phone')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="postcode">????????????</label>
                        <input type = "text" className="is-invalid" id="postcode" name="postcode" value = {this.state.postcode} onChange={(e)=>this.handleChange(e, 'postcode')} pattern="[0-9]{7}" required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="prefecture">????????????</label>
                        <select className="is-invalid" id="prefecture" name="prefecture" onChange={(e)=>this.handleChange(e, 'prefecture')} required>
                            <option></option>
                            {
                                this.state.prefecture_list.map((prefecture, id) => <option value={id + 1} key={id}>{prefecture.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="address">??????</label>
                        <input type = "text" className="is-invalid" id="address" name="address" value = {this.state.address} onChange={(e)=>this.handleChange(e, 'address')} required/>
                    </div>
                    <div className="p-20">
                        <label className="form-label" htmlFor="category">???????????????</label>
                        <select className="is-invalid" id="category" name="category" onChange={(e)=>this.handleChange(e, 'category')} required >
                            <option> ?????????????????????????????????????????????</option>
                            <option value="1"> ?????????????????????</option>
                            <option value="2"> ???????????????????????????</option>
                            <option value="3"> ?????????????????????</option>
                            <option value="4"> ???????????????????????????</option>
                            <option value="5"> ????????? </option>
                            <option value="6"> ??????????????? </option>
                            <option value="7"> ????????? </option>
                            <option value="8"> ??????????????? </option>
                            <option value="9"> ??????????????????????????????</option>
                            <option value="10"> ????????????????????????????????????</option>
                            <option value="11"> ??????????????? </option>
                            <option value="12"> ????????????????????? </option>
                            <option value="13"> ????????????????????? </option>
                            <option value="14"> ??????????????????????????? </option>
                            <option value="15"> ????????????????????????</option>
                            <option value="16"> ?????????????????????????????? </option>
                            <option value="17"> ????????????????????????</option>
                            <option value="18"> ??????????????????????????????</option>
                        </select>
                    </div>

                        {
                            this.state.show_category ? 
                            <div className="p-20 shop-category">
                                <label className="form-label" htmlFor="categoryAdd">????????????????????????</label><label className="form-label categoryCancel" htmlFor="categoryCancel" onClick = {()=>{this.setState({show_category:false})}}>?????????????????????</label>
                                <input type = "text" className=" is-invalid" id="categoryAdd" name="categoryAdd" onChange={(e)=>this.handleChange(e, 'categoryAdd')} required/>
                            </div> : null
                        }
                        <button type="button" className="category-add" onClick={()=>{ this.setState({show_category: true});}}>???????????????????????? +</button>
                    <div className="p-20">
                        <button type="submit" className="collect-btn" >???????????????????????????</button>
                    </div>
                </form>
            </div>
            <GlobalNav />
        </>
        );
    }
}
