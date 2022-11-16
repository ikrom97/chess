<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
  public function index(Request $request)
  {
    return Article::orderBy($request->orderby, $request->ordertype)
      ->paginate($request->count);
  }

  public function show($slug)
  {
    return Article::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
      ->where('slug', $slug)
      ->first();
  }
}
