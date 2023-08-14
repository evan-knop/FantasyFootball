/* Player Rankings View */
CREATE OR REPLACE VIEW FANTASY_FOOTBALL.player_rankings AS
SELECT
    player_name,
    position,
	MAX(CASE WHEN Year = 2017 THEN half_ppr_pos_rank END) AS PosRank2017,
    MAX(CASE WHEN Year = 2018 THEN half_ppr_pos_rank END) AS PosRank2018,
    MAX(CASE WHEN Year = 2019 THEN half_ppr_pos_rank END) AS PosRank2019,
    MAX(CASE WHEN Year = 2020 THEN half_ppr_pos_rank END) AS PosRank2020,
    MAX(CASE WHEN Year = 2021 THEN half_ppr_pos_rank END) AS PosRank2021,
    MAX(CASE WHEN Year = 2022 THEN half_ppr_pos_rank END) AS PosRank2022
FROM
	FANTASY_FOOTBALL.total_stats
GROUP BY
    player_name, position;