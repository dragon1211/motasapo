@extends('layouts.page')

{{--  タイトル・メタディスクリプション  --}}
@section('title', 'お問い合わせ完了')
@section('description', 'お問い合わせ完了ページです。バイク・車好きのためのウェブアプリ「モタサポ」の公式アプリです。')
@section('pageCss')
@section('h1', 'お問い合わせ完了')
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
    <p>お問い合せが完了しました！</p>
</div>
<div class="page-text page-content">
    <p>お問い合わせいただき、有難うございました。<br>3営業日以内にお返事させていただきます。</p>
</div>
@endsection
@include('layouts.footer')
