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
          <div className="p-post__new--item">
            <div className="item-header content-item-wrap c-flex v-center h-between">
              <div className="item-header-icon c-flex v-center">
                <div className="icon-image c-img__cover c-img--icon is-circle u-mr10">
                  <img src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" alt="" />
                </div>
                <div className="icon-name">chankan77</div>
              </div>
              <div className="item-header-status">募集中</div>
            </div>
            {/* 投稿一覧表示 */}
            <div className="account-content">
                <div className="account-content-item p-post__new">
                    <QueryClientProvider client={queryClient}>
                        <PostList />
                    </QueryClientProvider>
                </div>
            </div>
            <div className="item-body">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post


