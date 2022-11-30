<?php

namespace App\Http\Controllers;

use App\Models\News;
use Cviebrock\EloquentSluggable\Services\SlugService;
use DateTime;
use Illuminate\Http\Request;

class NewsController extends Controller
{
  public function index(Request $request)
  {
    $keyword = $request->keyword;
    if ($keyword) {
      return News::orderBy($request->sort, $request->order)
        ->where('title', 'like', '%' . $keyword . '%')
        ->orWhere('content', 'like', '%' . $keyword . '%')
        ->paginate($request->count);
    }

    return News::orderBy($request->sort, $request->order)
      ->paginate($request->count);
  }

  public function show($slug)
  {
    return News::where('slug', $slug)->first();
  }

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required',
      'image' => 'required',
      'date' => 'required',
      'content' => 'required',
    ]);

    $news = new News();
    $news->title = $request->title;
    $news->slug = SlugService::createSlug(News::class, 'slug', $request->title);

    $file = $request->file('image');
    $fileName = $news->slug . '.' . $file->extension();
    $file->move(public_path('images/news'), $fileName);
    $news->image = 'images/news/' . $fileName;
    $news->thumb_image = 'images/news/' . $fileName;

    $news->date = new DateTime($request->date);
    $news->content = $request->content;
    $save = $news->save();

    if ($save) {
      return response(['message' => 'Данные успешно сохранены'], 200);
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

    $news = News::find($request->id);
    $news->title = $request->title;

    if ($request->file('image')) {
      file_exists($news->image) &&  unlink($news->image);

      $file = $request->file('image');
      $fileName = uniqid() . '.' . $file->extension();
      $file->move(public_path('images/news'), $fileName);
      $news->image = 'images/news/' . $fileName;
      $news->thumb_image = 'images/news/' . $fileName;
    }

    $news->date = new DateTime($request->date);
    $news->content = $request->content;
    $update = $news->update();

    if ($update) {
      return response([
        'message' => 'Данные успешно сохранены',
        'news' => News::find($news->id),
      ], 200);
    }

    return response(['error' => 'Перепроверьте данные'], 400);
  }

  public function delete(Request $request)
  {
    if (count($request->ids) == 0) {
      $news = News::get();

      foreach ($news as $new) {
        file_exists($new->image) &&  unlink($new->image);
        $new->delete();
      }
    }

    try {
      foreach ($request->ids as $id) {
        $new = News::find($id);
        file_exists($new->image) &&  unlink($new->image);
        $new->delete();
      }
      return response(['message' => 'Данные успешно удалены'], 200);
    } catch (\Throwable $th) {
      return response(['error' => 'Что то пошло не так'], 400);
    }
  }
}
