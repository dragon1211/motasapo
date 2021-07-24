import React from 'react';
import ShopRandList from '../../../components/ShopRandList';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
const productData = [
  {
    id: 1,
    name: "1.png"
  },
  {
    id: 2,
    name: "2.png"
  },
  {
    id: 3,
    name: "3.png"
  },
  {
    id: 4,
    name: "4.png"
  },
  {
    id: 5,
    name: "5.png"
  },
  {
    id: 6,
    name: "6.png"
  },
  {
    id: 7,
    name: "7.png"
  },
  {
    id: 8,
    name: "8.png"
  },
  {
    id: 9,
    name: "9.png"
  },
]
const Search = () => {
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
    <React.Fragment>
      <div className="row mx-0 px-0">
        <div className="col-md-6 col-sm-12 pt-4 px-4">
          <div className="top-button">
            <p className="text-center mb-0">キーワード探す</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 pt-4 px-4">
        <Link to={`/account/gps/`}>
          <div className="top-button">
            <p className="text-center mb-0">サーチショップ</p>
          </div>
          </Link>
        </div>
      </div>
      <div className="row mx-0 px-0 py-4">
        {productData.map((item, index) => {
          return (
            <div className="col-md-4 px-0" key={index}>
              <Link to={`/account/profile/${item.id}/post/`}>
                <img src={`/storage/image/${item.name}`} width="100%" height="200px" />
              </Link>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default Search;