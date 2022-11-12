<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayersController extends Controller
{
  public function index(Request $request)
  {
    if ($request->category == 'local') {
      return Player::select('id', 'name', 'avatar', 'rating', 'rank', 'title', 'country', 'flag')
        ->where('global', false)
        ->orderBy('rating', 'desc')
        ->orderBy('rank', 'desc')
        ->orderBy('name', 'desc')
        ->get();
    }

    return Player::select('id', 'name', 'avatar', 'rating', 'rank', 'title', 'country', 'flag')
      ->where('global', true)
      ->orderBy('rating', 'desc')
      ->orderBy('rank', 'desc')
      ->orderBy('name', 'desc')
      ->get();
  }
}
