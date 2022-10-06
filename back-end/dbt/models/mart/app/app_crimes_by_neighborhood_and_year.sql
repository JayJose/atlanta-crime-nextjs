select n.neighborhood,
    d.year,
    count(crime_tk) as crimes
from {{ ref('dim_neighborhoods') }} as n
inner join {{ref('dim_dates')}} as d on 1 = 1
left join {{ ref('fct_crimes') }}  as f
    on f.neighborhood_id = n.id
    and f.date_id = d.id
where d.year in (2021, 2022)
group by n.neighborhood,
    d.year