@extends('layouts.page')

{{--  タイトル・メタディスクリプション  --}}
@section('title', '送信エラー')
@section('description', '送信エラーのページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', '送信エラー')
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
    <p>何度も押さないで！</p>
</div>
<div class="page-text page-content">
    <p>登録・送信を押すとエラーになってしまいます。<br>お手数ですが、前の画面に戻り同じ作業をお願いいたします。</p>
</div>
@endsection
@include('layouts.footer')
