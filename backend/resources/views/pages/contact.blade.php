@extends('layouts.page')

{{--  タイトル・メタディスクリプション  --}}
@section('title', 'お問い合わせ')
@section('description', 'お問い合わせページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', 'お問い合わせ')
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
    <p>モタサポへのお問合せフォーム</p>
</div>
<div class="page-content">
    <form method="POST" action="{{ route('page.contact.post') }}">
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
                />
                @error('email')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-input">
                <label
                    for="remarks"
                    class="c-input__label"
                >お問い合せ内容</label>
                <textarea
                    name="remarks"
                    id="remarks"
                    class="@error('remarks') is-invalid @enderror c-input__target"
                    required
                >{{ old('remarks') }}</textarea>
                @error('remarks')
                    <span class="l-alert__text--red">{{ $message }}</span>
                @enderror
            </li>
            <li class="c-list c-button">
                <button
                    type="submit"
                    class="c-button__target--contained c-button--long"
                >
                    お問い合わせ送信
                </button>
            </li>
        </ul>
    </form>
</div>

@endsection
@include('layouts.footer')
