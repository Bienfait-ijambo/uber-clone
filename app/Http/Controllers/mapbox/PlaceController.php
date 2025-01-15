<?php

namespace App\Http\Controllers\mapbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlaceController extends Controller
{
  

    public function fetchPlaces(Request $request){

        $query=$request->get('query');


        $response=Http::get('https://api.mapbox.com/search/geocode/v6/forward',[
            'q'=>!is_null($query) ? $query:'',
            'access_token'=>env('MAP_BOX_ACCESS_TOKEN'),
            'limit'=>10
        ]);

        if($response->successful()){

            return response($response->json());
            
        }else{
            return response(['message'=>'failed to fetch places'],$response->status());
        }



    }
}
