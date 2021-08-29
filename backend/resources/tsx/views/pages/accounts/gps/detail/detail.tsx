import React from 'react';
import {Header} from '../../../../layout/Header'
import './detail.css';
import {Grid, Button} from '@material-ui/core';
import axios from 'axios';
import {Post} from '../../../../../types/entity/Post';

type State = {
    post: Post | undefined
    time: string
    status:string
    width: number | undefined
    height : number | undefined
    selected: string
}
export class Detail extends React.Component <{post?: Post, time:string},State> {

    _isMounted = false;

    constructor(props:any){
        super(props);
        this.state = {
            post: this.props.post,
            time: this.props.time,
            status:'loading',
            width: 0,
            height : 0,
            selected: ''
        }
    }

    componentDidMount(){
        this._isMounted = true;
        var w = document.getElementById('detail')?.clientWidth;
        var h;
        if(w) h = w * 3 / 4;
        this.setState({width: w, height: h})
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount(){
        this._isMounted = false;
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = (e:any) => {
        var w = document.getElementById('detail')?.clientWidth;
        var h;
        if(w) h = w * 3 / 4;
        this.setState({width: w, height: h})
    }

    handleClick = (type:string) => {
        this.setState({selected: type})
    }

    render(){
        return(
        <div>
            <Header title="LOGO"/>    
            <div className="account-content" style={{paddingTop:'65px'}}>
                {
                    this.state.post ?
                        <div className="account-content-item p-post__new">
                            <div className="p-post__new--item">
                                <div className="item-header content-item-wrap c-flex v-center h-between">
                                    <div className="item-header-icon c-flex v-center">
                                        <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                            <img src={this.state.post.account.img} alt="/storage/base/person.png" />
                                        </div>
                                        <p className="icon-name">{this.state.post.account.name}</p>
                                    </div>
                                </div>
                                <div className="item-img content-item-wrap">
                                    <ul className="p-post__lists" style={{width: this.state.width, height: this.state.height}}>
                                        {
                                            this.state.post.post_images.map((image, id)=>{
                                                return(
                                                    <li className="p-post__list" key = {id}>
                                                        <img src={image.url} style={{width: '100%',  height: '100%',  objectFit: 'contain'}}/>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="item-action c-flex v-center h-between content-item-wrap">
                                    <div className="item-action-comment c-flex v-center">
                                        <img src="/storage/base/icon_eye_p.png" />
                                        <span className="eye" style={{paddingLeft:'10px'}}>
                                            {this.state.post.post_views.length}
                                        </span>
                                    </div>
                                    <div className="item-action-heart c-flex v-center">
                                        <span className="time">{this.state.time}</span>
                                    </div>
                                </div>  
                                <pre className="content-item-wrap pre">
                                    {this.state.post.text}
                                </pre>
                            </div>
                        </div>
                    : <div className="u-align__center">データが存在していません。</div>
                }
                <div className = 'btn-bar'>
                    <Grid container item  spacing={1}>
                        <Grid item xs={6}>
                        {
                            this.state.selected == 'profile'?
                            <Button className="round-btn selected" onClick={()=>this.handleClick('profile')}>プロフィールを見る</Button>
                            :<Button className="round-btn" onClick={()=>this.handleClick('profile')}>プロフィールを見る</Button>
                        }
                        </Grid>
                        <Grid item xs={6}>
                        {
                            this.state.selected == 'msg'?
                            <Button className="round-btn selected" onClick={()=>this.handleClick('msg')}>メッセージを送る</Button>
                            :<Button className="round-btn" onClick={()=>this.handleClick('msg')}>メッセージを送る</Button>
                        }
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
        )
    }
}