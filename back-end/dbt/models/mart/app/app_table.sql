with b as (
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
select b.neighborhood
    , b.offense_category
    , b._2022
    , coalesce(a._2021, 0) as _2021
from b
left join a as a
    on a.neighborhood = b.neighborhood
    and a.offense_category = b.offense_category
