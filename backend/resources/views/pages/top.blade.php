@extends('layouts.page')

@section('title', 'バイク・車好きのためのウェブアプリ')
@section('description', 'バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', 'モタサポ')
@endsection

@include('layouts.header')
@section('content')
<div class="page-screen">
    <img src="{{ asset('/storage/base/top-screen.png') }}" alt="車・バイクの画像">
</div>
<div class="page-content">
    <ul class="c-lists">
        <li class="c-list c-button">
            <a class="c-button__target--contained c-button--long" href="{{ route(('register.user')) }}">ユーザー登録（無料）</a>
        </li>
        <li class="c-list c-button">
            <a class="c-button__target--contained c-button--long" href="{{ route(('register.shop')) }}">ショップ登録（有料）</a>
        </li>
        <li class="c-list c-button">
            <a class="c-button__target--outlined c-button--long" href="{{ route('login') }}">ログイン</a>
        </li>
        <li class="c-list c-button">
            <a class="c-button__target--text" href="{{ route('password.request') }}">パスワードを忘れた方</a>
        </li>
    </ul>
</div>

@endsection
@include('layouts.footer')
