<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Cviebrock\EloquentSluggable\Services\SlugService;
use DateTime;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
  public function index(Request $request)
  {
    return Article::orderBy($request->sort, $request->order)
      ->paginate($request->count);
  }

  public function show($slug)
  {
    return Article::select('id', 'image', 'thumb_image', 'date', 'title', 'content', 'slug')
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

    $article = new Article();
    $article->title = $request->title;
    $article->slug = SlugService::createSlug(Article::class, 'slug', $request->title);

    $file = $request->file('image');
    $fileName = $article->slug . '.' . $file->extension();
    $file->move(public_path('images/articles'), $fileName);
    $article->image = 'images/articles/' . $fileName;
    $article->thumb_image = 'images/articles/' . $fileName;

    $article->date = new DateTime($request->date);
    $article->content = $request->content;
    $save = $article->save();

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

    $article = Article::find($request->id);
    $article->title = $request->title;

    if ($request->file('image')) {
      file_exists($article->image) &&  unlink($article->image);

      $file = $request->file('image');
      $fileName = uniqid() . '.' . $file->extension();
      $file->move(public_path('images/articles'), $fileName);
      $article->image = 'images/articles/' . $fileName;
      $article->thumb_image = 'images/articles/' . $fileName;
    }

    $article->date = new DateTime($request->date);
    $article->content = $request->content;
    $update = $article->update();

    if ($update) {
      return response([
        'message' => 'Данные успешно сохранены',
        'article' => Article::find($article->id),
      ], 200);
    }

    return response(['error' => 'Перепроверьте данные'], 400);
  }

  public function delete(Request $request)
  {
    if (count($request->ids) == 0) {
      $articles = Article::get();

      foreach ($articles as $article) {
        file_exists($article->image) &&  unlink($article->image);
        $article->delete();
      }
    }

    try {
      foreach ($request->ids as $id) {
        $article = Article::find($id);
        file_exists($article->image) &&  unlink($article->image);
        $article->delete();
      }
      return response(['message' => 'Данные успешно удалены'], 200);
    } catch (\Throwable $th) {
      return response(['error' => 'Что то пошло не так'], 400);
    }
  }
}
