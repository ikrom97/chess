<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use DateTime;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
  public function index(Request $request)
  {
    $keyword = $request->keyword;
    if ($keyword) {
      return Tournament::orderBy($request->sort, $request->order)
        ->where('title', 'like', '%' . $keyword . '%')
        ->orWhere('content', 'like', '%' . $keyword . '%')
        ->paginate($request->count);
    }

    return Tournament::orderBy($request->sort, $request->order)
      ->paginate($request->count);
  }

  public function previous(Request $request)
  {
    $currentDate = new DateTime();

    return Tournament::where('date', '<', $currentDate)
      ->orderBy($request->sort, $request->order)
      ->paginate($request->count);
  }

  public function upcoming(Request $request)
  {
    $currentDate = new DateTime();

    return Tournament::where('date', '>', $currentDate)
      ->orderBy($request->sort, $request->order)
      ->get();
  }

  public function show($slug)
  {
    return Tournament::with('ticket')
      ->where('slug', $slug)
      ->first();
  }
}
