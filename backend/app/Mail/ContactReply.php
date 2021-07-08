<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactReply extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * 注文インスタンス
     */
    public $params;

    /**
     * 新しいメッセージインスタンスの生成
     *
     * @param  \App\Models\Contact  $order
     * @return void
     */
    public function __construct($params)
    {
        $this->params = $params;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('モタサポにお問い合わせがありました')
            ->view('emails.contacts.reply')
            ->with([
                'email'   => $this->params['email'],
                'remarks' => $this->params['remarks'],
            ]);
    }
}
