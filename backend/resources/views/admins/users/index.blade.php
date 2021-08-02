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
    <h1>これはマネージャーページです</h1><a href="{{ route('admin_login') }}" class="btn btn-info">ログアウト</a>
</div>
@endsection
@include('layouts.footer')