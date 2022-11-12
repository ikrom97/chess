<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use DateTime;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
  public function index(Request $request)
  {
    $currentDate = new DateTime();

    $viewport = $request->header('viewport');

    switch (true) {
      case $viewport > 1391:
        $items = 8;
        break;

      case $viewport > 1043:
        $items = 9;
        break;

      default:
        $items = 8;
        break;
    }

    if ($request->filter === 'upcoming') {
      return Tournament::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
        ->where('date', '>', $currentDate)
        ->orderBy('date', 'desc')
        ->get();
    }

    if ($request->page) {
      return Tournament::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
        ->where('date', '<', $currentDate)
        ->orderBy('date', 'desc')
        ->paginate($items);
    }

    return Tournament::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
      ->where('date', '<', $currentDate)
      ->orderBy('date', 'desc')
      ->take(10)
      ->get();
  }

  public function show($slug)
  {
    return Tournament::with('ticket')
      ->select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
      ->where('slug', $slug)
      ->first();
  }
}
