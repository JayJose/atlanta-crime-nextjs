with cutoff as (
    select day_of_year
    from {{ ref('dim_dates') }}
    where date = '2022-08-15'
)
select n.neighborhood,
    o.offense,
    o.offense_category,
    d.year,
    d.month,
    d.month_name_abbreviated,
    count(f.crime_tk)
from {{ ref('dim_dates') }} as d
    inner join {{ ref('fct_crimes') }} as f on f.date_id = d.id
    inner join cutoff as c on d.day_of_year <= c.day_of_year
    inner join {{ ref('dim_offenses') }} as o on o.id = f.offense_id
    inner join {{ ref('dim_neighborhoods') }} as n on n.id = f.neighborhood_id
where d.year in (2021, 2022)
group by n.neighborhood,
    o.offense,
    o.offense_category,
    d.year,
    d.month,
    d.month_name_abbreviated