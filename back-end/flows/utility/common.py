"""Common functions needed to process Atlanta crime data"""


def create_db_connection(user, password, host, port, db):
    """Creates connection to PostgreSQL database"""
    import psycopg2
    from sqlalchemy import create_engine

    return create_engine(f"postgresql://{user}:{password}@{host}:{port}/{db}")


def format_columns(df):
    """Transforms the column headers of a pandas dataframe"""

    cols = [_.lower() for _ in df.columns]

    return cols


def insert_data(conn, df, table, schema):
    print(f"populating {schema}.{table}")
    df.to_sql(table, conn, index=False, if_exists="append", schema=schema)


def load_df_from_adls(connection_string, container, blob):
    """Downloads a blob from an ADLS container and populates a Pandas dataframe"""
    from utility.blobby import Blobby
    from io import BytesIO
    from pandas import read_csv

    bby = Blobby(connection_string=connection_string, container=container)
    blob_content = bby.download_blob(blob=blob)

    return read_csv(BytesIO(blob_content), compression="zip")


def load_env():
    """Loads environment variables from .env"""
    import os
    from dotenv import find_dotenv, load_dotenv

    load_dotenv(find_dotenv())
    connection_string = os.environ.get("CONNECTION_STRING")
    host = os.environ.get("POSTGRES_HOST")
    db = os.environ.get("POSTGRES_DB")
    port = os.environ.get("POSTGRES_PORT")
    user = os.environ.get("POSTGRES_USER")
    password = os.environ.get("POSTGRES_PASSWORD")

    return connection_string, host, db, port, user, password


def get_epoch() -> int:
    """Get the Unix epoch value at runtime"""
    import datetime
    from datetime import timezone

    dt = datetime.datetime.now(timezone.utc)
    epoch = int(dt.replace(tzinfo=timezone.utc).timestamp())
    return epoch


def add_file_name_column(df, file_name: str) -> None:
    """Add a file name column to a dataframe"""
    df.loc[:, "file_name"] = file_name


def add_loaded_at(df, col_name: str = "loaded_at"):
    """Adds a loaded_at column to a Pandas DataFrame representing the current UTC timestamp."""
    import pandas as pd

    df.loc[:, col_name] = pd.Timestamp.utcnow()


def set_path(dir: str):
    """Sets the path"""
    from pathlib import Path

    return Path(dir)


def get_csvs(path, dir: str = "reference"):
    """Get a list of csv files from a given directory"""

    p = path / dir

    return p.glob("*.csv")
