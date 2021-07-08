import React from 'react';
import ShopRandList from '../../../components/ShopRandList';
import { QueryClient, QueryClientProvider } from 'react-query';

const Post = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            }
        }
    })
    return (
        <>
            {/* ショップランダム表示 */}
            <div className="account-content">
                <p className="account-content-item content-item-wrap c-headline__small">Shops</p>
                <div className="account-content-item content-item-wrap p-list--shop__rand">
                    <QueryClientProvider client={queryClient}>
                        <ShopRandList />
                    </QueryClientProvider>
                </div>
            </div>
            {/* 投稿一覧表示 */}
            <div className="account-content">
                <div className="account-content-item p-post__new">
                    <div className="p-post__new--item">
                        <div className="item-header content-item-wrap c-flex v-center h-between">
                            <div className="item-header-icon c-flex v-center">
                                <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                    <img src="/storage/base/logo-square.png" alt="" />
                                </div>
                                <p className="icon-name">chankan77</p>
                            </div>
                            <div className="item-header-status">募集中</div>
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
                            <div className="item-action-comment c-flex v-center">
                                <img src="/storage/base/icon-comment-w.png" />
                                <span className="comments">コメントする</span>
                            </div>
                            <div className="item-action-heart c-flex v-center">
                                <img src="/storage/base/icon-heart-w.png" />
                                <span className="goods">12</span>
                            </div>
                        </div>
                        <div className="item-body">
                            <p className="content-item-wrap">ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。</p>
                        </div>
                    </div>
                    <div className="p-post__new--item">
                        <div className="item-header content-item-wrap c-flex v-center h-between">
                            <div className="item-header-icon c-flex v-center">
                                <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                    <img src="/storage/base/logo-square.png" alt="" />
                                </div>
                                <p className="icon-name">chankan77</p>
                            </div>
                            <div className="item-header-status">募集中</div>
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
                            <div className="item-action-comment c-flex v-center">
                                <img src="/storage/base/icon-comment-w.png" />
                                <span className="comments">コメントする</span>
                            </div>
                            <div className="item-action-heart c-flex v-center">
                                <img src="/storage/base/icon-heart-w.png" />
                                <span className="goods">12</span>
                            </div>
                        </div>
                        <div className="item-body">
                            <p className="content-item-wrap">ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。</p>
                        </div>
                    </div>
                    <div className="p-post__new--item">
                        <div className="item-header content-item-wrap c-flex v-center h-between">
                            <div className="item-header-icon c-flex v-center">
                                <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                                    <img src="/storage/base/logo-square.png" alt="" />
                                </div>
                                <p className="icon-name">chankan77</p>
                            </div>
                            <div className="item-header-status">募集中</div>
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
                            <div className="item-action-comment c-flex v-center">
                                <img src="/storage/base/icon-comment-w.png" />
                                <span className="comments">コメントする</span>
                            </div>
                            <div className="item-action-heart c-flex v-center">
                                <img src="/storage/base/icon-heart-w.png" />
                                <span className="goods">12</span>
                            </div>
                        </div>
                        <div className="item-body">
                            <p className="content-item-wrap">ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。ここに投稿の説明。</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post

// import React from 'react';
// import ReactDOM from 'react-dom';
// // import ShopRandList from "../../../components/ShopRandList";
// // import { useShops } from "../../.././ShopRandList.";
// import Router from '../../../../routes'

// const Account = () => {
// 	return (
//         <>
//             {/* ショップランダム表示 */}
//             <div className="account-content">
//                 <p className="account-content-item c-headline__small">Shops</p>
//                 <div className="account-content-item p-list--shop__rand">
//                     {/* <ShopRandList /> */}
//                 </div>
//             </div>
//             {/* 投稿一覧表示 */}
//             <div className="account-content">
//                 <div className="account-content-item p-post__new">
//                     <div className="p-post__new--item"></div>
//                 </div>
//             </div>
//             {/* グローバルナビ */}
//             {/* <GlovalNav /> */}
//             <Router />
//         </>
// 	)
// }

// ReactDOM.render(
// 	<Account />,
// 	document.getElementById('account')
// )
