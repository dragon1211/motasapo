@extends('accounts.gpss.index')

@section('title', 'New Post')
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
    <div id="gps_new_post"></div>
@endsection
@include('layouts.footer')
