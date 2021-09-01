<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Account;
use App\Models\Category;
use App\Models\Prefecture;
use App\Models\User;
use App\Models\Follow;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\Shop;
use App\Models\ShopCategory;
use App\Models\ShopCompany;


class ProfileController extends Controller
{
    public function getProfileData(Request $request)
    {
        $profile = array();
        $current_id = Auth::id();
        $profileData = DB::select("SELECT accounts.id, accounts.email,
        accounts.name,
        accounts.account,
        accounts.profile,
        accounts.img
        FROM accounts 
        WHERE accounts.id = ".$current_id);
     
        return $profileData;
    }

    public function getShopProfileData(Request $request)
    {
        $shopProfileData = array();
        $current_id = Auth::id();
        $shop_category_result = DB::select("SELECT shop_categories.account_id FROM shop_categories 
                WHERE shop_categories.account_id =".$current_id);
        $shop_company_result = DB::select("SELECT shop_companies.account_id FROM shop_companies  
                WHERE shop_companies.account_id =".$current_id);
        if(count($shop_category_result) ==0 || count($shop_company_result) == 0) {
            $shopProfileData = DB::select("SELECT accounts.id, 
                accounts.name,
                accounts.account,
                accounts.img,
                accounts.email,
                shops.url,
                shops.detail,
                shops.hour, 
                shops.tel
                FROM accounts, shops
                WHERE shops.account_id = accounts.id AND accounts.id = ".$current_id);
            $shopProfileData[0]->company = '';
            $shopProfileData[0]->person = '';
            $shopProfileData[0]->post = '';
            $shopProfileData[0]->prefecture_name = '';
            $shopProfileData[0]->address = '';
            $shopProfileData[0]->category_name = '';
            $shopProfileData[0]->prefecture_list = DB::select("SELECT prefectures.name FROM prefectures");

        } else {
            $shopProfileData = DB::select("SELECT accounts.id, 
            accounts.name,
            accounts.account,
            accounts.img,
            accounts.email,
            shops.url,
            shops.detail,
            shops.hour, 
            shops.tel,
            shop_companies.company,
            shop_companies.person,
            shop_companies.post,
            shop_companies.prefecture_id,
            prefectures.name AS prefecture_name,
            shop_companies.address,
            categories.name AS category_name
            FROM accounts, categories, prefectures, shop_categories, shop_companies, shops
            WHERE accounts.id = shop_categories.account_id AND shop_categories.category_id = categories.id 
            AND accounts.id = shop_companies.account_id AND shop_companies.prefecture_id = prefectures.id 
            AND shop_categories.account_id = shop_companies.account_id AND shops.account_id = accounts.id 
            AND accounts.id = ".$current_id);
            $shopProfileData[0]->prefecture_list = DB::select("SELECT prefectures.name FROM prefectures");
        }
        return $shopProfileData;
    }

    public function profile_index()
    {
        return view('accounts.requests.profile_index');
    }
    
    public function profile_image()
    {
        return view('accounts.requests.profile_image'); 
    }

    public function shop_image()
    {
        return view('accounts.requests.shop_image'); 
    }

    public function profileImageStore(Request $request)
    {
        $current_id = Auth::id();
        $file = $request->get('images');
        $path = '/images/post_images/';
        if (!file_exists(public_path($path))) {
            mkdir(public_path($path), 0777, true);
        }
        if ($file) {
            $name = time(). rand(1, 100) . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
            $replace = substr($file, 0, strpos($file, ',')+1); 
            $image = str_replace($replace, '', $file); 
            $image = str_replace(' ', '+', $image);     
            \File::put(public_path($path). $name, base64_decode($image));
        }
        $urls = $path.$name;
        $result = DB::update('update accounts set img = ? where id = ?',[$urls, $current_id]);
        return 'success';
    }

    public function accountProfile()
    {
        return view('accounts.requests.account_profile'); 
    }

    public function accountEdit(Request $request)
    {
        $current_id = Auth::id();
        $name = $request->name;
        $account = $request->account;
        $email = $request->email;
        $profile = $request->profile;
        DB::update('update accounts set name = ?, account = ?, email = ?, profile = ? where id = ?',[$name,$account,$email,$profile,$current_id]);
        return 'success';
    }
    
    public function ShopPassEditShow(Request $request)
    {
        return view('accounts.requests.shop_passedit');
    }

    public function passEditShow(Request $request)
    {
        return view('accounts.requests.profile_passedit');
    }

    public function ShopPassUpdate(Request $request)
    {
        $current_id = Auth::id();
        $oldPass =$request->oldPass;

        $result = Hash::check($oldPass, auth()->user()->password);
        if($result == true) {
            Account::find(auth()->user()->id)->update(['password'=> Hash::make($request->newPass)]);
            return 'success';
        } else {
            return 'error';
        }
    }

    public function userPassUpdate(Request $request)
    {
        $current_id = Auth::id();
        $oldPass =$request->oldPass;

        $result = Hash::check($oldPass, auth()->user()->password);
        if($result == true) {
            Account::find(auth()->user()->id)->update(['password'=> Hash::make($request->newPass)]);
            return 'success';
        } else {
            return 'error';
        }
    }

    public function shopProfileShow(Request $request)
    {
        return view('accounts.requests.shop_profile');
    }

    public function shopProfileEdit(Request $request)
    {
        return view('accounts.requests.shop_profileEdit');
    }
    
    public function shopProfileUpdate(Request $request)
    {
        try {
            $current_id = Auth::id();
            $name = $request->name;//
            $account = $request->account;//
            $email = $request->email;//
            $url = $request->url;
            $detail = $request->detail;
            $hour = $request->hour;
            $company = $request->company;//
            $person = $request->presentName;//
            $tel = $request->phone;
            $post = $request->postcode;//
            $prefecture = $request->prefecture; //
            $address = $request->address;
            $category = $request->category; 
            $categoryAdd = $request->categoryAdd;

            $Prefecture_result =  DB::select("SELECT shop_companies.prefecture_id FROM shop_companies WHERE shop_companies.account_id = ".$current_id);

            if($Prefecture_result) {
                DB::update('update shop_companies set account_id = ?, company = ?, person = ?, post = ?, prefecture_id = ?, address = ? where account_id = ?',[$current_id,$company,$person,$post,$prefecture,$address,$current_id]);
            } else {
                ShopCompany::create([
                    'account_id' => $current_id,
                    'company' => $company,
                    'person' => $person,
                    'post' => $post,
                    'prefecture_id' => $prefecture,
                    'address' => $address
                ]);
            }

            if($categoryAdd) {
                $data = new Category;
                $data->name = $categoryAdd;
                $data->save();
                $new_category_id = $data->id;
                $category_check = DB::select("SELECT shop_categories.account_id FROM shop_categories WHERE shop_categories.account_id = ".$current_id);
                if($category_check) {
                    DB::update('update shop_categories set account_id = ?, category_id = ? where account_id = ?',[$current_id,$new_category_id,$current_id]);
                } else {
                    ShopCategory::create([
                        'account_id' => $current_id,
                        'category_id' => $new_category_id
                    ]);
                }
            } else {
                $category_result =  DB::select("SELECT shop_categories.category_id FROM shop_categories WHERE shop_categories.account_id = ".$current_id);
                if($category_result) {
                    DB::update('update shop_categories set account_id = ?, category_id = ? where account_id = ?',[$current_id,$category,$current_id]);
                } else {
                    ShopCategory::create([
                        'account_id' => $current_id,
                        'category_id' => $category
                    ]);
                }
            }

            $shops_result = DB::select("SELECT shops.account_id FROM shops WHERE shops.account_id = ".$current_id);
            if($shops_result) {
                DB::update('update shops set account_id = ?, tel = ?, url = ?, detail = ?, hour = ? where account_id = ?', [$current_id, $tel, $url, $detail, $hour, $current_id]);
            } else {
                Shop::create([
                    'account_id' => $current_id,
                    'tel' => $tel,
                    'url' => $url,
                    'detail' => $detail,
                    'hour' => $hour
                ]);
            }

            DB::update('update accounts set name = ?, account = ?, email = ? where id = ?',[$name,$account,$email,$current_id]);
            return 'success';
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function ProfilePageCancel(Request $request)
    {
        return view('accounts.requests.profile_cancel');
    }

    public function ShopProfilePageCancel(Request $request)
    {
        return view('accounts.requests.shopProfile_cancel');
    }

    public function AccountCancel(Request $request)
    {
        try {
            $current_id = Auth::id();
            DB::delete('delete from shop_categories where account_id = ?',[$current_id]);
            DB::delete('delete from shop_companies where account_id = ?',[$current_id]);
            DB::delete('delete from email_activations where account_id = ?',[$current_id]);
            DB::delete('delete from locations where account_id = ?',[$current_id]);
            DB::delete('delete from post_comments where account_id = ?',[$current_id]);
            DB::delete('delete from post_likes where account_id = ?',[$current_id]);
            DB::delete('delete from post_views where account_id = ?',[$current_id]);
            DB::delete('delete from posts where account_id = ?',[$current_id]);
            DB::delete('delete from pushes where account_id = ?',[$current_id]);
            DB::delete('delete from requests where account_id = ?',[$current_id]);
            DB::delete('delete from users where account_id = ?',[$current_id]);
            DB::delete('delete from shops where account_id = ?',[$current_id]);
            DB::delete('delete from accounts where id = ?',[$current_id]);
            return 'success';    
        } catch (\Throwable $error) {
            return $error;
        }
        
    }

    public function index($id)
    {
        session([
            'account_id' => $id
        ]);
        return view('accounts.profiles.index');
        
    }
    public function get_data()
    {

        $account_id = session('account_id');
        
        $data['posts'] = Post::where('account_id', $account_id)->with('postImages')->get();
        
        $account = DB::table('accounts')->where('id', $account_id)->first();
        $follow = DB::table('follows')->where('id', $account_id)->first();
        $post_id = DB::table('posts')->where('account_id', $account_id)->value('id');
        
        $data['account_type'] = $account->type;
        $sex = DB::table('users')->where('account_id', $account_id)->value('sex');
        if ($sex == 'm') {
            $data['sex'] = '男性';
        }
        else{
            $data['sex'] = '女性';
        }
        
        $data['account'] = $account->account;
        $data['name'] = $account->name;
        $data['img'] = $account->img;
        $data['profile'] = $account->profile;
        if ($follow == null) {
            
        }
        else{
            $data['follow_account_id'] = $follow->follow_account_id;
            $data['follower_account_id'] = $follow->follower_account_id;
        }
        $data['tel'] = DB::table('shops')->where('account_id', $account_id)->value('tel');
        $data['email'] = $account->email;
        // $data['post_images'] = DB::table('post_images')->where('post_id', $post_id)->value('url');
        

        return $data;
    }

    public function follow()
    {
        $follow_account_id = session('account_id');
        $follower_account_id = Auth::id();
        DB::table('follows')->insert([
            'follow_account_id' => $follow_account_id,
            'follower_account_id' => $follower_account_id
        ]);

        return "sucess";
    }

}
