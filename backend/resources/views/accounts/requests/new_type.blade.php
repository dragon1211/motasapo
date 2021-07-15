@extends('layouts.account')

@section('title', '投稿一覧')
@section('pageCss')
@section('h1', 'LOGO')
@endsection

{{--  CSS  --}}
@push('css')
@endpush

{{--  JS  --}}
@push('js')
<script src="{{ asset('js/components/InputAnimation.js') }}"></script>
@endpush

{{-- 本文 --}}
@section('content')
    <div id="request"></div>
@endsection

