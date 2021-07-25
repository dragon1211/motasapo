import React from 'react';
import { postQuery } from '../../queries/PostQuery';

const PostList: React.VFC = () => {
    /* query */
    const { data:posts, status } = postQuery(0);

    if(status === 'loading') {
        return <div className="loader" />
    } else if(status === 'error') {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    } else if(!posts || posts.length <= 0) {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    }

    return (
        <>
        {posts.map((post) => {
            var recruit_mark = (post.type == '1') ? <div className="item-header-status">募集中</div> : '';

            return (
                <div key={post.id} className="p-post__new--item">
                    <div className="item-header content-item-wrap c-flex v-center h-between">
                        <div className="item-header-icon c-flex v-center">
                            <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                <img src="/storage/base/logo-square.png" alt="" />
                            </div>
                            <p className="icon-name">chankan77</p>
                        </div>
                        {recruit_mark}                        
                    </div>
                    <div className="item-img content-item-wrap">
                        <ul className="p-post__lists">
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
                            <li className="p-post__list">
                                <img src="/storage/base/logo-square.png" />
                            </li>
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
                            <img src="/storage/base/icon-heart-w.png" />
                            <span className="goods">12</span>
                        </div>
                    </div>
                    <div className="item-body">
                        <p className="content-item-wrap">{post.text}</p>
                    </div>
                </div>
            )
        })}
        </>
    )
}

export default PostList;