<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Tournament;
use Cviebrock\EloquentSluggable\Services\SlugService;
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

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required',
      'image' => 'required',
      'date' => 'required',
      'content' => 'required',
    ]);

    $tournament = new Tournament();
    $tournament->title = $request->title;
    $tournament->slug = SlugService::createSlug(Tournament::class, 'slug', $request->title);

    $file = $request->file('image');
    $fileName = $tournament->slug . '.' . $file->extension();
    $file->move(public_path('images/tournaments'), $fileName);
    $tournament->image = 'images/tournaments/' . $fileName;
    $tournament->thumb_image = 'images/tournaments/' . $fileName;

    $tournament->date = new DateTime($request->date);
    $tournament->content = $request->content;
    $save = $tournament->save();

    $ticket = new Ticket();
    $ticket->address = $request->address;
    $ticket->tel_1 = $request->tel_1;
    $ticket->tel_2 = $request->tel_2;
    $ticket->email_1 = $request->email_1;
    $ticket->email_2 = $request->email_2;
    $ticket->tournament_id = $tournament->id;
    $ticket->save();

    if ($save) {
      return response([
        'message' => 'Данные успешно сохранены',
        'tournament' => $tournament,
      ], 200);
    }

    return response(['error' => 'Перепроверьте данные'], 400);
  }

  public function update(Request $request)
  {
    $request->validate([
      'title' => 'required',
      'date' => 'required',
      'content' => 'required',
    ]);

    $tournament = Tournament::find($request->id);
    $tournament->title = $request->title;

    if ($request->file('image')) {
      file_exists($tournament->image) &&  unlink($tournament->image);

      $file = $request->file('image');
      $fileName = uniqid() . '.' . $file->extension();
      $file->move(public_path('images/tournaments'), $fileName);
      $tournament->image = 'images/tournaments/' . $fileName;
      $tournament->thumb_image = 'images/tournaments/' . $fileName;
    }

    $tournament->date = new DateTime($request->date);
    $tournament->content = $request->content;
    $update = $tournament->update();

    $ticket = Ticket::where('tournament_id', $tournament->id)->first();
    $ticket->address = $request->address;
    $ticket->tel_1 = $request->tel_1;
    $ticket->tel_2 = $request->tel_2;
    $ticket->email_1 = $request->email_1;
    $ticket->email_2 = $request->email_2;
    $ticket->update();

    if ($update) {
      return response([
        'message' => 'Данные успешно сохранены',
        'tournament' => Tournament::with('ticket')->find($tournament->id),
      ], 200);
    }

    return response(['error' => 'Перепроверьте данные'], 400);
  }

  public function delete(Request $request)
  {
    if (count($request->ids) == 0) {
      $tournaments = Tournament::get();

      foreach ($tournaments as $tournament) {
        file_exists($tournament->image) &&  unlink($tournament->image);

        $ticket = Ticket::where('tournament_id', $tournament->id)->first();
        $ticket->delete();
        $tournament->delete();
      }
    }

    try {
      foreach ($request->ids as $id) {
        $tournament = Tournament::find($id);
        file_exists($tournament->image) &&  unlink($tournament->image);

        $ticket = Ticket::where('tournament_id', $tournament->id)->first();
        $ticket->delete();
        $tournament->delete();
      }
      return response(['message' => 'Данные успешно удалены'], 200);
    } catch (\Throwable $th) {
      return response(['error' => 'Что то пошло не так'], 400);
    }
  }
}
