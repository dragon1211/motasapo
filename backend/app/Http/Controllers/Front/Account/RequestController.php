<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Prefecture;
use App\Models\RequestModel;
use App\Models\RequestImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RequestController extends Controller
{

    public function index()
    {
        $current_id = Auth::id();
        $type = DB::select("SELECT accounts.type FROM accounts WHERE accounts.id = ".$current_id);
        if($type[0]->type == 0) {
            return view('accounts.requests.index');
        } else {
            return view('accounts.requests.shop_index');
        }
    } 
    
    public function newtype()
   {
       return view('accounts.requests.new_type'); 
   }
   public function new_vehicle()
   {
       return view('accounts.requests.new_vehicle');
   }

   public function new_image()
   {
       return view('accounts.requests.new_image');
   }
   
   public function uploadimages(Request $request)
   {
    $new_images = json_decode($request->input('images'));

    for ($i=0; $i < 20; $i++) { 
        
        if ($new_images[$i]->flag) {
           
            $image_64 = $new_images[$i]->imgUri;
            // $image_64 = $data['photo']; //your base64 encoded data

            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            $replace = substr($image_64, 0, strpos($image_64, ',')+1); 

            // find substring fro replace here eg: data:image/png;base64,

            $image = str_replace($replace, '', $image_64); 

            $image = str_replace(' ', '+', $image); 

            $imageName = 'moto_'.$i.'_'.time().'.'.$extension;

            // Storage::disk('public')->put($imageName, base64_decode($image));
            $path = 'images/request-images/';
            \File::put(public_path($path). $imageName, base64_decode($image));

            $request_id = RequestModel::all()->last()->id;

            RequestImage::create([
                'request_id' => $request_id ,
                'img' => $imageName
            ]);
        }
    }
    return "sucess";
   }

   public function new_detail()
   {
       return view('accounts.requests.new_detail');
   }

   public function new_request()
   {
       return view('accounts.requests.new_request');
   }

   public function new_request_data(){
   
        $prefectures = Prefecture::get('name');
        return $prefectures;

    }
   public function new_complete(Request $request)
   {

        $new_wish = json_decode($request->input('wishs'));
        $new_vehicle = json_decode($request->input('vehicle'));
        $new_detail = json_decode($request->input('detail'))->detail;
        $new_request = json_decode($request->input('request'))->request;
        
        
       

        $area = $new_request->area;
        $id = Prefecture::where('name', $area)->first()->id;

        RequestModel::create([
            'account_id' => Auth::id(),
            'type' =>$new_wish->wish,
            'target' => $new_vehicle->vehicle,
            'brand'  =>$new_detail->brandname,
            'vehicle'  =>$new_detail->vehicletype,
            'grade'  => $new_detail->grade,
            'color'  => $new_detail->color,
            'mileage'  => $new_detail->mileage,
            'price'  => $new_request->budget,
            'prefecture_id' => $id ,
            'remark' => $new_request->Remarks,
        ]);

        return "sucess";
        
   } 
   public function view_new_complete()
   {
        return view('accounts.requests.new_complete');
   }
}
