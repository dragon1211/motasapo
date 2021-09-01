import React from 'react';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import {Post} from '../../../../types/entity/Post';
import axios from 'axios';
import {Button} from '@material-ui/core'
import './index.css'
import {PageLoader} from '../../../components/PageLoader';

interface Thanks{
    flag: boolean
    number: number
}

type State = {
    postList: Array<Post>
    status:string
    hearts: Array<Thanks>
    width: number | undefined
    height : number | undefined
}


const styles = (theme:any) => createStyles({
    detail: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    description: {
        position: 'relative',
    },
    descriptionGradient: {
        height: 50,
        background: "linear-gradient(to bottom, #ffffff00, #ffffff)",
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    detailMessage: {
        height: 50,
        overflow: 'hidden',
    },
    detailButton: {
        fontSize: '0.9em',
        borderRadius: '30px',
        padding: "5px 30px",
        boxShadow: "0 0 3px 0px #ccc",
        position: 'absolute',
        bottom: "25",
        background: 'white',
        left: "50%",
        transform: "translate3D(-50%, 100%, 0)",
    }
});

interface Props extends WithStyles<typeof styles>{ }
class PostList extends React.Component<Props,State>{
    /* query */
    _isMounted = false;

    constructor(props:any){
        super(props);
        this.state = {
            postList: [],
            status: '', 
            hearts: [], 
            width:undefined, 
            height:undefined
        };
    }

    componentDidMount  = () => {
        this._isMounted = true;
        var w = document.getElementById('account')?.clientWidth;
        var h;
        if(w) h = w * 3 / 4;
        this.setState({width: w, height: h})
        this.getPosts(0);
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', this.handleResize);
    }

    getPosts(offset:any){
        axios.get('/account/api/posts/?offset=' + offset)
        .then(res=>{
            if(this._isMounted){
                var arr = [];
                const{user_id, posts} = res.data;
                for(let i=0; i<posts.length; i++)
                {
                    var cnt = 0;
                    for(let j=0; j<posts[i].post_likes.length; j++){
                        if(user_id == posts[i].post_likes[j].account_id) cnt++;
                    }
                    if(cnt>0) arr.push({flag: true, number: posts[i].post_likes.length});
                    else arr.push({flag: false, number: posts[i].post_likes.length});
                }
                this.setState({
                    postList: [...posts],
                    status:'loading',
                    hearts: [...arr]
                })
            }
        })
        .catch(err=>{
            this.setState({
                postList: [],
                status:'error'
            })
        })
    }

    handleResize = () => {
        var w = document.getElementById('account')?.clientWidth;
        var h;
        if(w) h = w * 3 / 4;
        this.setState({width: w, height: h})
    }

    heartClick = (id: any, post_id:any) => {
        var arr = [];
        for(let i=0; i<this.state.hearts.length; i++)
        {
            if(i == id){
                if(this.state.hearts[i].flag) arr.push({flag:false, number:this.state.hearts[i].number-1})
                else arr.push({flag:true, number:this.state.hearts[i].number+1})
            }
            else arr.push(this.state.hearts[i])
        }
        this.setState({hearts: [...arr]});
        var method = '';
        if(arr[id].flag == true) method = 'add';
        else method = 'remove';
        var request = {  post_id: post_id, method: method   }
        axios.post('/account/post/thanks', request)
        .then(res=>{
            var arr = [];
            const{user_id, posts} = res.data;
            for(let i=0; i<posts.length; i++)
            {
                var cnt = 0;
                for(let j=0; j<posts[i].post_likes.length; j++){
                    if(user_id == posts[i].post_likes[j].account_id) cnt++;
                }
                if(cnt>0) arr.push({flag: true, number: posts[i].post_likes.length});
                else arr.push({flag: false, number: posts[i].post_likes.length});
            }
            this.setState({
                hearts: [...arr]
            })
        }).catch(e=>{
            console.error(e);
        })
    }

    readMore = (e:any, id:any) => {
        e.preventDefault();
        var detail;
        var gradient;
        if(detail = document.getElementById('detailMessage'+id))
        {
            if(detail.style.height != 'auto')    detail.style.height = 'auto';
            else{
                detail.style.height = '45px';
            } 
        }

        if(gradient = document.getElementById('detailGradient'+id))
        {
            if(gradient.style.display != 'none') gradient.style.display = 'none';
            else gradient.style.display = 'block';
        }
        var btn;
        if(btn = document.getElementById('detailButton'+id))
            btn.style.display = 'none';
    }

    render(){
        const { classes } = this.props;
        if(this.state.status === ''){
            return( 
            <>
                <PageLoader />
                <div className="u-align__center">データの読み込み中...</div>
            </>)
        }
        else if(this.state.status === 'error') {
            return <div className="u-align__center">データの読み込みに失敗しました。</div>
        } 
        else if(!this.state.postList || this.state.postList.length <= 0) {
            return <div className="u-align__center">データが存在していません。</div>
        }
        else
        return (
            <>
                {
                    this.state.postList.map((post, id) => {
                        var pre_msg_h:any, detail_msg_h:any;
                        var recruit_mark = (post.type == '1') ? <div className="item-header-status">募集中</div> : '';
                        return (
                            <div key={id} className="p-post__new--item">
                                <div className="item-header content-item-wrap c-flex v-center h-between">
                                    <div className="item-header-icon c-flex v-center">
                                        <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                        {
                                            post.account.img == '' ?  <img src="/storage/base/person.png" alt="/storage/base/person.png" />
                                            : <a href={`/account/profile/${post.account_id}`}><img src={post.account.img} alt={post.account.img} /></a>
                                        }
                                        </div>
                                        <a href={`/account/profile/${post.account_id}`}><p className="icon-name">{post.account.name}</p></a>
                                    </div>
                                    {recruit_mark}
                                </div>
                                <div className="item-img content-item-wrap">
                                    <ul className="p-post__lists" style={{width: this.state.width, height: this.state.height}}>
                                        {
                                            post.post_images.map((image, id)=>{
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
                                    <a href={`/account/post/comment/${post.id}`}>
                                        <div className="item-action-comment c-flex v-center">
                                            <img src="/storage/base/icon-comment-w.png" />
                                            <span className="comments">コメントする</span>
                                        </div>
                                    </a>
                                    <div className="item-action-heart c-flex v-center">
                                        {
                                            this.state.hearts[id].flag ? <img src="/storage/base/icon-heart-p.png" style={{cursor:'pointer'}} onClick={()=>this.heartClick(id, post.id)}/>
                                            : <img src="/storage/base/icon-heart-w.png" style={{cursor:'pointer'}} onClick={()=>this.heartClick(id, post.id)}/>
                                        }
                                        <span className="goods">{this.state.hearts[id].number}</span>
                                    </div>
                                </div>  
                                        
                                <div className={classes.description}>
                                    <div className={classes.detailMessage} id={`detailMessage${id}`} 
                                        ref={el => {
                                            if (!el) return;
                                            detail_msg_h = el.getBoundingClientRect().height; 
                                        }}>
                                        <pre className="content-item-wrap pre" id={`pre_msg${id}`}
                                            ref={el => {
                                                if (!el) return;
                                                pre_msg_h = el.getBoundingClientRect().height; 
                                            }}>
                                            {post.text}
                                        </pre>
                                    </div>
                                    <div className={classes.descriptionGradient} id={`detailGradient${id}`}
                                        ref={el => {
                                            if (!el) return;
                                            if(detail_msg_h > pre_msg_h) el.style.display='none' 
                                        }}>
                                    </div>
                                    <Button className={classes.detailButton} style={{background:'white'}} 
                                        onClick={e=>this.readMore(e,id)} id={`detailButton${id}`}
                                        ref={el => {
                                            if (!el) return;
                                            if(detail_msg_h > pre_msg_h) el.style.display='none' 
                                        }}>
                                        続きを読む
                                    </Button>
                                </div>
                                {/* <div className="item-header content-item-wrap c-flex v-center h-between">
                                    <div className="item-header-icon c-flex v-center">
                                        <div className="item-action-comment c-flex v-center">
                                        {
                                            post.post_tags.map((tag, id)=>{
                                                return  <div className="item-header-status" key={id} style={{background: '#eee', color:'black', margin:'2px 5px', padding:'5px 25px'}}>Tag</div>
                                            })
                                        }
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        )
                    })
                }
                
            </>
        )
    }
}

export default  withStyles(styles, { withTheme: true })(PostList);
