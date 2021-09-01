import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import GlobalNav from '../../../tsx/views/layout/GlobalNav';
import  '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
// import {Header} from '../../layout/Header'
import axios from 'axios';
import { Data } from '@react-google-maps/api';
// import { shopQuery } from '../../../tsx/queries/ShopQuery';

interface State{
    account:string
    account_type:number
    img:string
    name:string
    posts:Array<any>
    profile:string
    sex:string
    tel:string
    email:string
    follow_account_id:number
    follower_account_id:number
}

 class Profile extends React.Component <{}, State>{

    // const { data:shops } = shopQuery();
    constructor(props:any){
        super(props)
        this.state = {
            account:'',
            account_type:0,
            img:'',
            name:'',
            posts:[],
            profile:'',
            sex:'',
            tel:'',
            email:'',
            follow_account_id:0,
            follower_account_id:0
        }
        this.handleFollow = this.handleFollow.bind(this);
    }
      
    handleFollow(){
        axios({
            method: "get",
            url: "/account/follow"
           }).then((res:any)=>{
                
                console.log(res.data);
                
           }).catch((error:any)=>{
                console.log('err')
           });
    }
      componentDidMount() {
        axios({
            method: "get",
            url: "/account/profile/data/account"
           }).then(res=>{
            const data = res.data;
            this.setState({
                account : data.account,
                account_type : data.account_type,
                img:data.img,
                name:data.name,
                posts:data.posts,
                profile:data.profile,
                tel:data.tel,
                email:data.email,
                follow_account_id:data.follow_account_id,
                follower_account_id:data.follower_account_id,
                sex:data.sex

            });
            console.log(data);
            

           }).catch((error)=>{
                console.log('err')
           }); 
      };

    render(){
        return (
            <>
                <div>
                    <div className="info" style={{ marginTop:"100px" }}>
                        <div className="row">
                            <div className="col-sm-6 text-center">
                                <img className="avatar" src={this.state.img} alt="profile" />
                            </div>
                            <div className="col-sm-6 text-left">
                                {
                                    this.state.account_type == 1 ?(<p className="sex">{this.state.sex}</p>):<span></span>
                                }
                            
                                <h2>{this.state.account}</h2>
                                <p className="name">{this.state.name}</p>
                                <div className="row">
                                    <div className="follow col-sm-4">
                                        <p>フォロワー</p>
                                        <p>フォロー</p>
                                    </div>
                                    <div className="col-sm-8 text-left">
                                        <p>210,000</p>
                                        <p>10,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="msg text-center">
                            {   this.state.profile   }<br/>                                
                            <button className="text-center round-btn-more">続きを読む</button>
                        </div>
                        {
                            this.state.account_type == 1 ?                
                                (<div className="btnBox">
                                        <div className="row">
                                            <div className="col-6 pl-0">
                                                    <button onClick={this.handleFollow} className="round-btn">フォローする</button>
                                            </div>
                                            <div className="col-6 pr-0">
                                                <a href="/account/message">
                                                    <button className="round-btn">メッセージを送る</button>
                                                </a>
                                            </div>
                                        </div>
                                </div>) :
                                ( <div className="btnBox">
                                    <div className="row">
                                        <div className="col-5 p-0">
                                            <button onClick={this.handleFollow} className="round-btn">フォローする</button>
                                        </div>
                                        <div className="col-2 pr-1">
                                            <a href={`mailto:${this.state.email}`}>    
                                                <button className="round-btn"><EmailOutlinedIcon /></button>
                                            </a>
                                        </div>
                                        <div className="col-2 pl-1">
                                            <a href={`tel:${this.state.tel}`}>
                                                <button className="round-btn"><PhoneOutlinedIcon /></button>
                                            </a>
                                        </div>
                                        <div className="col-3 p-0">
                                            <a href="">
                                                <button className="round-btn">Map</button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="estimate-1">
                                        <a href="">
                                            <button className="round-btn my-1">ショップに位置情報を送る</button>
                                        </a>                                        
                                    </div>
                                </div>
                                )
                        }
                    </div>
                    <div className='imgBox'>
                        <div className="row">
                            {   
                                this.state.posts.map((post:any,idx:any)=>
                                {
                                    return post.post_images.map((image:any , id:any)=>{
                                        return(
                                        <div className='col-sm-4' key={id}>
                                            <div className="img-wrapper">
                                                <img src={image.url} className="post_img" alt={image.url} />
                                                {
                                                    this.state.account_type ==1 ?
                                                    (<img src="/storage/base/Group 1.png" alt="Group 93.png" className="hint-1" />):
                                                    <span></span>
                                                    
                                                }
                                                {/* <img src="/storage/base/Group 2.png" alt="Group 94.png" className="hint-2" /> */}
                                            </div>
                                        </div>
                                        )
                                    })        
                                })
                            }
                        </div>
                    </div>
                </div>
                <GlobalNav />
            </>
        );
    }
}

export default Profile ;

                    // <Grid item xs = {6}>
                    //     <Grid container spacing = {1} justifyContent="space-between">
                    //         <Grid item>
                    //             <a className={classes.button} href={`mailto:${shop.mail}`}><EmailOutlinedIcon /></a>
                    //         </Grid>
                    //         <Grid item>
                    //             <a className={classes.button} href={`tel:${shop.tel}`}><PhoneOutlinedIcon /></a>
                    //         </Grid>
                    //         <Grid item>
                    //             <a className={classes.button} onClick={() => {navigator.clipboard.writeText(shop.addresss)}}>MAP</a>
                    //         </Grid>
                    //     </Grid>
                    // </Grid>