<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'   => 'required|max:255',
            'remarks' => 'required|max:1000',
        ];
    }
    /**
     * バリデーションエラーのカスタム属性の取得
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'email'   => 'メールアドレス',
            'remarks' => '備考',
        ];
    }

    /**
     * 定義済みバリデーションルールのエラーメッセージ取得
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required'   => 'メールアドレスは必須です。',
            'remarks.required' => '備考は必須です。',
            'email.max'        => 'メールアドレスは255文字以内です。',
            'remarks.max'      => '備考は1000文字以内です。',
        ];
    }
}
