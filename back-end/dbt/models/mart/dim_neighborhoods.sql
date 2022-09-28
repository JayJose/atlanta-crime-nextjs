{{ config(
    post_hook=[
      "ALTER TABLE {{this}} ADD PRIMARY KEY (neighborhood);"
    ]
) }}

with b as (
    select *
    from {{ ref('neighborhoods') }}
), de_dupe as (
    select
        case 
            when lower(neighborhood) = 'wildwood' then lower(neighborhood) || ' (npu-' || lower(npu) || ')'
            else lower(neighborhood)
        end as neighborhood,
        lower(npu) as npu
    from b
)
select neighborhood as id,
    neighborhood,
    npu,
    {{ created_at() }}
from de_dupe