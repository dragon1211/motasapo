import React from 'react';
import {TopNarBar} from '../topnavbar';
import {Button, Grid} from '@material-ui/core';
import './new_post.css'
import './react_tag.css'
import {AddTags} from './addTags';
import {StyledMenus} from './styled_menu';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {ListItemIcon,ListItemText}  from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { isError } from 'react-query';
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

type State={
  tags:any, 
  suggestions:any, 
  anchorEl:any,
  first_img_src:any | undefined
  upload_images:any| undefined
  post_msg:any | undefined
}

export class New_Post extends React.Component<{},State> {

    constructor(props:any) {
      super(props);
      this.state = {
        tags: [],
        suggestions: [],
        anchorEl: null,
        first_img_src: undefined,
        upload_images: [],
        post_msg: '',
      };
    }

    componentWillMount = () => {
      axios.get('/account/new_post/get_tags')
      .then(res=>{
        var tags = res.data;
        this.setState({suggestions: [...tags]});
      })
    }
  
    handleOpen = (event:any) => {
      this.setState({anchorEl:event.currentTarget});
    };
  
    handleClose = (event:any) => {
      this.setState({anchorEl:null})
    };

    
    handleDelete(i:any) {
      const tags = this.state.tags.slice(0);
      tags.splice(i, 1);
      this.setState({ tags:[...tags] });
    }
  
    handleAddition(tag:any) {
      if(this.state.tags.length>=5) return;
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags })
      if(!this.state.suggestions.includes(tag)){
        const suggestions = [].concat(this.state.suggestions, tag);
        this.setState({ suggestions });
      }
    }

    image_upload_button = ( ) =>(
      <Grid container item xs={12}>
          <Grid item sm={2} xs={3} style={{width:'70px', height:'70px'}}>
              <img src={this.state.first_img_src} width='100%' height='100%'/>    
          </Grid>
          <Grid item sm={10} xs={9}>
              <div className="pl-2" style={{paddingTop:'12px'}}>
                 {this.dropdown_menu_button()}
              </div>
          </Grid>
      </Grid>
    )

    handleChange(e:any){
      e.preventDefault();
      var val = e.target.value;
      if(e.target.id=='img-upload'){
 
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
      else if(e.target.id=='post-msg'){
         this.setState({ post_msg: val })
      }
    }

    dropdown_menu_button = () => (
      <>
       <label htmlFor="img-upload" style={{width:'100%'}}>
          <Button variant="contained" className="addPic-btn" component="span">写真を選択</Button>
        </label>
        {/*
          <Button variant="contained" className="addPic-btn"  onClick = {this.handleOpen.bind(this)}>写真を選択</Button>
        <StyledMenus anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <StyledMenuItem>
                <ListItemText primary="フォトライブラリ"  />
                <ListItemIcon><FilterNoneIcon fontSize="medium" /></ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="写真を撮る" />
                <ListItemIcon><CameraAltIcon fontSize="medium" /></ListItemIcon>
              </StyledMenuItem>
              <label htmlFor="img-upload" style={{width:'100%'}}  onClick={this.handleClose}>
                  <StyledMenuItem>
                        <ListItemText primary="ブラウズ" />
                        <ListItemIcon><MoreHorizIcon fontSize="medium" /></ListItemIcon>
                  </StyledMenuItem>
              </label>
        </StyledMenus> */}
      </>
    )

    handleSubmit = (e:any) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('tags', JSON.stringify(this.state.tags));
      formdata.append('post_msg', JSON.stringify(this.state.post_msg));

      this.state.upload_images.forEach((image_file:any) => {
        console.log(image_file);
        formdata.append('images[]', image_file);
      });

      axios.post('/account/new_post/store', formdata)
      .then(response => {
        if(response.data=="success"){
          window.location.href = '/account/post';
        }
      })
    }
    render() {
      return (
        <>
         <TopNarBar title="LOGO"/>
            <div className="new-body">
              <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                <div className="p-20">
                    <label className="form-label" >画像（最大10枚）</label>
                    {  this.state.first_img_src!=null? this.image_upload_button() : this.dropdown_menu_button() }
                    <input accept="image/*" id="img-upload" type="file" name="upload_images[]" onChange={this.handleChange.bind(this)} multiple/>
                </div>
                <div className="p-20">
                    <label className="form-label" htmlFor="post-msg">本文（最大1000文字）</label>
                    <textarea className=" post-text form-control" id="post-msg" rows = {7} name="msg" onChange={this.handleChange.bind(this)} required/>
                </div>
                <div className="p-20" style={{zIndex: 10}}>
                    <label className="form-label" htmlFor="tag-input">タグ（最大5つ）</label>
                    <AddTags  tags={this.state.tags} suggestions={this.state.suggestions}  
                      onDelete={this.handleDelete.bind(this)}  
                      onAddition={this.handleAddition.bind(this)}/>
                </div>
                <div className="p-20">
                    <button type="submit" className="collect-btn" >投稿する</button>
                </div>
              </form>
            </div>
        </>
      );
    }
  }
  

  