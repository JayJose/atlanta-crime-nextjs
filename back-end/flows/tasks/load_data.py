def load_data():
    """
    Load Atlanta crime data into a relational database.

    Parameters: None.

    Returns: None.
    """

    from utility.common import (
        create_db_connection,
        insert_data,
        format_columns,
        add_file_name_column,
        add_loaded_at,
    )

    from config.config import settings

    import pandas as pd

    from pathlib import Path

    try:

        conn = create_db_connection(
            settings.POSTGRES_USER,
            settings.POSTGRES_PASSWORD,
            settings.POSTGRES_HOST,
            settings.POSTGRES_PORT,
            settings.POSTGRES_DB,
        )

        p = Path("data")
        datasets = list(p.rglob("*.csv"))

        for dataset in datasets:
            print(f"processing dataset {dataset}")

            df = pd.read_csv(dataset)
            df.columns = format_columns(df)
            add_file_name_column(df, dataset.stem)
            add_loaded_at(df)

            insert_data(
                conn=conn, df=df, table=settings.CRIME_TABLE, schema=settings.RAW_SCHEMA
            )
            print(
                f"Successfully loaded crime data to {settings.POSTGRES_DB}.{settings.RAW_SCHEMA}.{settings.CRIME_TABLE}"
            )
    except Exception as err:
        print(
            f"Unable to load crime data to {settings.POSTGRES_DB}.{settings.RAW_SCHEMA}.{settings.CRIME_TABLE}"
        )
        print(err)
