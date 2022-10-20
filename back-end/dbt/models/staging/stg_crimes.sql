with b as (
    select *,
        row_number() over (partition by offense_id order by rpt_date) as id
    from {{ source('raw', 'crimes') }}
)
select md5(offense_id || lower(ibr_code)) as crime_tk,
    offense_id,
    cast(rpt_date as date) as rpt_date,
    cast(occur_date as date) as occur_date,
    lower(occur_day) as occur_day,
    occur_day_num,
    occur_time,
    cast(poss_date as date) as poss_date,
    poss_time,
    beat,
    zone,
    lower(coalesce(location, 'none')) as address,
    lower(ibr_code) as ibr_code,
    lower(uc2_literal) as uc2_literal,
    case
        when lower(neighborhood) = 'englewood manor' then 'chosewood park'
        when lower(neighborhood) = 'westmont estates' then 'oakland city'
        else lower(coalesce(neighborhood, 'none'))
    end as neighborhood,
    case
        when lower(neighborhood) = 'custer/mcdonough/guice' then 'w'
        else lower(coalesce(npu, 'none'))
    end as npu,
    cast(lat as decimal) as latitude,
    cast("long" as decimal) as longitude,
    file_name,
    loaded_at
from b
where id = 1
    and cast(occur_date as date) >= '2021-01-01'