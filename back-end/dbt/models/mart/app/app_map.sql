{{ config(
    post_hook=[
      "DROP INDEX IF EXISTS ix_map_neighborhood;"
      "CREATE INDEX ix_map_neighborhood ON {{this}} (neighborhood);"
    ]
) }}

with cutoff as (
    select d.day_of_year
    from {{ ref('dim_dates') }} as d
        inner join {{ ref('app_cutoff') }} as c on c.cutoff_date = d.date
)
select n.neighborhood,
    o.offense,
    o.offense_category,
    d.year,
    d.month,
    d.month_name_abbreviated,
    d.week_of_year,
    cast(d.date as varchar(50)) as date,
    f.latitude,
    f.longitude
from {{ ref('dim_dates') }} as d
    inner join {{ ref('fct_crimes') }} as f on f.date_id = d.id
    inner join cutoff as c on d.day_of_year <= c.day_of_year
    inner join {{ ref('dim_offenses') }} as o on o.id = f.offense_id
    inner join {{ ref('dim_neighborhoods') }} as n on n.id = f.neighborhood_id
where d.year in (2021, 2022)