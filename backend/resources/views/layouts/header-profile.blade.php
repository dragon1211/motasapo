@section('header')
<header class="l-header">
    <div class="wrap">
        <div class="l-header--inner c-flex v-center h-between">
            <div class="l-header--logo u-w70">
                <a href="{{ route('page.top') }}">
                    <img src="{{ asset('/storage/base/back-arrow.png') }}" alt="モタサポのロゴ">
                </a>
            </div>
            <div class="l-header--title">
                <h1>@yield('h1')</h1>
            </div>
            <!-- <div class="l-header--nav u-w70 c-flex h-between">
                <div class="hamburger-memu nav-icon">
                    <a href="">
                        <span class="batch-circle"></span>
                        <img src="{{ asset('/storage/base/icon-header-comment-g.png') }}" alt="メッセージアイコン">
                    </a>
                </div>
                <div class="hamburger-memu nav-icon">
                    <a href="{{ url('/account/chatroom') }}">
                        <span class="batch-circle"></span>
                        <img src="{{ asset('/storage/base/icon-header-mail-g.png') }}" alt="メールアイコン">
                    </a>
                </div>
            </div> -->
        </div>
    </div>
</header>
@endsection
