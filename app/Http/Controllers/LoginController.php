<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    protected function getResource($model)
    {
        return new UserResource($model);
    }


    public function getUser(Request $request)
    {
        $user = User::getUser($request['username'], $request['password'])->first();
        if ($user) {
            $random1 = md5(uniqid(rand(), true));
            $random2 = md5(uniqid(rand(), true));
            $user->remember_token =  sprintf("%s%s%s%s", $random1, now()->format('Ymd'), $random2, $user->id);
            $user->save();
            return $this->getResource($user);
        } else {
            return response()->json([
                'message' => "Error",
                'errors' => ["Record does not exists"]
            ])->setStatusCode(422);
        }
    }
}
