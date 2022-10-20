with cutoff as (
    select d.day_of_year
    from {{ ref('dim_dates') }} as d
        inner join {{ ref('app_cutoff') }} as c on c.cutoff_date = d.date
), categories as (
    select distinct offense_category from {{ ref('dim_offenses') }}
    union all
    select 'all' as offense_category
),
neighborhoods as (
    select distinct neighborhood from {{ ref('dim_neighborhoods') }}
    union all
    select 'all' as neighborhood
),
dense as (
    select *
    from neighborhoods
    cross join categories
),
counts as (
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
),
b as (
    select coalesce(offense_category, 'all') as offense_category,
        neighborhood,
        sum(value) as _2022
    from counts
    where year = 2022
    group by neighborhood,
    rollup (offense_category)
    union all
    select coalesce(offense_category, 'all'),
        'all' as neighborhood,
        sum(value) as _2022
    from counts
    where year = 2022
    group by rollup (offense_category)
),
a as (
    select coalesce(offense_category, 'all') as offense_category,
        neighborhood,
        sum(value) as _2021
    from counts
    where year = 2021
    group by neighborhood,
    rollup (offense_category)
    union all
    select coalesce(offense_category, 'all'),
        'all' as neighborhood,
        sum(value) as _2021
    from counts
    where year = 2021
    group by rollup (offense_category)
)
select d.neighborhood
    , d.offense_category
    , coalesce(b._2022, 0) as _2022
    , coalesce(a._2021, 0) as _2021
from dense as d
left join b
    on b.neighborhood = d.neighborhood
    and b.offense_category = d.offense_category
left join a as a
    on a.neighborhood = d.neighborhood
    and a.offense_category = d.offense_category
