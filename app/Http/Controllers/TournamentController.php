<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use DateTime;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
  public function index(Request $request)
  {
    return Tournament::orderBy($request->orderby, $request->ordertype)
      ->paginate($request->count);
  }

  public function previous(Request $request)
  {
    $currentDate = new DateTime();

    return Tournament::where('date', '<', $currentDate)
      ->orderBy($request->orderby, $request->ordertype)
      ->paginate($request->count);
  }

  public function upcoming(Request $request)
  {
    $currentDate = new DateTime();

    return Tournament::where('date', '>', $currentDate)
      ->orderBy($request->orderby, $request->ordertype)
      ->get();
  }

  public function show($slug)
  {
    return Tournament::with('ticket')
      ->where('slug', $slug)
      ->first();
  }
}
