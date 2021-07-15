import React from 'react';
import { shopQuery } from '../../queries/ShopQuery';

const ShopRandList: React.VFC = () => {
    // const getShops = async () => {
    //     const data = await axios.get('/api/shops')
    //     console.log(data);
    // }

    // useEffect(() => {
    //     getShops()
    // })

    /* query */
    const { data:shops, status } = shopQuery();

    if(status === 'loading') {
        return <div className="loader" />
    } else if(status === 'error') {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    } else if(!shops || shops.length <= 0) {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    }

    return (
        <ul className="p-list--shop__rand--list c-flex">
            { shops.map((shop) => {
                return (
                    <li key={shop.id} className="p-list--shop__rand--item">
                        <a href={`/shop/profile/${shop.id}`}>
                            <div className="c-img--cover c-img--icon">
                                <img src="/storage/base/logo-square.png" alt="モタサポのロゴ" />
                                {/* <img src={shop.account.img} alt="モタサポのロゴ" /> */}
                            </div>
                            <p className="rand-text">{shop.account.account}</p>
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default ShopRandList

// import React from 'react';
// import { shopQuery } from "../../queries/ShopQuery";

// const ShopRandList: React.VFC = () => {
//     /* query */
//     // react-queryの設定
//     const { data:shops, status } = shopQuery();
//     // console.log(shops);
//     return (
//         <ul className="p-list--shop__rand--list c-flex">
//             {/* { shopQuery.map((shop:any) => {
//                 return (
//                     <li key={shop.id} className="p-list--shop__rand--item">
//                         <a href="" >
//                             <div className="c-img--cover c-img--icon">
//                                 <img src="http://127.0.0.1:8080/storage/base/logo-square.png" alt="モタサポのロゴ" />
//                                 <img src={shop.account.img} alt="モタサポのロゴ" />
//                             </div>
//                             <p className="rand-text">{shop.account}</p>
//                         </a>
//                     </li>
//                 )
//             })} */}
//         </ul>
//     )
// }

// export default ShopRandList
