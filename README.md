# バイク・車好きのためのウェブアプリ｜モタサポ
### (Web app for motorcycle and car lovers ｜ Motasapo)
<br>
<div style="background-color:#454545; color:white">

<h3>このシステムは、自転車、自動車、お客様の評価に基づいて、顧客の購買に信頼性を確保するシステムです。
製品お客様の評価と顧客との間のメッセージ機能は、GPSを介して最も近い店と顧客を知っている彼らとメッセージを与え、製品の信頼性を確保してくれます。(This system is a system that secures reliability through customer purchases based on customer evaluations of bicycles and automobiles.
Product customer testimonials and message between customers function know the nearest store and customer via GPS and message with them, thus gaining trust in the product.)</h3><br>
<h4><b>Language</b>: Laravel & React & Typescript & MySQL</h4><hr>
<ul>
    <li>[gps_home.jpg]
        <dl>
            このページは、ログインしてサインアップするための最初のページです。(This page is first page to login and signup.)
        </dl>
    </li>
    <li>[gps_intro.jpg]
        <dl>
            このページはあなたの紹介を示しています。(This page shows your introduction.)
        </dl>
    </li>
    <li>[gps_img_upload.jpg]
        <dl>
            このページは、画像とメッセージを自分のパートナーに送信するための画像アップロードページです。(This page is image upload page to send image and message to own partner.)
        </dl>
    </li>
    <li>[gps_map.png]
        <dl>
            このページは、彼らの場所から最短距離にあるパートナーやショップの位置を示しています。(This page shows the position of partners and shops where there are in the shortest way from their place.)
        </dl>
    </li>
    <li>[gps_matching.jpg]
        <dl>
            このページには、パートナーやショップの情報が表示されます。(This page shows the information of partners and shops.)
        </dl>
    </li>
    <li>[gps_message.jpg]
         <dl>
            このページから、実行時にパートナーにメッセージを送信できます。(Through this page, you can send message to your partner in run-time)
        </dl>
    </li>
    <li>[gps_profile.jpg]
        <dl>
            このページを通して、あなたは指定された人のプロフィールを見ることができます。(Through this page, you can see the profile of specified person.)
        </dl>
    </li>
    <li>...</li>
</ul>
<h3>[gps_home.jpg]</h3>
<img src="./info/gps_home.jpg" width="440px" height="700px"/>
<hr>

<h3>[gps_intro.jpg]</h3>
<img src="./info/gps_intro.jpg" width="440px" height="700px"/>
<hr>

<h4>[gps_img_upload.jpg]</h4>
<img src="./info/gps_img_upload.jpg" width="440px" height="700px"/>
<hr>

<h4>[gps_map.png]</h4>
<img src="./info/gps_map.png" width="440px" height="700px"/>
<hr>

<h4>[gps_message.jpg]</h4>
<img src="./info/gps_message.jpg" width="440px" height="700px"/>
<hr>

<h4>[gps_profile.jpg]</h4>
<img src="./info/gps_profile.jpg" width="440px" height="700px"/>
<hr>
<h3>Install </h3>
<ul>
    <li>１．Docker立ち上げ</li>
    <dl>docker-compose up -d</dl>
    <li>２．appに入る</li>
    <dl>docker-compose exec app bash</dl>
    <li>３．各種インストール</li>
    <dl>
        npm install<br>
        composer install
    </dl>
    <li>４．npm実行</li>
    <dl>
        php artisan key:generate<br>
        npm run watch(npm run dev)
    </dl>
    <li>５．DB接続</li>
    <dl>
        cp .env.example .env<br>
        php artisan migrate:fresh --seed
    </dl>
</ul>
<hr>

&copy; 2021 All rights reserved.
<div>