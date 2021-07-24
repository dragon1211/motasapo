<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PostComment;
use Illuminate\Support\Facades\DB;
use Session;

class PostController extends Controller
{
    public function postIndex() {
    }

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

        $accounts = DB::select("SELECT Result.account_id AS id FROM
        (SELECT post_comments.account_id, 
                post_comments.comment_id, 
                post_comments.comment, 
                post_images.url, 
                accounts.name FROM post_comments,
                post_images,
                accounts WHERE post_comments.post_id = post_images.post_id
                AND post_comments.account_id = accounts.id AND post_comments.post_id = ".$post_id.") AS Result GROUP BY Result.account_id");
        
        $response = array();

        foreach($accounts as $account){
            $person = array();
            $total = DB::select("SELECT post_comments.account_id, 
            post_comments.comment_id, 
            post_comments.comment, 
            post_images.url, 
            accounts.name FROM post_comments,
            post_images,
            accounts WHERE post_comments.post_id = post_images.post_id
            AND post_comments.account_id = accounts.id AND post_comments.post_id = ".$post_id." AND post_comments.account_id = ".$account->id);

            $total_messages = DB::select("SELECT messages.text, 
            messages.img, 
            accounts.name FROM messages,
            accounts WHERE accounts.id = messages.receive_account_id
            AND accounts.id = ".$account->id);

            $conv_item['id'] = $account->id;
            $conv_item['pic'] =  $total[0]->url;
            $conv_item['name'] = $total[0]->name;
            $conv_item['time'] = 13;
            $comments = array();
            $profiles = array();
            $msgs = array();
            foreach($total_messages as $items){
                $data['name'] = $items->name;
                $data['pic'] = $items->img;
                array_push($msgs, $items->text);
            }
            $data['MsgBox'] = $msgs;
            array_push($profiles, $data);

            $conv_item['profileBox'] = $profiles;

            foreach($total as $item){
                array_push($comments, $item->comment);
            }
            
            $conv_item['commentBox'] = $comments;
            array_push($response, $conv_item);
        };

        return $response;

    }

    public function storeComment(Request $request)
    {
        $comment_data = $request->all();
        $data['post_id'] = session('post_id');
        $data['account_id'] = session('current_id');
        $data['comment'] = $comment_data['comment_text'];
        $data = new PostComment();
        $data->post_id = session('post_id');
        $data->account_id = session('current_id');
        $data->comment = $request->comment_text;
        $data->is_read = "0";
        $data->comment_id = "3";
        $data->save();
        return $this->getData();
    }
}
