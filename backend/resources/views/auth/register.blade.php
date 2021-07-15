@extends('layouts.page')

@section('title', 'バイク・車好きのためのウェブアプリ')
@section('description', 'バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', 'モタサポ')
@endsection

{{--  CSS  --}}
@push('css')
@endpush

{{--  JS  --}}
@push('js')
<script src="{{ asset('js/components/InputAnimation.js') }}"></script>
@endpush

{{-- 本文 --}}
@include('layouts.header')
@section('content')

<div class="page-headline page-content">
    <p>
        @if(Request::is('register-user'))
        ユーザー情報を
        @elseif(Request::is('register-shop'))
        ショップ情報を
        @endif
        <br>入力してください。
    </p>
</div>

<div class="page-content">
    @if(Request::is('register-user'))
    <form method="POST" action="{{ route('register.user.post') }}">
    @elseif(Request::is('register-shop'))
    <form method="POST" action="{{ route('register.shop') }}">
    @endif
    {{--  <form method="POST" action="{{ route('register') }}">  --}}
    {{-- <form method="POST" action="{{ route('page.contact.post') }}"> --}}
        @csrf
        <ul class="c-lists custom">
            <li class="c-list c-input">
                <label
                    for="name"
                    class="c-input__label"
                >
                    アカウント名(半角英数字のみ)
                </label>
                <input
                    name="account"
                    id="account"
                    type="text"
                    class="@error('account') is-invalid @enderror c-input__target"
                    value="{{ old('account') }}"
                    required
                />
                @error('account')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="name"
                    class="c-input__label"
                >
                    @if(Request::is('register-user'))
                    お名前
                    @elseif(Request::is('register-shop'))
                    ショップ名
                    @endif
                </label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    class="@error('name') is-invalid @enderror c-input__target"
                    value="{{ old('name') }}"
                    required
                />
                @error('name')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
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
                />
                @error('email')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="password"
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
                />
                @error('password')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="confirm"
                    class="c-input__label"
                >
                    確認用パスワード
                </label>
                <input
                    name="password_confirmation"
                    id="password_confirmation"
                    type="password"
                    class="@error('password_confirmation') is-invalid @enderror c-input__target"
                    value="{{ old('password_confirmation') }}"
                    required
                />
                @error('password_confirmation')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            @if(Request::is('register-user'))
            <li class="c-list c-input u-ml10">
                <div class="c-input__checkbox u-mb10">
                    <label for="man">
                        <span>男性</span>
                        <input
                            id="man"
                            name="sex"
                            type="radio"
                            value="man"
                            checked
                        >
                        <div class="color-box circle"></div>
                    </label>
                </div>
                <div class="c-input__checkbox">
                    <label for="woman">
                        <span>女性</span>
                        <input
                            id="woman"
                            name="sex"
                            type="radio"
                            value="woman"
                        >
                        <div class="color-box circle"></div>
                    </label>
                </div>
            </li>
            @elseif(Request::is('register-shop'))
            <li class="c-list c-input">
                <label
                    for="tel"
                    class="c-input__label"
                >
                    ショップ電話番号
                </label>
                <input
                    name="tel"
                    id="tel"
                    type="tel"
                    class="@error('tel') is-invalid @enderror c-input__target"
                    value="{{ old('tel') }}"
                    required
                />
                @error('tel')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="url"
                    class="c-input__label"
                >
                    ショップURL
                </label>
                <input
                    name="url"
                    id="url"
                    type="url"
                    class="@error('url') is-invalid @enderror c-input__target"
                    value="{{ old('url') }}"
                />
                @error('url')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="detail"
                    class="c-input__label"
                >ショップ詳細</label>
                <textarea
                    name="detail"
                    id="detail"
                    class="@error('detail') is-invalid @enderror c-input__target"
                >{{ old('detail') }}</textarea>
                @error('detail')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="hour"
                    class="c-input__label"
                >営業時間・休日</label>
                <textarea
                    name="hour"
                    id="hour"
                    class="@error('hour') is-invalid @enderror c-input__target"
                >{{ old('hour') }}</textarea>
                @error('hour')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list">
                <div id="categoryList"></div>
            </li>
            @endif
            <li class="c-list c-button">
                <button
                    type="submit"
                    class="c-button__target--contained c-button--long"
                >
                    仮登録
                </button>
            </li>
        </ul>
    </form>
</div>

@endsection
@include('layouts.footer')
