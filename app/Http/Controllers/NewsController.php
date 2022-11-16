<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
  public function index(Request $request)
  {
    return News::orderBy($request->orderby, $request->ordertype)
      ->paginate($request->count);
  }

  public function show($slug)
  {
    return News::where('slug', $slug)->first();
  }
}
