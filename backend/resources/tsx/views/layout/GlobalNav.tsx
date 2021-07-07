import React from 'react';
// 投稿
import Post from '../pages/accounts/posts/index';
import GPS from './GPS';

// 検索ページ
// 新規投稿ページ
// GPSページ
// マイページ
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";



export default function GlobalNav() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/account/post/">
                    <Post />
                </Route>
                <Route path="/account/search/">
                    <Search />
                </Route>
                <Route path="/account/new-post/">
                    <NewPost />
                </Route>
                <Route path="/account/gps/">
                    <Gps />
                </Route>
                <Route path="/account/mypage/">
                    <Mypage />
                </Route>
            </Switch>

            <div className="l-nav">
                <div className="l-nav--items c-flex v-center">
                    <div className="l-nav--item is-selected">
                        {/* <a href="" className="l-nav--link link-house">
                            <span />
                        </a> */}
                        <Link to="/account/post/" className="l-nav--link link-house">
                            <span />
                        </Link>
                    </div>
                    <div className="l-nav--item">
                        {/* <a href="" className="l-nav--link link-search">
                            <span />
                        </a> */}
                        <Link to="/account/search/" className="l-nav--link link-search">
                            <span />
                        </Link>
                    </div>
                    <div className="l-nav--item">
                        {/* <a href="" className="l-nav--link link-camera">
                            <span />
                        </a> */}
                        <Link to="/account/new-post/" className="l-nav--link link-camera">
                            <span />
                        </Link>
                    </div>
                    <div className="l-nav--item">
                        {/* <a href="" className="l-nav--link link-map">
                            <span />
                        </a> */}
                        <Link to="/account/gps/" className="l-nav--link link-map">
                            <span />
                        </Link>
                    </div>
                    <div className="l-nav--item">
                        {/* <a href="" className="l-nav--link link-icon">
                            <span>
                                <img src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" alt=""/>
                            </span>
                        </a> */}
                        <Link to="/account/mypage/" className="l-nav--link link-icon">
                            <span className="c-img--cover c-img__circle">
                                <img src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div> */}
        </BrowserRouter>
    );
}

function Search() {
    return <h2>Search</h2>;
}
function NewPost() {
    return <h2>NewPost</h2>;
}
function Gps() {
    return ( <GPS/> );
}
function Mypage() {
    return <h2>MyPage</h2>;
}
