from sqlalchemy import MetaData, Column, String, DateTime, Table, Numeric, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, Date

from database.database import Base

schema = "dev"  # TODO add .env ref


class Neighborhood(Base):
    __table__ = Table(
        "dim_neighborhoods",
        MetaData(schema=schema),
        Column("id", String, primary_key=True),
        Column("neighborhood", String, nullable=True),
        Column("npu", String, primary_key=True),
        Column("created_at", DateTime, nullable=True),
    )


class Offense(Base):
    __table__ = Table(
        "dim_offenses",
        MetaData(schema=schema),
        Column("id", String, primary_key=True),
        Column("ibr_code", String, nullable=True),
        Column("uc2_literal", String, primary_key=True),
        Column("offense_category", String, nullable=True),
        Column("offense", String, primary_key=True),
        Column("crime_against", String, primary_key=True),
        Column("created_at", DateTime, nullable=True),
    )


class OccurenceDate(Base):
    __table__ = Table(
        "dim_dates",
        MetaData(schema=schema),
        Column("id", String, primary_key=True),
        Column("date", Date, nullable=False),
        Column("day_suffix", String, nullable=False),
        Column("day_name", String, nullable=False),
        Column("day_of_week", Integer, nullable=False),
        Column("day_of_month", Integer, nullable=False),
        Column("day_of_quarter", Integer, nullable=False),
        Column("day_of_year", Integer, nullable=False),
        Column("month", Integer, nullable=True),
        Column("month_name", String, nullable=False),
        Column("quarter", Integer, nullable=False),
        Column("year", Integer, nullable=False),
        Column("created_at", DateTime, nullable=False),
    )


class Crime(Base):
    __table__ = Table(
        "fct_crimes",
        MetaData(schema=schema),
        Column("id", String, primary_key=True),
        Column("date_id", Date, nullable=False),
        Column("beat", String, nullable=True),
        Column("zone", String, nullable=True),
        Column("neighborhood_id", String, ForeignKey("dim_neighborhoods.id")),
        Column("address", String, nullable=True),
        Column("latitude", Numeric, nullable=True),
        Column("longitude", Numeric, nullable=True),
        Column("offense_id", String, ForeignKey("dim_offenses.id")),
        Column("created_at", DateTime, nullable=True),
    )
