--- for each neighborhood, each week_of_year, each offense...

with cutoff as (
    select day_of_year
    from {{ ref('dim_dates') }}
    where date = '2022-09-30'
),
neighborhoods as (
    select distinct neighborhood from {{ ref('dim_neighborhoods') }}
),
offenses as (
    select distinct offense from {{ ref('dim_offenses') }}
),
periods as (
    select d.year,
        d.week_of_year,
        d.id as date
    from {{ ref('dim_dates') }} as d
        inner join cutoff as c on d.day_of_year <= c.day_of_year
    where d.year in (2021, 2022)
),
dense as (
    select *
    from neighborhoods
    cross join offenses
    cross join periods
)
select d.neighborhood,
    d.offense,
    d.year,
    d.week_of_year,
    count(distinct f.crime_tk) as value
from dense as d
left join {{ ref('fct_crimes') }} as f
    on f.neighborhood = d.neighborhood
    and f.offense = d.offense
    and f.date_id = d.date
group by d.neighborhood,
    d.offense,
    d.year,
    d.week_of_year
