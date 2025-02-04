<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Validator;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Storage;


class VehicleController extends Controller
{
    public function getVehicles(Request $request){

        $data=DB::table('vehicles')
        ->select('*')
        ->get();

        return response($data,200);
    }

    public function addImage(Request $request){

        $fields = $request->all();

        $errors = Validator::make($fields, [
            'id' => 'required',
            'image' => 'required|image|max:2043',

        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        if($request->hasFile('image')){

            $image=$request->file('image');

            $input['file']=time().'.'.$image->getClientOriginalExtension();

            Storage::disk('public')
           ->put('images/' . $input['file'], file_get_contents($image));

           $imageURL=url('/').'/storage/images/'.$input['file'];

           Vehicle::where('id',$fields['id'])
           ->update([
               'image'=>$imageURL,
           ]);

           return response(['message'=>'Vehicle image uploaded successfully !']);

        }


        
    } 
    public function store(Request $request){

        $fields = $request->all();

        $errors = Validator::make($fields, [
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',

            
            

        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $Vehicle=Vehicle::create([
            'name'=>$fields['name'],
            'model'=>$fields['model'],
            'price'=>$fields['price'],
          

        ]);

        return response([
            'message'=>'Vehicle created successfully !',
            'Vehicle'=>$Vehicle,
    ]);

        
    }
    public function update(Request $request){


        $fields = $request->all();

        $errors = Validator::make($fields, [
            'id'=> 'required',
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        Vehicle::where('id',$fields['id'])
        ->update([
            'name'=>$fields['name'],
            'model'=>$fields['model'],
            'price'=>$fields['price'],

        ]);

        return response(['message'=>'Vehicle updated successfully !']);

        
    }
    public function destroy(Request $request){
        $fields = $request->all();

        $errors = Validator::make($fields, [
            'id'=> 'required',
      
        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        Vehicle::where('id',$fields['id'])
        ->delete();

        return response(['message'=>'Vehicle deleted successfully !']);

    }
}
