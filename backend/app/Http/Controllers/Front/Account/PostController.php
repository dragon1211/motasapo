<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PostComment;
use Illuminate\Support\Facades\DB;
use Session;
use Carbon\Carbon;

use App\Models\Post;
use App\Models\Tag;
use App\Models\PostTag;
use App\Models\PostImage;
use App\Models\PostLike;

class PostController extends Controller
{
    public function postIndex() {
        
    }

    public function post_new(){
        return view('accounts.posts.new');
    }

    public function post_store(Request $request){

        $tags = json_decode($request->get('tags'));
        $post_msg = json_decode($request->get('post_msg'));

        //---------------------------------save into posts table
        Post::create([
            'type'=>Account::where('id', Auth::id())->first()->type,
            'account_id'=>Auth::id(),
            'text'=>$post_msg,
            'limit_at'=> now()
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

    public function get_tags(){
        $tags = DB::select('Select name from tags');
        $i = 0;
        $response = array();
        foreach($tags as $tag){
            $temp['id'] = $i;
            $temp['name'] = $tag->name;
            $i++;
            array_push($response, $temp);
        }
        return $response;
    }

    public function thanks_store(Request $request){
        $post_id = $request->get('post_id');
        $method = $request->get('method');
        $cnt = PostLike::where(['account_id'=>Auth::id(), 'post_id'=>$post_id])->count();
        if($cnt==0 && $method == 'add'){
            PostLike::create(['post_id'=>$post_id, 'account_id'=>Auth::id()]);
        }
        else if($cnt == 1 && $method == 'remove'){
            PostLike::where(['account_id'=>Auth::id(), 'post_id'=>$post_id])->delete();
        }
        return 'success';
    }

    //------------------------------------------------------------------------------------------

    public function comment($id){
        $current_id = Auth::user()->id;
        session([
            'post_id' => $id,
            'current_id' => $current_id
        ]);
        return view('accounts.posts.comment');
    }

    public function getData()
    {
        $post_id = session('post_id');
        $comment_id = '0';
        $accounts = DB::select("SELECT Result.account_id AS id FROM
        (SELECT post_comments.account_id, 
                post_comments.comment_id, 
                post_comments.comment, 
                post_comments.updated_at,
                post_comments.is_read,
                post_images.url, accounts.email,
                accounts.name FROM post_comments,
                post_images,
                accounts WHERE post_comments.post_id = post_images.post_id 
                AND post_comments.post_id = ".$post_id.") AS Result GROUP BY Result.account_id");
        
        $response = array();
        $current_time = Carbon::now()->format('Y-m-d H:i:s');

        foreach($accounts as $account){
            $total = DB::select("SELECT post_comments.account_id, 
            post_comments.comment_id, 
            post_comments.comment, 
            post_comments.updated_at,
            post_comments.is_read,
            post_images.url, accounts.email,
            accounts.name FROM post_comments,
            post_images,
            accounts WHERE post_comments.post_id = post_images.post_id
            AND post_comments.account_id = accounts.id AND post_comments.comment_id = ".$comment_id." AND post_comments.post_id = ".$post_id." AND post_comments.account_id = ".$account->id);


            $total_messages = DB::select("SELECT post_comments.account_id, 
            post_comments.comment,
            post_comments.is_read, 
            post_images.url, post_comments.updated_at,
            accounts.name FROM post_comments,
            post_images,
            accounts WHERE post_comments.post_id = post_images.post_id
            AND post_comments.account_id = accounts.id AND post_comments.comment_id != ".$comment_id." AND post_comments.post_id = ".$post_id." AND post_comments.account_id = ".$account->id);

            $conv_item['id'] = $account->id;
            $conv_item['pic'] =  $total[0]->url;
            $conv_item['name'] = $total[0]->name;
            $conv_item['email'] =$total[0]->email;
           
            $profiles = array();
            $msgs = array();

            //post message
            foreach($total_messages as $items){
                $data['name'] = $items->name;
                $data['pic'] = $items->url;
                $mention['receive'] = $this->getReply($items->is_read);
                $mention['receive_msg'] = $items->comment;
                $mention['receive_time'] = $this->getInterval($items->updated_at, $current_time);
                array_push($msgs, $mention);
            }
            $data['MsgBox'] = $msgs;
            array_push($profiles, $data);
            $conv_item['profileBox'] = $profiles;

            //post comment
            $comments = array();
            foreach($total as $item){
                $temp['comment_reply'] = $this->getReply($item->is_read);
                $temp['comment_msg'] = $item->comment;
                $temp['comment_time'] = $this->getInterval($item->updated_at, $current_time);
                array_push($comments, $temp);
            }
            $conv_item['commentBox'] = $comments;

            //response data
            array_push($response, $conv_item);
        };

        return $response;

    }

    public function getInterval($start, $end){
        $temp1 = explode(' ', $start);
        $temp2 = explode(' ', $end);

        $start_attr = explode('-', $temp1[0]);
        $end_attr = explode('-', $temp2[0]);
        $start_time = explode(':', $temp1[1]);
        $end_time = explode(':', $temp2[1]);
        if(!((int)$start_attr[0] == (int)$end_attr[0])) {
            $res_year = (string)((int)$end_attr[0] - (int)$start_attr[0]);
            return ($res_year."年前");
        } else if(!((int)$start_attr[1] == (int)$end_attr[1])) {
            $res_month = (string)((int)$end_attr[1] - (int)$start_attr[1]);
            return ($res_month."月前");
        } else if (!((int)$start_attr[2] == (int)$end_attr[2])) {
            $res_date = (string)((int)$end_attr[2] - (int)$start_attr[2]);
            return ($res_date."日前");
        } else if(!((int)$start_time[0] == (int)$end_time[0])) {
            $res_hour = (string)((int)$end_time[0] - (int)$start_time[0]);
            return ($res_hour."時間前");
        } else if(!((int)$start_time[1] == (int)$end_time[1])) {
            $res_min = (string)((int)$end_time[1] - (int)$start_time[1]);
            return ($res_min."分前");
        } else {
            $res_current = '';
            return ($res_current);
        }
         
    }

    public function getReply($request)
    {
        $reply = "返信する";
        $recetption = "";

        if($request == false) {
            return $reply;
        } else {
            return $recetption;
        }
    }

    public function storeComment(Request $request)
    {
        $comment_data = $request->all();
        $input_data = $request->input('comment_text');
        $current_id = $request->input('account_id');
        $is_at = str_contains($input_data, "@");
        $where_at = strpos($input_data, "@");
        if($is_at == true && $where_at === 0) {
            $data['post_id'] = session('post_id');
            $data['comment'] = $comment_data['comment_text'];
            $data = new PostComment();
            $data->post_id = session('post_id');
            $data->comment = $request->comment_text;
            $data->is_read = "0";
            $data->comment_id = session('current_id');
            $data->account_id = $current_id;
            $data->save();
            $response = $this->getData();
            return $response;


        } else {
            $data['post_id'] = session('post_id');
            $data['account_id'] = session('current_id');
            $data['comment'] = $comment_data['comment_text'];
            $data = new PostComment();
            $data->post_id = session('post_id');
            $data->comment = $request->comment_text;
            $data->is_read = "0";
            $data->comment_id = "0";
            $data->account_id = session('current_id');
            $data->save();
            $response = $this->getData();
            return $response;
        }

    }
}
