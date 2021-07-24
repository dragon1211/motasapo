@extends('layouts.page')

@section('title', 'ログイン')
@section('description', 'お問い合わせページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', '管理者ログイン')
@endsection

{{--  CSS  --}}
@push('css')
@endpush

{{--  JS  --}}
@push('js')
<script src="{{ asset('js/components/InputAnimation.js') }}"></script>
@endpush

{{-- 本文 --}}
@include('admins.logins.header')
@section('content')
<div class="page-headline page-content">
    <p>ログイン情報を<br>入力してください。</p>
</div>
<div class="page-content">
    <form method="POST" action="{{ route('admin.login') }}">
        @csrf
        <ul class="c-lists">
            <li class="c-list c-input">
                <label
                    for="email"
                    class="c-input__label"
                >
                    メールアドレス
                </label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    class="@error('email') is-invalid @enderror c-input__target"
                    value="{{ old('email') }}"
                    required
                    autofocus
                />
                @error('email')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="email"
                    class="c-input__label"
                >
                    パスワード
                </label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    class="@error('password') is-invalid @enderror c-input__target"
                    value="{{ old('password') }}"
                    required
                    autofocus
                />
                @error('password')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input u-ml10">
                <div class="c-input__checkbox">
                    <label for="remember_me">
                        <span>ログイン情報を保持する</span>
                        <input
                            id="remember_me"
                            name="remember"
                            type="checkbox"
                            value="remember"
                        >
                        <div class="color-box"></div>
                    </label>
                </div>
            </li>
            <li class="c-list c-button">
                <button
                    type="submit"
                    class="c-button__target--contained c-button--long"
                >
                    ログイン
                </button>
            </li>
        </ul>
    </form>
</div>

@endsection
@include('layouts.footer')