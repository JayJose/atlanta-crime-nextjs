FROM python:3.9

WORKDIR /usr/src/app

ENV dbt_dir dbt

RUN pip install --upgrade pip

RUN pip install dbt-postgres

RUN mkdir ./${dbt_dir}

COPY . ./${dbt_dir}

WORKDIR /usr/src/app/${dbt_dir}

ENTRYPOINT [ "bash" ]
# CMD ["go_dbt.sh"]