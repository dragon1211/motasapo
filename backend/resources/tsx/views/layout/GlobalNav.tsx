import React from 'react';
// 投稿
import Post from '../pages/accounts/posts/index';
import Search from '../pages/accounts/search/index';
import Detail from '../pages/accounts/detail/index';
import GeoLocation from '../pages/accounts/gps/index';
import 'bootstrap/dist/css/bootstrap.min.css';
// 検索ページ
// 新規投稿ページ
// GPSページ
// マイページ
import { FaSearch, FaHome, FaCameraRetro } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import './layout.css'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { MyPageIndex } from '../components/Mypage/mypage';
import { GPS } from '../pages/accounts/gps/gps/gps';

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
        <Route path="/account/profile/:id/post/">
          <Detail />
        </Route>
        <Route path="/account/new-post/">
          <NewPost />
        </Route>
        <Route path="/account/gps/">
          {/* <GeoLocation /> */}
          <GPS/>
        </Route>
        <Route path="/account/mypage/">
          {/* <MyPageIndex /> */}
        </Route>
      </Switch>

      <div className="l-nav">
        <div className="l-nav--items c-flex v-center h-between">
          <div className="l-nav--item is-selected">
            <a href="/account/post/" className="l-nav--link link-house">
              <FaHome className="icon-layout" />
            </a>
          </div>
          <div className="l-nav--item">
            <Link to="/account/search/" className="l-nav--link link-search">
              <FaSearch className="icon-layout" />
            </Link>
          </div>

          <div className="l-nav--item">
            <a href="/account/new_post" className="l-nav--link link-camera">
              <FaCameraRetro className="icon-layout" />
            </a>
          </div>

          <div className="l-nav--item">
            <a href="/account/gps/" className="l-nav--link link-map">
              <IoLocation className="icon-layout" />
            </a>
          </div>
          <div className="l-nav--item">
            <a href="/account/mypage/" className="l-nav--link link-icon">
              <span>
               <img src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" alt="" className="image-icon-layout" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
function NewPost() {
  return <h2>NewPost</h2>;
}
function Gps() {
  return <h2>Gps</h2>;
}
// function Mypage() {
//   return <h2>MyPage</h2>;
// }

