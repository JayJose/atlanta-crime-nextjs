with max_date as (
select max(d.date) as max_date
from {{ ref('fct_crimes') }} as f
  inner join {{ ref('dim_dates') }} as d on d.id = f.date_id
)
select max_date
  , max_date + INTERVAL '-7 day' as cutoff_date
from max_date