import React from 'react';
import ShopRandList from '../../../components/ShopRandList';
import PostList from '../../../components/PostList';
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
                    <QueryClientProvider client={queryClient}>
                        <PostList />
                    </QueryClientProvider>
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
