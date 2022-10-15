with cutoff as (
    select day_of_year
    from {{ ref('dim_dates') }}
    where date = '2022-09-30'
)
select n.neighborhood,
    o.crime_against,
    o.offense_category,
    o.offense,
    d.year,
    count(f.id) as value
from {{ ref('dim_dates') }} as d
    inner join {{ ref('fct_crimes') }} as f on f.date_id = d.id
    inner join cutoff as c on d.day_of_year <= c.day_of_year
    inner join {{ ref('dim_offenses') }} as o on o.id = f.offense_id
    inner join {{ ref('dim_neighborhoods') }} as n on n.id = f.neighborhood_id
where d.year in (2021, 2022)
group by n.neighborhood,
    o.crime_against,
    o.offense_category,
    o.offense,
    d.year