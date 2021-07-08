<?php

namespace App\Http\Requests;

use App\Rules\AlphaRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'account'  => ['required', 'max:50', 'min:5', new AlphaRule],
            'name'     => ['required', 'max:255'],
            'sex'      => ['required', new AlphaRule],
            'password' => ['required', 'max:255', 'confirmed', new AlphaRule],
            'confirm'  => ['required', 'max:255', new AlphaRule],
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
            'account'  => 'アカウント',
            'name'     => '名前',
            'sex'      => '性別',
            'password' => 'パスワード',
            'confirm'  => '確認用パスワード',
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
            'account.required'   => 'アカウント名は必須です。',
            'account.max'        => 'アカウント名は50文字以内です。',
            'account.min'        => 'アカウント名は5文字以上です。',
            'name.required'      => 'お名前は必須です。',
            'name.max'           => 'お名前は255文字以内です。',
            'sex.required'       => '性別は必須です。',
            'password.required'  => 'パスワードは必須です。',
            'password.max'       => 'パスワードは255文字以内です。',
            'password.confirmed' => '確認用パスワードと異なります。',
            'confirm.required'   => '確認用パスワードは必須です。',
            'confirm.max'        => '確認用パスワードは255文字以内です。',
        ];
    }
}
