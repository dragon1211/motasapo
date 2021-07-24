import React from 'react';
import './comments.css';

interface Profile{
    name: string
    pic: string
    MsgBox: Array<string>
    // time: number
    // flag: boolean      
}

export interface Person{
    id: number
    name:string
    pic: string
    commentBox: Array<string>
    time: number
    profileBox?: Array<Profile>
}

type Props = {
    data:Person
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
                            <span>{item.name}</span> 
                            <span className="name right">ここに投稿の説明。ここに投稿の説明</span>
                        </p>
                    </div>
                    {
                        item.commentBox.map((comment, id)=>
                            <div className="comment-msg" key={id}>{comment}</div>
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
                                    <span className="name right">ここに投稿の説明。ここに投稿の説明</span>
                                </p>
                            </div>
                            <div className="message-Box">
                                {
                                    profile.MsgBox.map((msg, id)=>(
                                        <div className="msg" key={id}>{msg}</div>
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
