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
            <div class="l-header--nav">
                <div class="hamburger-memu">
                    <input type="checkbox" id="menu-btn-check">
                    <label for="menu-btn-check" class="menu-btn">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </label>
                    <div class="nav-menu">
                        <ul class="c-lists">
                            <li class="c-list">
                                <a href="{{ route('page.top') }}">トップページ</a>
                            </li>
                            <li class="c-list">
                                <a href="{{ route('page.terms') }}">利用規約</a>
                            </li>
                            <li class="c-list">
                                <a href="{{ route('page.privacy') }}">プライバシーポリシー</a>
                            </li>
                            <li class="c-list">
                                <a href="{{ route('page.contact') }}">お問い合わせ</a>
                            </li>
                            <li class="c-list c-button u-mt30">
                                <a href="{{ route('register.user') }}" class="c-button__target--contained c-button--long">ユーザー登録（無料）</a>
                            </li>
                            <li class="c-list c-button">
                                <a href="{{ route('register.shop') }}" class="c-button__target--contained c-button--long">ショップ登録（有料）</a>
                            </li>
                            <li class="c-list c-button">
                                <a href="{{ route('login') }}" class="c-button__target--outlined c-button--long">ログイン</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
@endsection
