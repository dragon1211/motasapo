@extends('layouts.page')

{{--  タイトル・メタディスクリプション  --}}
@section('title', 'ログイン')
@section('description', 'お問い合わせページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', 'ログイン')
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
    <p>ログイン情報を<br>入力してください。</p>
</div>
<div class="page-content">
    <form method="POST" action="{{ route('login') }}">
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

{{--  <x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

        <x-jet-validation-errors class="mb-4" />

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div>
                <x-jet-label for="email" value="{{ __('Email') }}" />
                <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <div class="mt-4">
                <x-jet-label for="password" value="{{ __('Password') }}" />
                <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="current-password" />
            </div>

            <div class="block mt-4">
                <label for="remember_me" class="flex items-center">
                    <x-jet-checkbox id="remember_me" name="remember" />
                    <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                @if (Route::has('password.request'))
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif

                <x-jet-button class="ml-4">
                    {{ __('Log in') }}
                </x-jet-button>
            </div>
        </form>
    </x-jet-authentication-card>
</x-guest-layout>  --}}
