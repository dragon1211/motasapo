import React from 'react';
import {Header} from '../../../layout/Header'
import {Button, Grid} from '@material-ui/core';
import './Profile.css';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import GlobalNav from '../../../layout/GlobalNav';

import axios from 'axios';

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: '#b7cfe0',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.black
            },
        },
    },
}))(MenuItem);

interface State {
    suggestions:any,
    // anchorEl:any,
    first_img_src:any | undefined
    upload_images:any| undefined
    post_msg:any | undefined
    status: any | undefined
}
export class ShopImage extends React.Component<{},State> {

    constructor(props:any) {
        super(props);
        this.state = {
            suggestions: '',
            first_img_src: '',
            upload_images: '',
            post_msg: '',
            status: '',
        };
    }

    componentWillMount = () => {
        axios.post('/account/request/profiledata')
        .then(res=>{
            var data = res.data[0];
            this.setState({
                suggestions: data,
                first_img_src: data.img,
                status: 'load'
            });
        })
    }

    image_upload_button = ( ) =>(
        <div>
            <div className="upload_img">
                <img className="avatar" src={this.state.first_img_src} alt="chankan.jpg" />
            </div>
            <div className="pl-2" style={{paddingTop:'11px'}}>
                {this.dropdown_menu_button()}
            </div>
        </div>
    )

    handleChange(e:any){
        e.preventDefault();
        var val = e.target.value;
            const files = Array.from(e.target.files);
            const promises = files.map((file:any) => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev:any) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });

            Promise.all(promises).then(images => {
                this.setState({
                    upload_images: images,
                    first_img_src: images[0]
                })
            }, error => { console.error(error); });

       
    }

    dropdown_menu_button = () => (
        <>
            <label className="shop-img-upload" htmlFor="img-upload" style={{width:'100%'}}>
                <span>撮り直す</span>
            </label>
        </>
    )

    handleSubmit = (e:any) => {
        e.preventDefault();
        const formdata = new FormData();
        this.state.upload_images.forEach((image_file:any) => {
            formdata.append('images', image_file);
        });

        axios.post('/account/profile/imgStore', formdata)
        .then(response => {
            if(response.data=="success"){
                window.location.href = '/account/request/shop_profile';
            }
        })
    }
    render() {
        if(this.state.status !== 'load') return <div className="profile-loading">データの読み込み中...</div>

        return (
        <>
            <Header title="LOGO"/>
            <div className="info profile-body">
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <div className="p-20 text-center">
                        {  this.state.first_img_src!=null? this.image_upload_button() : this.dropdown_menu_button() }
                        <input accept="image/*" id="img-upload" type="file" name="upload_images" onChange={this.handleChange.bind(this)} multiple/>
                    </div>
                    <div className="shop-img-title">
                        <span>プロフィール画像を変更する</span>
                    </div>
                    <div className="p-20">
                        <button type="submit" className="collect-btn" >投稿する</button>
                    </div>
                </form>
            </div>
            <GlobalNav />
        </>
        );
    }
}
