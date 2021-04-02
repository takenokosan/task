<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api']], function(){
    Route::get('get', [TaskController::class,'getTasks']);
    Route::post('add', [TaskController::class,'addTasks']);
    Route::post('del', [TaskController::class,'deleteTasks']);
    Route::post('change', [TaskController::class,'changeTasks']);
});
