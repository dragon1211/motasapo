import React from 'react';
import ShopRandList from '../../../components/ShopRandList';
import PostList from './PostList';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'

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
            <div className="account-content" style={{paddingTop:'70px'}}>
                <p className="account-content-item content-item-wrap c-headline__small">Shops</p>
                <div className="account-content-item content-item-wrap p-list--shop__rand">
                    <QueryClientProvider client={queryClient}>
                        <ShopRandList />
                    </QueryClientProvider>
                </div>
            </div>
            <div className="account-content" style={{paddingTop:'40px'}}>
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


