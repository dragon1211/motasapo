<DOCTYPE HTML>
    <html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>コメント</title>
        <meta name="description" itemprop="description" content="@yield('description')">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet" />
        @stack('css')
    </head>
    <body>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <header class="l-header">
            <div class="wrap">
                <div class="l-header--inner c-flex v-center h-between">
                    <div class="l-header--logo u-w70">
                        <a href="/account/post">
                            <img src="{{ asset('/storage/base/arrow-left.svg') }}" alt="モタサポのロゴ">
                        </a>
                    </div>
                    <div class="l-header--title">
                        <h1>コメント</h1>
                    </div>
                    <div class="l-header--nav u-w70 c-flex h-between">
                        <div class="hamburger-memu nav-icon">
                            <a href="{{ url('/account/chatroom') }}">
                                <img src="{{ asset('/storage/base/icon-header-mail-g.png') }}" alt="メールアイコン">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div id="comment"></div>    
        <script src="{{ asset('js/app.js') }}"></script>
        @stack('js')
    </body>
    </html>
