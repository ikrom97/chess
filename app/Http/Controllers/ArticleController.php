<?php

namespace App\Http\Controllers;

use App\Models\Article;
use DateTime;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
  public function index(Request $request)
  {
    $currentDate = new DateTime();

    $viewport = $request->header('viewport');

    switch (true) {
      case $viewport > 1391:
        $items = 16;
        break;

      case $viewport > 1043:
        $items = 12;
        break;

      default:
        $items = 8;
        break;
    }

    if ($request->page) {
      return Article::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
        ->where('date', '<', $currentDate)
        ->orderBy('date', 'desc')
        ->paginate($items);
    }

    return Article::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
      ->where('date', '<', $currentDate)
      ->orderBy('date', 'desc')
      ->take(10)
      ->get();
  }

  public function show($slug)
  {
    return Article::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
      ->where('slug', $slug)
      ->first();
  }
}
