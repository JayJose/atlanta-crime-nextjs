{{ config(
    post_hook=[
      "ALTER TABLE {{this}} ADD PRIMARY KEY (id);"
    ]
) }}

with b as (
    select * from {{ ref('offenses') }}
)
select ibr_code as id,
    ibr_code,
    uc2_literal,
    offense_category,
    offense,
    crime_against,
    {{ created_at() }}
from b