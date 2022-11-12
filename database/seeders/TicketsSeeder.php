<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class TicketsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    foreach (range(1, 192) as $key) {
      Ticket::create([
        'address' => '734000, Республика Таджикистан, ул. Шамси 4 «Б»',
        'tel_1' => '+992 93 600 01 69',
        'tel_2' => '+992 98 862 49 00',
        'email_1' => 'info@tjchess.tj',
        'email_2' => 'marketing@tjchess.tj',
        'tournament_id' => $key,
      ]);
    }
  }
}
