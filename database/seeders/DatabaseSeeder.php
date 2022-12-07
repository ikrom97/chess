<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    User::create([
      'name' => 'Content Manager',
      'email' => 'admin@chess.tj',
      'password' => bcrypt('FYDw6tkH'),
    ]);

    $this->call([
      NewsSeeder::class,
      ArticlesSeeder::class,
      PlayersSeeder::class,
      TicketsSeeder::class,
      TournamentsSeeder::class,
    ]);
  }
}
