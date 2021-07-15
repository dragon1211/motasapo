<DOCTYPE HTML>
    <html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>@yield('title')｜モタサポ</title>
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
        @yield('header')
        <div class="l-main wrap top">
            <!-- コンテンツ -->
            <div class="wrap-inner">
                @yield('content')
            </div>
        </div>
        @yield('footer')
        <script src="{{ asset('js/app.js') }}"></script>
        @stack('js')
    </body>
    </html>
