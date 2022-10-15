with b as (
    select offense_category,
        neighborhood,
        sum(value) as _2022
    from {{ ref('app_nhood_view') }}
    where year = 2022
    group by offense_category,
        neighborhood
),
a as (
    select offense_category,
        neighborhood,
        sum(value) as _2021
    from {{ ref('app_nhood_view') }}
    where year = 2021
    group by offense_category,
        neighborhood
)
select b.neighborhood
    , b.offense_category
    , b._2022
    , coalesce(a._2021, 0) as _2021
from b
left join a as a on a.neighborhood = b.neighborhood and a.offense_category = b.offense_category
