with c as (
    select *
    from {{ ref('stg_crimes') }}
)
select c.*,
    o.offense_category,
    o.offense,
    o.crime_against
from c as c
    left join {{ ref('offenses') }} as o on o.ibr_code = c.ibr_code