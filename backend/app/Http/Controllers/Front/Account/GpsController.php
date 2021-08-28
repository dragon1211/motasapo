<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\Post;
use App\Models\Tag;
use App\Models\PostTag;
use App\Models\PostImage;
use App\Models\PostLike;
use App\Models\PostView;

use Carbon\Carbon;


class GpsController extends Controller
{
    //
    public function index(){
        return view('accounts.gpss.gps');
    }

    public function new(){
        return view('accounts.gpss.new');
    }

    public function gpsShow(Request $request){

        PostView::create(['account_id'=>Auth::id(), 'post_id'=>$request->id, 'token'=>'token', 'end_point'=>'endpoint']);

        $post = Post::where('id', $request->id)->with('account')->with('postViews')->with('postImages')->get();
        $res['post'] = $post[0];

        $temp = DB::select("SELECT updated_at FROM posts WHERE id = ".(string)$request->id);

        $from = Carbon::createFromFormat('Y-m-d H:i:s', $temp[0]->updated_at);
        $to = now();
        
        $diff_in_min = $to->diffInMinutes($from); 

        if($diff_in_min + 1 <60) 
            $res['time'] = (string)($diff_in_min+1).'分前';
        else{
            $h = (int)($diff_in_min / 60) + 1;
            $d = (int)($h / 24);
            if( $d > 0 ) $res['time'] = (string)$d.'日前';
            else $res['time'] = (string)$h.'時間前';
        }

        
        return view('accounts.gpss.detail', $res);
    }

    

    public function gpsStore(Request $request){
        $tags = json_decode($request->get('tags'));
        $post_msg = json_decode($request->get('post_msg'));
        $limit_time = json_decode($request->get('limit_time'));

        //---------------------------------save into posts table

        Post::create([
            'type'=> 1,
            'account_id'=>Auth::id(),
            'text'=>$post_msg,
            'created_at'=> now(),
            'updated_at'=> now(),
            'limit_at'=> now()->addHour($limit_time)
        ]);
        $post_id = Post::all()->last()->id;

        //----------------------------------save into tags & post_tags table
        foreach($tags as $tag ){
            $cnt = Tag::where('name',$tag->name)->count();
            if($cnt==0) 
                Tag::create(['name'=> $tag->name]);

            //----------------------------------------------save post_tags tables
            $tag_id = Tag::where('name', $tag->name)->first();
            PostTag::create([
                'post_id'=>$post_id, 
                'tag_id'=>$tag_id->id
            ]);
        }

        //----------------------------------save into post_images table-------image 
        
        $urls = [];
        $path = 'images/post_images/';
        if ($request->get('images')) {
            foreach ($request->get('images') as $file) {
                $name = time(). rand(1, 100) . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
                $replace = substr($file, 0, strpos($file, ',')+1); 
                $image = str_replace($replace, '', $file); 
                $image = str_replace(' ', '+', $image);     
                \File::put(public_path($path). $name, base64_decode($image));
                array_push($urls, '/'.$path.$name);
            }
        }
        foreach( $urls as $url){
            PostImage::create([
                'post_id'=>$post_id,
                'url' => $url
            ]);
        }
        return 'success';
    }

    public function getPosition($strPos){
        $arr = explode(', ', $strPos);
        $param['lat'] = (float)$arr[0];
        $param['lng'] = (float)$arr[1];
        return $param;
    }

    public function distance($pos1, $pos2){
        $R = 6371; // Radius of the Earth in km
        $rlat1 = $pos1['lat'] * (pi() / 180); // Convert degrees to radians
        $rlat2 = $pos2['lat'] * (pi() / 180); // Convert degrees to radians
        $difflat = ($pos1['lat'] - $pos2['lat']) * (pi() / 180); // Radian difference (latitudes)
        $difflon = ($pos1['lng'] - $pos2['lng']) * (pi() / 180); // Radian difference (longitudes)

        $d = 2 * $R * asin(sqrt(sin($difflat/2) * sin($difflat/2) + cos($rlat1)*cos($rlat2)*sin($difflon/2)*sin($difflon/2)));
        return $d;
    }

    //-------------API----------------------
    public function gpsIndex(Request $request){

        $cur_pos = $request->validate([
            'lat'=>'nullable',
            'lng'=>'nullable'
        ]);

        for($i=0; $i<4; $i++)
        {
            $lat = rand(3539300, 3539800)/100000;
            $lng = rand(13869000, 13869800)/100000;
            $shop[$i] = ['lat'=>$lat, 'lng'=>$lng];
        }

        for($i=1; $i<=20; $i++)
        {
            $lat = rand(3539300, 3539800)/100000;
            $lng = rand(13869000, 13869800)/100000;
            Location::where(['id'=>$i])->first()->update([
                'location'=> ((string)$lat.', '.$lng)
            ]);
        }
            
        $user_pos = (string)$cur_pos['lat'].', '.$cur_pos['lng'];

        if( Location::where('account_id', Auth::id())->count() == 0 ){
            $new = new Location;
            $new->account_id = Auth::id();
            $new->location = $user_pos;
            $new->save();
        }
        else{
            Location::where(['account_id'=>Auth::id()])->first()->update([
                'location'=> $user_pos
            ]);
        }

        $total = DB::select(    
            "SELECT accounts.id as account_id, accounts.name, accounts.img, accounts.type as account_type,
            users.sex, locations.location, posts.id as post_id, posts.type as post_type, 
            posts.text as post_text, posts.limit_at, posts.created_at 
            FROM posts, locations, users, accounts 
            WHERE posts.account_id = locations.account_id  
            AND posts.account_id = users.account_id  
            AND posts.account_id = accounts.id 
            AND posts.type = 1
            ORDER BY posts.id DESC");

        $min_m_dis = 10000000;
        $min_w_dis = 10000000;

        $users = array();

        foreach($total as $item){

            $limit = Carbon::createFromFormat('Y-m-d H:i:s', $item->limit_at);
            $now = Carbon::createFromFormat('Y-m-d H:i:s', now());
            if($limit->lt($now)) continue;
  
            
            $temp['account_id'] = $item->account_id;
            $temp['name'] = $item->name;
            $temp['location'] = $this->getPosition($item->location);

            if($item->sex == 'w')
                 $temp['sex'] = 'female';
            else $temp['sex'] = 'male';

            if($item->account_type == '1')
                  $temp['account_type'] = 'shop';
            else  $temp['account_type'] = 'user';
            
            $temp['distance'] = floor(1000 * $this->distance($cur_pos, $temp['location']));
            $temp['post_id'] = $item->post_id;
            $temp['started'] = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('H:i');
            $temp['finished'] =  Carbon::createFromFormat('Y-m-d H:i:s', $item->limit_at)->format('H:i');
            $temp['avatar'] = $item->img;
            $temp['post_text'] = $item->post_text;

            if($temp['account_id'] == Auth::id()) 
                $temp['is_current_user'] = true;
            else $temp['is_current_user'] = false;
            

            array_push($users, $temp);
        }

        $curUser['account_id'] = Auth::id();
        $curUser['name'] = '';
        $curUser['location'] = $cur_pos;
        $curUser['sex'] = '';
        $curUser['account_type'] = '';
        $curUser['distance'] = 0;
        $curUser['post_id'] = -100;
        $curUser['started'] = '';
        $curUser['finished'] =  '';
        $curUser['avatar'] = '';
        $curUser['post_text'] = '';
        $curUser['is_current_user'] = true;

        array_push($users, $curUser);

        $response = $users;
        
        return $response;
    }
}
