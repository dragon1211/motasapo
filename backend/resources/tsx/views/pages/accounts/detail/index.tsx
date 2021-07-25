import React from 'react';
import ShopRandList from '../../../components/ShopRandList';
import { QueryClient, QueryClientProvider } from 'react-query';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../../custom.css'
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
      <div className="row mx-4 px-0 py-4">
        <div className="d-flex pt-3">
          <img src="/storage/base/50000087_1193305484150794_571276761136889856_n.jpeg" className="logo-image" />
          <p className="logo-text px-3 pt-2">Michel</p>
        </div>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={false}
        >
          <div>
            <img src={`/storage/image/1.png`} width="100%" height="500px" style={{ borderRadius: '50px' }} />
          </div>
          <div>
            <img src={`/storage/image/2.png`} width="100%" height="500px" style={{ borderRadius: '50px' }} />
          </div>
          <div>
            <img src={`/storage/image/3.png`} width="100%" height="500px" style={{ borderRadius: '50px' }} />
          </div>
        </Carousel>
      </div>
      <div className="row mx-4 px-0 pt-4">
        <div className="col-md-6 px-0">
          <div className="d-flex">
            <img src="/storage/base/icon-header-comment-w.png" className="comment-image" />
            <span className="comment-text mt-2">コメント</span>
          </div>
        </div>
        <div className="col-md-6 px-0">
          <div className="d-flex justify-content-end">
            <div className="d-flex">
              <img src="/storage/base/icon-heart-w.png" className="comment-image" />
              <span className="comment-text mt-2">12</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-4 px-0 py-4">
        <div className="col-md-12">
          <p className="detail-text">どうもありがとうございました, どうもありがとうございました, どうもありがとうございました</p>
          <p className="detail-text">どうもありがとうございました, どうもありがとうございました, どうもありがとうございました, </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Search;