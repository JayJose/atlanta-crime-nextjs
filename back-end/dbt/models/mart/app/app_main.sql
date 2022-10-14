with cutoff as (
    select day_of_year
    from {{ ref('dim_dates') }}
    where date = '2022-09-30'
)
select d.year,
    n.neighborhood,
    o.offense,
    count(f.crime_tk) as value
from {{ ref('dim_dates') }} as d
    inner join {{ ref('fct_crimes') }} as f on f.date_id = d.id
    inner join cutoff as c on d.day_of_year <= c.day_of_year
    inner join {{ ref('dim_offenses') }} as o on o.id = f.offense_id
    inner join {{ ref('dim_neighborhoods') }} as n on n.id = f.neighborhood_id
where d.year in (2021, 2022)
group by d.year,
    n.neighborhood,
    o.offense
UNION
select d.year,
    'all' as neighborhood,
    o.offense,
    count(f.crime_tk) as value
from {{ ref('dim_dates') }} as d
    inner join {{ ref('fct_crimes') }} as f on f.date_id = d.id
    inner join cutoff as c on d.day_of_year <= c.day_of_year
    inner join {{ ref('dim_offenses') }} as o on o.id = f.offense_id
    inner join {{ ref('dim_neighborhoods') }} as n on n.id = f.neighborhood_id
where d.year in (2021, 2022)
group by d.year,
    o.offense
