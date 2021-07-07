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
    <p>ユーザー情報を<br>入力してください。</p>
</div>

<div class="page-content">
    <form method="POST" action="{{ route('user.account.post') }}">
        @csrf
        <ul class="c-lists">
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
                    お名前
                </label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    class="@error('name') is-invalid @enderror c-input__target"
                    value="{{ old('name') }}"
                />
                @error('name')
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
                />
                @error('password_confirmation')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
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
            <li class="c-list c-button">
                <button
                    type="submit"
                    class="c-button__target--contained c-button--long"
                    required
                >
                    新規登録
                </button>
            </li>
        </ul>
    </form>
</div>

@endsection
@include('layouts.footer')
