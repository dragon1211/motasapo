@extends('accounts.gpss.html')

@section('title', '投稿一覧')
@section('pageCss')
@section('h1', 'GPS')
@endsection

{{--  CSS  --}}
@push('css')
@endpush

{{--  JS  --}}
@push('js')
<script src="{{ asset('js/components/InputAnimation.js') }}"></script>
@endpush

{{-- 本文 --}}
@include('layouts.header-account')
@section('content')
    <div id="gps"></div>
@endsection
@include('layouts.footer')
