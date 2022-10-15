with categories as (
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
b as (
    select coalesce(offense_category, 'all') as offense_category,
        neighborhood,
        sum(value) as _2022
    from {{ ref('app_nhood_view') }}
    where year = 2022
    group by neighborhood,
    rollup (offense_category)
    union all
    select coalesce(offense_category, 'all'),
        'all' as neighborhood,
        sum(value) as _2022
    from {{ ref('app_nhood_view') }}
    where year = 2022
    group by rollup (offense_category)
),
a as (
    select coalesce(offense_category, 'all') as offense_category,
        neighborhood,
        sum(value) as _2021
    from {{ ref('app_nhood_view') }}
    where year = 2021
    group by neighborhood,
    rollup (offense_category)
    union all
    select coalesce(offense_category, 'all'),
        'all' as neighborhood,
        sum(value) as _2022
    from {{ ref('app_nhood_view') }}
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
