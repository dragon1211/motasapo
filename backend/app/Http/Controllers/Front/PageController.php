<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactReply;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class PageController extends Controller
{
    /**
     * トップページ
     */
    public function top() {
        
        return view('pages.top');
    }

    /**
     * 利用規約
     */
    public function terms() {
        return view('pages.terms');
    }

    /**
     * 利用規約
     */
    public function privacy() {
        return view('pages.privacy');
    }

    /**
     * お問い合わせ
     */
    public function contactCreate() {
        return view('pages.contact');
    }

    /**
     * お問い合わせ POST
     */
    public function contactPost(StoreContactRequest $request)
    {
        $params = $request->all();
        // 多重送信防止処理
        if (!Cache::add('used_token.' . $request->session()->token(), 1, 1)) {
            return view('contact.complete');
        }
        // トランザクションを設置
        DB::beginTransaction();
        try {
            // １．DBに登録
            $newContact = new Contact();
            $newContact->fill($params)->save();
            // ２．自動返信メール送信
            $email = new ContactReply($params);
            Mail::to($params['email'])->send($email);
            // ３．commit及びリダイレクト設定
            DB::commit();
            return redirect(route('page.contact.complete'));
        } catch (\Exception $e) {
            DB::rollback();
            $error = 'お問い合わせの送信に失敗しました。';
            return back()->withInput()->withErrors($error);
        }
    }

    /**
     * お問い合わせ完了
     */
    public function contactComplete() {
        return view('pages.thanks');
    }
}
