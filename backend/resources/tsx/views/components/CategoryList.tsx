import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { categoryQuery } from '../../queries/CategoryQuery';

const App: React.VFC = () => {
    // react-queryの設定
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            },
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <CategoryList />
        </QueryClientProvider>
    )
}

// React.VFC：型定義
const CategoryList: React.VFC = () => {
    /* APIから取得 */
    // カテゴリー一覧を取得
    const { data:categories, status } = categoryQuery();

    if(status === 'loading') {
        return <div className="loader" />
    } else if(status === 'error') {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    } else if(!categories || categories.length <= 0) {
        return <div className="u-align__center">データの読み込みに失敗しました。</div>
    }

    /* 関数 */
    // カテゴリーのcheckedの数が5以上の場合、checkboxにdisabledを付与する
    const onChangeCheckedNumber = () => {
        /**
         * １．checkedの数を取得する
         * ２．checkedの数が5以上かどうかの条件分岐
         * ３．5以上の場合はchecked以外をdisabled付与
         * ４．4以下の場合は全てにcheckedを外す
         */
        /* １．checkedの数を取得する */
        const isCheckedBox = document.querySelectorAll("input.categoryCheckbox:checked");
        const isCheckedBoxLength = isCheckedBox.length;

        // ２．checkedの数が5以上かどうかの条件分岐
        const checkBoxs = [...document.querySelectorAll("input.categoryCheckbox")];

        if(isCheckedBoxLength > 4) {
            // checkedがついていないcheckboxを取得
            const targets = checkBoxs.filter((checkbox:any) => checkbox.checked === false);
            // 取得したcheckboxにforeach
            targets.forEach(target => {
                // target.disabled = true;
                target.setAttribute('disabled', 'disabled');
            });
        } else {
            // ４．4以下の場合は全てにcheckedを外す
            checkBoxs.forEach((checkbox:any) => {
                checkbox.disabled = false;
            });
        }
    }

    /* 本文 */
    return (
        <ul className="c-input__lists">
            { categories.map((category) => {
                return(
                    <li key={category.id} className="c-input__list">
                        <input
                            className="categoryCheckbox"
                            name="categories[]"
                            type="checkbox"
                            id={category.id}
                            defaultValue={category.id}
                            onChange={onChangeCheckedNumber}
                        />
                        <label htmlFor={category.id}>{category.name}</label>
                    </li>
                )
            })}
        </ul>
    );
}

if (document.getElementById('categoryList')) {
    ReactDOM.render(<App />, document.getElementById('categoryList'));
}
