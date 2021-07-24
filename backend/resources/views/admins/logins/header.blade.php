@section('header')
<header class="l-header">
    <div class="wrap">
        <div class="l-header--inner c-flex v-center h-between">
            <div class="l-header--logo">
                <a href="{{ route('page.top') }}">
                    <img src="{{ asset('/storage/base/logo-square.png') }}" alt="モタサポのロゴ">
                </a>
            </div>
            <div class="l-header--title">
                <h1>@yield('h1')</h1>
            </div>
            
        </div>
    </div>
</header>
@endsection
