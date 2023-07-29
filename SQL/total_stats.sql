CREATE OR REPLACE VIEW FANTASY_FOOTBALL.total_stats AS
SELECT pl.player_name, 
	pl.year,
    pl.team,
    pl.age,
    pl.position,
    pl.games_played,
    pl.games_started,
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
    (re.fumbles + ru.fumbles) / 2 AS total_fumbles,
    ru.rushing_attempts,
    ru.rushing_yards,
    ru.rushing_tds,
    ru.rushing_first_downs,
    ru.longest_rush,
    ru.yards_per_attempt,
    ru.yards_per_game,
    ru.rushing_yards + re.receiving_yards as total_yards,
    ru.rushing_tds + re.receiving_tds as total_tds,
    (re.receptions + (re.receiving_yards * 0.1) + (re.receiving_tds * 6) + (ru.rushing_yards * 0.1) + (ru.rushing_tds * 6)) as ppr_total_points
FROM FANTASY_FOOTBALL.players pl
LEFT OUTER JOIN FANTASY_FOOTBALL.receiving re on pl.player_id = re.player_id AND pl.year = re.year
LEFT OUTER JOIN FANTASY_FOOTBALL.rushing ru on pl.player_id = ru.player_id and pl.year = ru.year
ORDER BY ppr_total_points desc;