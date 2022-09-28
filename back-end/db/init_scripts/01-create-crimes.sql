drop table if exists raw.crimes;

create table raw.crimes (
    offense_id varchar(100) null,
    rpt_date varchar(100) null,
    occur_date varchar(100) null,
    occur_day varchar(100) null,
    occur_day_num varchar(100) null,
    occur_time varchar(100) null,
    poss_date varchar(100) null,
    poss_time varchar(100) null,
    beat varchar(100) null,
    zone varchar(100) null,
    location varchar(100) null,
    ibr_code varchar(100) null,
    uc2_literal varchar(100) null,
    neighborhood varchar(100) null,
    npu varchar(100) null,
    lat varchar(100) null,
    long varchar(100) null,
    file_name varchar(100) null,
    loaded_at timestamp not null
);