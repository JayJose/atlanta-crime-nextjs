with b as (
    select offense,
        neighborhood,
        sum(value) as _2022
    from {{ ref('app_nhood_view') }}
    where year = 2022
    group by offense,
        neighborhood
),
a as (
    select offense,
        neighborhood,
        sum(value) as _2021
    from {{ ref('app_nhood_view') }}
    where year = 2021
    group by offense,
        neighborhood
)
select b.neighborhood
    , b.offense
    , b._2022
    , coalesce(a._2021, 0) as _2021
from b
left join a as a on a.neighborhood = b.neighborhood and a.offense = b.offense
