--- for each neighborhood, each week_of_year, each offense...

with cutoff as (
    select d.day_of_year
    from {{ ref('dim_dates') }} as d
        inner join {{ ref('app_cutoff') }} as c on c.cutoff_date = d.date
),
neighborhoods as (
    select distinct neighborhood from {{ ref('dim_neighborhoods') }}
),
offenses as (
    select distinct offense, offense_category from {{ ref('dim_offenses') }}
),
periods as (
    select d.year,
        case
            when d.week_of_year = 53 and month = 1 then 1
            when d.week_of_year = 52 and month = 1 then 1
            else d.week_of_year end as week_of_year,
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
), final as (
select d.neighborhood,
    d.offense_category,
    d.year,
    d.week_of_year,
    count(distinct f.crime_tk) as value
from dense as d
left join {{ ref('fct_crimes') }} as f
    on f.neighborhood = d.neighborhood
    and f.offense = d.offense
    and f.date_id = d.date
group by d.neighborhood,
    d.offense_category,
    d.year,
    d.week_of_year
), final_hoods as (
select *,
    sum(value) OVER (partition by neighborhood, offense_category, year ORDER BY week_of_year) as cum_value
from final
-- TODO: need solution for this
where concat(year, '-', week_of_year) <> '2022-42'
)
select * from final_hoods
union all
select 'all' as neighborhood,
  offense_category,
  year,
  week_of_year,
  sum(value) as value,
  sum(cum_value) as cum_value
from final_hoods
group by offense_category,
  year,
  week_of_year
