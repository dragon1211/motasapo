import React from 'react';
import {Post} from '../../types/entity/Post';
import axios from 'axios';

interface Thanks{
    flag: boolean
    number: number
}
class PostList extends React.Component<{},{postList: Array<Post>, status:string, hearts: Array<Thanks>}>{
    /* query */
    _isMounted = false;

    constructor(props:any){
        super(props);
        this.state = {postList: [], status: '', hearts: []};
    }

    componentDidMount  = () => {
        this._isMounted = true;
        this.getPosts(0);
    }

    componentWillUnmount() {
        this._isMounted = false;
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
            // console.log(res.data)
        }).catch(e=>{
            console.error(e);
        })
    }

    render(){
        if(this.state.status === ''){
            return <div className="u-align__center">データの読み込み中...</div>
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
                        var recruit_mark = (post.type == '1') ? <div className="item-header-status">募集中</div> : '';
                        return (
                            <div key={id} className="p-post__new--item">
                                <div className="item-header content-item-wrap c-flex v-center h-between">
                                    <div className="item-header-icon c-flex v-center">
                                        <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                        {
                                            post.account.img == '' ?  <img src="/storage/base/person.png" alt="/storage/base/person.png" />
                                            : <img src={post.account.img} alt={post.account.img} />
                                        }
                                        </div>
                                        <p className="icon-name">{post.account.name}</p>
                                    </div>
                                    {recruit_mark}
                                </div>
                                <div className="item-img content-item-wrap">
                                    <ul className="p-post__lists" style={{width: '350px', height: '300px'}}>
                                        {
                                            post.post_images.map((image, id)=>{
                                                return(
                                                    <li className="p-post__list" key = {id}>
                                                        <img src={image.url} style={{width: '100%', height: '100%'}}/>
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
                                <div className="item-body">
                                    <p className="content-item-wrap">{post.text}</p>
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

export default PostList;
