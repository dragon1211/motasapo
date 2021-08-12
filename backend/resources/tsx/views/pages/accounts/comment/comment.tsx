import React from 'react';
import './comments.css';

 export interface Profile{
    name: string
    pic: string
    MsgBox: Array<msgs>
    // time: number
    // flag: boolean      
}

interface msgs {
    receive : String
    receive_msg : String
    receive_time : String
}

interface Comment{
    comment_msg: String
    comment_time: String
    comment_reply: String
}

export interface Person{
    id: number
    name:string
    pic: string
    email:string
    commentBox: Array<Comment>
    profileBox?: Array<Profile>
}

type Props = {
    data:Person
    handleClick: any
}

export const Comment:React.FC<Props> = (props) => {
    const item = props.data;
    return (
        <div className='personInfo'>
            <div className='info-bar'>
                <div className="avatar-wrapper">
                    <a href={`/account/post/comment/${item.id}`}><img src={item.pic}  className="avatars" alt={item.pic}/></a>
                </div>
                <div className="comment-Box">
                    <div className='comment-info'>
                        <p className="comment-name">
                            <span className="comment-post_name">{item.name}</span> 
                        </p>
                    </div>
                    {
                        item.commentBox.map((comment, id)=>
                            <div key={id}>
                                <div className="comment-msg">{comment.comment_msg}</div>
                                <div className="comment-status">
                                    <span className="comment-time">{comment.comment_time}</span>
                                    <span className="comment-flag"onClick={()=>props.handleClick(`${item.name} `, item.id)}>{comment.comment_reply}</span>
                                </div>
                            </div> 
                        )
                    }
                </div>
                {
                    item.profileBox?.map((profile, id)=>(
                        <div className="profileBox" key={id}>
                            <div className="message-wrapper">
                                <img src={profile.pic}  className="avatars" alt={profile.pic}/>
                            </div>
                            <div className='message-info'>
                                <p className="message-name">
                                    <span>{profile.name}</span> 
                                </p>
                            </div>
                            <div className="message-Box">
                                {
                                    profile.MsgBox.map((msgs, id)=>(
                                        <div key={id}>
                                            <div className="msg">{msgs.receive_msg}</div>
                                            <div className="comment-status">
                                                <span className="comment-time">{msgs.receive_time}</span>
                                                <span className="comment-flag">{msgs.receive}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>                     
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
