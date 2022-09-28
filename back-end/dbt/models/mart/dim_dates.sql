{{ config(
    post_hook=[
      "ALTER TABLE {{this}} ADD PRIMARY KEY (id);"   
    ]
) }}

with b as (
    select * from {{ source('reference', 'dim_dates') }}
)
select date_actual as id,
    date_actual as date,
    day_suffix,
    day_name,
    day_of_week,
    day_of_month,
    day_of_quarter,
    day_of_year,
    week_of_month,
    week_of_year,
    month_actual as month,
    month_name,
    month_name_abbreviated,
    quarter_actual as quarter,
    year_actual as year,
    {{ created_at() }}
from b