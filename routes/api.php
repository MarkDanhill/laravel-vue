<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\Cors;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
    Route::post('/save', [ProductController::class, 'save']);
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'getProduct']);
})->middleware(Cors::class);

Route::prefix('login')->group(function () {
    Route::get('/getUser', [LoginController::class, 'getUser']);
});
