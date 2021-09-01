
import React from "react";
// import  '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './MyPage.css';
import GlobalNav from '../../../layout/GlobalNav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import axios from 'axios';

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

export class MyPageIndex extends React.Component <{}, State>{

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
    }
      
      componentDidMount() {
        axios({
            method: "get",
            url: "/account/Mypage_data"
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
                    <div className="info">
                        <div className="row">
                            <div className="col-sm-6 text-center">
                                <img className="avatar" src={this.state.img} alt={this.state.img} />
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
                        <div className="btnBox">
                            <div className="row">
                                <div className="col-sm-4">
                                    <button className="round-btn">プロフィール編集</button>
                                </div>
                                <div className="col-sm-4">
                                    <button className="round-btn">ロードサービス</button>
                                </div>
                                <div className="col-sm-4">
                                    <button className="round-btn"><p>運営者へ</p><p>お問い合わせ</p></button>
                                </div>
                            </div>

                            <div className="estimate-1">
                                {/* <a href="/account/request/new/type/"><button className="round-btn bg-black my-1">一斉見積もり</button>
                                        <img src="/storage/base/Group 95.png" alt="Group 95.png" className="question"/></a> */}
                                <Link to="/account/request/new/type/"><button className="round-btn bg-black my-1">一斉見積もり</button>
                                    <img src="/storage/base/Group 95.png" alt="Group 95.png" className="question" /></Link>
                            </div>

                        </div>
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

