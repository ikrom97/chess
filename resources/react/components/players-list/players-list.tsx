import { Players } from '../../types/player';
import PlayerCard from '../player-card/player-card';

type PlayersListProps = {
  players: Players;
}

function PlayersList({ players }: PlayersListProps): JSX.Element {
  return (
    <ol className="players-list">
      {Array.from(players, (player) => (
        <li className="players-list__item" key={player.id}>
          <PlayerCard player={player} />
        </li>
      ))}
    </ol>
  );
}

export default PlayersList;
