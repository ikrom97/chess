<?php

namespace Database\Seeders;

use App\Models\Player;
use Goutte\Client;
use Illuminate\Database\Seeder;

class PlayersSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $urls = [
      'https://www.chess.com/players',
      'https://www.chess.com/players?page=2',
      'https://www.chess.com/players?page=3',
      'https://www.chess.com/players?page=4',
    ];

    foreach ($urls as $key => $value) {
      $client = new Client();
      $page = $client->request('GET', $urls[$key]);

      $page->filter('.post-author-component')->each(function ($item) {
        $avatar = $item->filter('img')->getNode(0)->getAttribute('data-src');
        $avatar === "" && $avatar =  $item->filter('img')->getNode(0)->getAttribute('src');
        if ($item->filter('.master-players-world-stats')->getNode(0)) {
          $this->stats = $item->filter('.master-players-world-stats')->text();
        }

        $player = new Player();
        $player->name = $item->filter('.post-author-name')->text();
        $player->avatar = $avatar;
        $player->rating = (int)substr($this->stats, 0, 4);
        $player->rank = (int)explode('#', $this->stats, 2)[1];
        $player->title = $item->filter('.master-players-chess-title')->text();
        $player->country = $item->filter('.post-author-meta')->text();
        if ($player->country == 'Russia') {
          $player->flag = 'https://countryflagsapi.com/png/rus';
        } else if ($player->country == 'FIDE') {
          $player->flag = '//upload.wikimedia.org/wikipedia/en/thumb/5/5b/Fidelogo.svg/133px-Fidelogo.svg.png?20110815110418';
        } else {
          $player->flag = 'https://countryflagsapi.com/png/' . $player->country;
        }
        $player->global = true;
        $player->save();
      });
    }

    $client = new Client();
    $page = $client->request('GET', 'https://www.chess.com/ratings/standard/TJ');

    $page->filter('tbody tr')->each(function ($item) {
      $player = new Player();
      $player->name = $item->filter('.master-players-rating-username')->text();
      $player->avatar = '/images/avatar.webp';
      $player->rating = (int)$item->filter('.master-players-rating-player-rank')->text();
      $player->rank = (int)ltrim($item->filter('.master-players-rating-rank')->text(), '#');
      $item->filter('.user-chess-title')->getNode(0) &&
        $player->title = $item->filter('.user-chess-title')->text();
      $player->country = 'Tajikistan';
      $player->flag = 'https://countryflagsapi.com/png/tj';
      $player->global = false;
      $player->save();
    });
  }
}
