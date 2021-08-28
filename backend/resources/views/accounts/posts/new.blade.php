@extends('accounts.posts.index')

@section('title', 'New')
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
@include('layouts.header-account')
@section('content')
    <div id="new_post"></div>
@endsection
@include('layouts.footer')
