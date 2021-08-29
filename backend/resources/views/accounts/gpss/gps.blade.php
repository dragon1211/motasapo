@extends('accounts.gpss.index')

@section('title', 'GPS')
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
@section('content')
    <div id="gps"></div>
@endsection
@include('layouts.footer')
