<?php

namespace App\Actions\Fortify;

use App\Models\Account;
use App\Models\User;
use App\Models\Shop;
use App\Models\ShopCategory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

use function Psy\sh;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\Account
     */
    public function create(array $input)
    {
        /* １．バリデーションチェック */
        if(isset($input['sex'])) {
            // users のみの項目
            Validator::make($input, [
                'account'  => ['required', 'string', 'max:50', 'min:5', Rule::unique(Account::class)],
                'name'     => ['required', 'string', 'max:255'],
                'email'    => ['required', 'string', 'email', 'max:255', Rule::unique(Account::class)],
                'password' => $this->passwordRules(),
                'sex'      => ['required'],
            ])->validate();
        } else {
            // shops のみの項目
            Validator::make($input, [
                'account'  => ['required', 'string', 'max:50', 'min:5', Rule::unique(Account::class)],
                'name'     => ['required', 'string', 'max:255'],
                'email'    => ['required', 'string', 'email', 'max:255', Rule::unique(Account::class)],
                'password' => $this->passwordRules(),
                'tel'      => ['alpha_num', 'max:20'],
                'url'      => ['url', 'max:255'],
                'detail'   => ['string', 'max:1000'],
                'hour'     => ['string', 'max:1000'],
            ])->validate();
        }

        /* ２．DB登録 */
        // 複数テーブルにまたがる登録なのでtransactionをひく
        DB::beginTransaction();
        try {
            // accounts の登録
            $account = Account::create([
                'account'  => $input['account'],
                'name'     => $input['name'],
                'email'    => $input['email'],
                'password' => Hash::make($input['password']),
                'last_login_at' => date('Y-m-d h:i:s')
            ]);
            // users の登録
            if(isset($input['sex'])) {
                User::create([
                    'account_id' => $account['id'],
                    'sex'        => $input['sex'],
                ]);
            } elseif(isset($input['tel'])) {
                // shops の登録
                Shop::create([
                    'account_id' => $account['id'],
                    'tel'        => $input['tel'],
                    'url'        => $input['url'],
                    'detail'     => $input['detail'],
                    'hour'       => $input['hour'],
                ]);

                // shop_categories の登録
                $categories = $input['categories'];
                if(isset($categories)) {
                    foreach ($categories as $category) {
                        $newShopCategory = new ShopCategory();
                        $newShopCategory->account_id = $account['id'];
                        $newShopCategory->category_id = $category;
                        $newShopCategory->save();
                        // ShopCategory::crate([
                        //     'account_id'  => $account['id'],
                        //     'category_id' => $category,
                        // ]);
                    }
                }
            }

            DB::commit();
            return $account;
        } catch (\Exception $e) {
            DB::rollback();
            var_dump($e->getMessage());
            die();
            $error = '登録の処理に失敗しました。';
            return back()->withErrors($error)->withInput();
        }
    }
}
