<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return $this->getResourceCollection(Product::orderBy('created_at', 'desc')->paginate());
    }

    protected function getResource($model)
    {
        return new ProductResource($model);
    }

    protected function getResourceCollection($pagination)
    {
        return ProductResource::collection($pagination);
    }

    public function getProduct($id)
    {
        return $this->getResource(Product::find($id));
    }

    public function save(Request $request)
    {
        DB::transaction(function () use ($request) {
            if ($request['id']) {
                $product  = Product::find($request['id']);
                $product->update([
                    'name' => $request['name'],
                    'category' => $request['category'],
                    'description' => $request['description'],
                    'date' => $request['date'],
                ]);
                return $product;
            }
            return Product::create([
                'name' => $request['name'],
                'category' => $request['category'],
                'description' => $request['description'],
                'date' => $request['date'],
            ]);
        });

        return $this->getResourceCollection(Product::orderBy('created_at', 'desc')->paginate());
    }
}
