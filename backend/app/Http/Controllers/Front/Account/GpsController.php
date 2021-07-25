<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class GpsController extends Controller
{
    //
    public function index()
    {
        # code...
        return view('accounts.gpss.index');
    }

    public function detail($id){
        return view('accounts.gpss.show');
    }

    public function new(){
        return view('accounts.gpss.new');
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

    public function getTime($time){
        $sp_arr = explode(' ', $time);
        $semi_arr = explode(':', $sp_arr[1]);
        return ($semi_arr[0].":".$semi_arr[1]);
    }

    public function getInterval($start, $end){
        $temp1 = explode(' ', $start);
        $temp2 = explode(' ', $end);
        $start_arr = explode(':', $temp1[1]);
        $end_arr = explode(':', $temp2[1]);
        $res1 = (string)((int)$end_arr[0]-(int)$start_arr[0]);
        $res2 = (string)((int)$end_arr[1]-(int)$start_arr[1]);
        if(strlen($res1)<2) $res1 = '0'.$res1;
        if(strlen($res2)<2) $res2 = '0'.$res2;
        return ($res1.":".$res2);
    }

    //-------------API----------------------
    public function getdata(Request $request){

        $user_pos = $request->validate([
            'lat'=>'nullable',
            'lng'=>'nullable'
        ]);
        ///////////////////////////////////////////////////////////
        for($i=0; $i<4; $i++)
        {
            $lat = rand(3539300, 3539800)/100000;
            $lng = rand(13869000, 13869800)/100000;
            $shop[$i] = ['lat'=>$lat, 'lng'=>$lng];
        }
        // $user_pos = ['lat'=>35.395, 'lng'=>138.6940];
        for($i=1; $i<=20; $i++)
        {
            $lat = rand(3539300, 3539800)/100000;
            $lng = rand(13869000, 13869800)/100000;
            Location::where(['id'=>$i])->first()->update([
                'location'=> ((string)$lat.', '.$lng)
            ]);
        }
        /////////////////////////////////////////////////////////////
        
        $user_id = Auth::id();
        $cnt = Location::where('account_id', $user_id)->count();
        $location = (string)$user_pos['lat'].', '.$user_pos['lng'];

        if($cnt==0){
            $new = new Location;
            $new->account_id = $user_id;
            $new->location = $location;
            $new->save();
        }
        else{
            Location::where(['account_id'=>$user_id])->first()->update([
                'location'=> $location
            ]);
        }

        $total = DB::select(
            "SELECT users.account_id, 
            users.sex, 
            locations.location,
            accounts.name, 
            accounts.profile, 
            accounts.img  
            FROM users, locations, accounts 
            WHERE users.account_id = locations.account_id 
            and locations.account_id = accounts.id");

        $min_m_dis = 10000000;
        $min_w_dis = 10000000;

        foreach($total as $item){
            $sql = "SELECT text, limit_at, updated_at FROM posts where id = ".$item->account_id." and account_id = ".$user_id;
            $posts = DB::select($sql);
            $post_arr = array();
            foreach($posts as $post){
                array_push($post_arr, $post);
            }
            if($item->account_id == $user_id) {

                $user['id'] = $item->account_id;
                $user['name'] = $item->name;
                $user['type'] = "user";
                $user['position'] = $user_pos;
                $user['distance'] = 0;
                $user['started'] = $this->getTime($post_arr[0]->updated_at);
                $user['finished'] =  $this->getInterval($post_arr[0]->updated_at, $post_arr[0]->limit_at);
                $user['pic'] = $item->img;
                $user['msgbox'] = [$item->profile];
                continue;
            }
            $pos = $this->getPosition($item->location);
            $dis = $this->distance($user_pos, $pos);
            
            if($item->sex == 'm'){
                if($dis < $min_m_dis)
                {
                    $min_m_dis = $dis;

                    $male['id'] = $item->account_id;
                    $male['name'] = $item->name;
                    $male['type'] = "male";
                    $male['position'] = $this->getPosition($item->location);
                    $male['distance'] = floor($dis*1000);
                    $male['started'] = $this->getTime($post_arr[0]->updated_at);;
                    $male['finished'] =  $this->getInterval($post_arr[0]->updated_at, $post_arr[0]->limit_at);
                    $male['pic'] = $item->img;
                    $male['msgbox'] =[$item->profile];
                }
            }
            else if($item->sex == 'w'){
                if($dis < $min_w_dis)
                {
                    $min_w_dis = $dis;

                    $female['id'] = $item->account_id;
                    $female['name'] = $item->name;
                    $female['type'] = "female";
                    $female['position'] = $this->getPosition($item->location);
                    $female['distance'] = floor($dis*1000);
                    $female['started'] = $this->getTime($post_arr[0]->updated_at);;
                    $female['finished'] =  $this->getInterval($post_arr[0]->updated_at, $post_arr[0]->limit_at);
                    $female['pic'] = $item->img;
                    $female['msgbox'] = [$item->profile];
                }
            }
        }

        
       
        $test_data = array($user, $male, $female,
            [
                'id'=>25,
                'name'=> 'shop.miyama',
                'type'=> 'shop',
                'position'=> $shop[0],
                'distance'=> 90,
                'finished'=> '13:00',
                'started'=> '14:00',
                'pic'=> '/storage/base/myphoto.jpg',
                'msgbox'=> [
                     '私はバイクが大好きで、関東近辺でよく走っています！ 近場で走っている人がいたら、是非声をかけてください！ ツーリングはいつでも参加します！' 
                ]
            ],
            [
                'id'=>26,
                'name'=> 'shop.miyama',
                'type'=> 'shop',
                'position'=> $shop[1],
                'distance'=> 90,
                'finished'=> '11:18',
                'started'=> '18:10',
                'pic'=> '/storage/base/sample-human2.png',
                'msgbox'=> [
                     '私はバイクが大好きで、関東近辺でよく走っています！ 近場で走っている人がいたら、是非声をかけてください！ ツーリングはいつでも参加します！' 
                ]
            ],
            [
                'id'=>27,
                'name'=> 'shop.miyama',
                'type'=> 'shop',
                'position'=> $shop[2],
                'distance'=> 90,
                'finished'=> '11:18',
                'started'=> '18:10',
                'pic'=> '/storage/base/sample-human2.png',
                'msgbox'=> [
                     '私はバイクが大好きで、関東近辺でよく走っています！ 近場で走っている人がいたら、是非声をかけてください！ ツーリングはいつでも参加します！' 
                ]
            ],
            [
                'id'=>28,
                'name'=> 'shop.miyama',
                'type'=> 'shop',
                'position'=> $shop[3],
                'distance'=> 90,
                'finished'=> '11:18',
                'started'=> '18:10',
                'pic'=> '/storage/base/sample-human2.png',
                'msgbox'=> [
                     '私はバイクが大好きで、関東近辺でよく走っています！ 近場で走っている人がいたら、是非声をかけてください！ ツーリングはいつでも参加します！' 
                ]
            ]
        );
        
        return $test_data;
    }
}
