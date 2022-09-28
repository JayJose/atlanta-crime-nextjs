def truncate_data():
    """
    Truncates a table in a database.

    Parameters: None

    Returns: None.
    """
    import psycopg2

    from config.config import settings

    try:
        conn = psycopg2.connect(
            database=settings.POSTGRES_DB,
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_HOST,
            port=settings.POSTGRES_PORT,
        )

        cursor = conn.cursor()

        sql = f"TRUNCATE TABLE {settings.RAW_SCHEMA}.{settings.CRIME_TABLE}"

        cursor.execute(sql)

        conn.commit()
        conn.close()

        print(f"Successfully truncated {settings.RAW_SCHEMA}.{settings.CRIME_TABLE}")

    except Exception as err:
        print(f"Unable to truncate {settings.RAW_SCHEMA}.{settings.CRIME_TABLE}. {err}")
