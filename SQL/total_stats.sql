CREATE OR REPLACE VIEW FANTASY_FOOTBALL.total_stats AS
SELECT pl.player_name, 
	re.year,
    re.team,
    re.age,
    re.pos,
    re.games_played,
    re.games_started,
    re.targets,
    re.receptions,
    re.catch_pct,
    re.receiving_yards,
    re.yards_per_catch,
    re.receiving_tds,
    re.receiving_first_downs,
    re.longest_reception,
    re.yards_per_target,
    re.catches_per_game,
    re.receiving_yards_per_game,
    re.fumbles
FROM FANTASY_FOOTBALL.players pl
JOIN FANTASY_FOOTBALL.receiving re on pl.player_id = re.player_id
JOIN FANTASY_FOOTBALL.rushing ru on pl.player_id = ru.player_id AND ru.year = re.year
ORDER BY receiving_yards desc;

