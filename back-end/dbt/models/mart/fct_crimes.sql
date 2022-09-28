{{ config(
    post_hook=[
      "ALTER TABLE {{this}} ADD PRIMARY KEY (id);"
      "ALTER TABLE {{this}} ADD FOREIGN KEY (offense_id) REFERENCES {{ ref('dim_offenses') }};"
      "ALTER TABLE {{this}} ADD FOREIGN KEY (neighborhood_id) REFERENCES {{ ref('dim_neighborhoods') }};" 
      "ALTER TABLE {{this}} ADD FOREIGN KEY (date_id) REFERENCES {{ ref('dim_dates') }};"         
    ]
) }}

with b as (
    select * from {{ ref('int_crimes') }}
)
select crime_tk as id, /*TODO: resolve this naming*/
    crime_tk,
    occur_date as date_id, /*TODO: resolve this naming*/
    beat,
    zone,
    neighborhood as neighborhood_id, /*TODO: resolve this naming*/
    neighborhood,
    npu,
    address,
    latitude,
    longitude,
    ibr_code as offense_id, /*TODO: resolve this naming*/
    offense_category,
    offense,
    crime_against,
    {{ created_at() }}
from b