<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */

  /**
   * Get auth status
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function check()
  {
    $user = auth()->user();

    if (!$user) {
      return response(['error' => 'Вы не вошли в систему или у вас нет доступа к этой странице.'], 401);
    }

    return response(['message' => 'Авторизованный пользователь'], 200);
  }

  /**
   * Get a JWT via given credentials.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login()
  {
    $credentials = request(['email', 'password']);

    $user = User::where('email', '=', request('email'))->first();

    if (!$user) {
      return response(['error' => 'Неверный логин'], 400);
    }

    if (!Hash::check(request('password'), $user->password)) {
      return response(['error' => 'Неверный пароль'], 400);
    }

    if (!$token = auth()->attempt($credentials)) {
      return response(['error' => 'Вы не вошли в систему или у вас нет доступа к этой странице.'], 401);
    }

    return response([
      'token' => $token,
      'message' => "Вы успешно вошли в систему."
    ], 200);
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    auth()->logout();

    return response()->json(['message' => 'Вы успешно вышли из системы.'], 200);
  }
}
