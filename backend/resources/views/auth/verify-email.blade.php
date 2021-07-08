@extends('layouts.page')

{{--  タイトル・メタディスクリプション  --}}
@section('title', '仮登録完了')
@section('description', 'お問い合わせ完了ページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', '仮登録完了')
@endsection

{{--  CSS  --}}
@push('css')
@endpush

{{--  JS  --}}
@push('js')
@endpush

{{-- 本文 --}}
@include('layouts.header')
@section('content')
<div class="page-headline page-content">
    <p>仮登録が完了しました！</p>
</div>
<div class="page-text page-content">
    <p>ご入力いただいたメールアドレスへ認証リンクを送信しましたので、クリックして認証を完了させてください。</p>
    <p>もし、認証メールが届かない場合は再送させていただきます。</p>
</div>
<div class="page-content">
    <form method="POST" action="/email/verification-notification">
        @csrf
        <ul class="c-lists">
            <li class="c-list c-button">
                <button
                    type="submit"
                    class="c-button__target--contained c-button--long"
                >
                    認証メールを再送する
                </button>
            </li>
        </ul>
    </form>
</div>
@endsection
@include('layouts.footer')


{{--  <x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            ご登録ありがとうございます！<br>
            ご入力いただいたメールアドレスへ認証リンクを送信しましたので、クリックして認証を完了させてください。<br>
            もし、認証メールが届かない場合は再送させていただきます。
        </div>

        @if (session('status') == 'verification-link-sent')
            <div class="mb-4 font-medium text-sm text-green-600">
                新しい認証メールが送信されました。
            </div>
        @endif

        <div class="mt-4 flex items-center justify-between">
            <form method="POST" action="/email/verification-notification">
                @csrf

                <div>
                    <x-jet-button type="submit">
                        認証メールを再送する
                    </x-jet-button>
                </div>
            </form>

            <form method="POST" action="/logout">
                @csrf

                <button type="submit" class="underline text-sm text-gray-600 hover:text-gray-900">
                    ログアウト
                </button>
            </form>
        </div>
    </x-jet-authentication-card>
</x-guest-layout>  --}}
