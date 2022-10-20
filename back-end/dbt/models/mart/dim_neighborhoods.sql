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
        lower(npu) as npu,
        case 
            when lower(neighborhood) = 'wildwood' then neighborhood || ' (NPU-' || upper(npu) || ')'
            else neighborhood
        end as display_name
    from b
)
select neighborhood as id,
    neighborhood,
    npu,
    display_name,
    {{ created_at() }}
from de_dupe
where neighborhood not in (
    'englewood manor', -- mapped to chosewood park
    'westmont estates', -- mapped to oakland city
    'rosalie h. wright community council' -- unsure what this is
)