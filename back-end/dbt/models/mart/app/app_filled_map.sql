with deps as (
    select * from {{ ref('app_trends') }}
)
select neighborhood,
    year,
    sum(value) as crimes
from deps
where year = 2022
and neighborhood <> 'all'
group by neighborhood,
    year