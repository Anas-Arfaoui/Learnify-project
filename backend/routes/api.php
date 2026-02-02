<?php

use App\Http\Controllers\CrudOp;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Quiz;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);

Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/quiz/generate', [QuizController::class,'generate']);

    Route::get('/quiz/{quiz}', [QuizController::class,'show']);

    Route::post('/quiz/{quiz}/submit', [QuizController::class,'submit']);



});

Route::middleware(['auth:sanctum'])->group(function () { 

    Route::get('/admin/users', [CrudOp::class, 'index']);
    Route::post('/admin/users', [CrudOp::class, 'store']);
    Route::put('/admin/users/{id}', [CrudOp::class, 'update']);
    Route::delete('/admin/users/{id}', [CrudOp::class, 'delete']);

});

