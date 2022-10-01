from statistics import mode
from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.sql.expression import literal


from typing import List
from datetime import date

from crime.models import Neighborhood, Offense, Crime, OccurenceDate


def get_neighborhoods(db: Session, skip: int, limit: int):
    """GETs a list of neighborhoods"""
    query = db.query(
        Neighborhood.id,
        Neighborhood.neighborhood,
        Neighborhood.npu,
        Neighborhood.created_at,
    ).order_by(Neighborhood.neighborhood)

    return query.all()


def get_offenses(db: Session, skip: int, limit: int):
    """GETs a list of offenses"""
    query = (
        db.query(
            Offense.id,
            Offense.ibr_code,
            Offense.offense_category,
            Offense.offense,
            Offense.crime_against,
            Offense.created_at,
        )
        .order_by(Offense.offense_category)
        .order_by(Offense.offense)
    )

    return query.all()


def get_dates(start_date: date, stop_date: date, db: Session, skip: int, limit: int):
    """GETs a list of offenses"""
    query = db.query(
        OccurenceDate.id,
        OccurenceDate.date,
        OccurenceDate.day_name,
        OccurenceDate.day_of_week,
        OccurenceDate.day_of_year,
        OccurenceDate.month,
        OccurenceDate.month_name,
        OccurenceDate.quarter,
        OccurenceDate.year,
        OccurenceDate.created_at,
    ).filter(OccurenceDate.date.between(start_date, stop_date))

    return query.offset(skip).limit(limit).all()


def get_crimes(start_date: date, stop_date: date, db: Session, skip: int, limit: int):
    """GETs a list of crimes"""
    query = (
        db.query(
            Crime.id,
            Crime.date_id,
            OccurenceDate.date,
            OccurenceDate.day_name,
            OccurenceDate.day_of_week,
            Crime.beat,
            Crime.zone,
            Crime.neighborhood_id,
            Neighborhood.neighborhood,
            Neighborhood.npu,
            Crime.address,
            Crime.latitude,
            Crime.longitude,
            Crime.offense_id,
            Offense.crime_against,
            Offense.offense_category,
            Offense.offense,
            Crime.created_at,
        )
        .filter(OccurenceDate.date.between(start_date, stop_date))
        .join(Offense, Offense.id == Crime.offense_id)
        .join(OccurenceDate, OccurenceDate.id == Crime.date_id)
        .join(Neighborhood, Neighborhood.id == Crime.neighborhood_id)
    )

    return query.offset(skip).limit(limit).all()


def get_crimes_by_neighborhood_id(
    neighborhood_id: str,
    start_date: date,
    stop_date: date,
    db: Session,
    skip: int,
    limit: int,
):
    """GETs a list of crimes for a specific neighborhood"""
    query = (
        (
            db.query(
                Crime.id,
                Crime.date_id,
                OccurenceDate.date,
                OccurenceDate.day_name,
                OccurenceDate.day_of_week,
                Crime.beat,
                Crime.zone,
                Crime.neighborhood_id,
                Neighborhood.neighborhood,
                Neighborhood.npu,
                Crime.address,
                Crime.latitude,
                Crime.longitude,
                Crime.offense_id,
                Offense.crime_against,
                Offense.offense_category,
                Offense.offense,
                Crime.created_at,
            )
            .filter(OccurenceDate.date.between(start_date, stop_date))
            .filter(Crime.neighborhood_id == neighborhood_id)
            .join(Offense, Offense.id == Crime.offense_id)
            .join(OccurenceDate, OccurenceDate.id == Crime.date_id)
            .join(Neighborhood, Neighborhood.id == Crime.neighborhood_id)
        )
        .order_by(Offense.offense)
        .order_by(OccurenceDate.day_of_week)
    )

    return query.offset(skip).limit(limit).all()


#### AGGREGATED QUERIES
def get_crimes_by_year_and_neighborhood(
    # start_date: date,
    # stop_date: date,
    db: Session,
    skip: int,
    limit: int,
):
    """GETs a list of crimes for a specific neighborhood"""
    query = (
        (
            db.query(
                Neighborhood.neighborhood,
                OccurenceDate.year,
                func.count(Crime.id).label("value"),
            )
            .select_from(Neighborhood)
            .join(OccurenceDate, literal(True))
            .join(
                Crime,
                (Crime.neighborhood_id == Neighborhood.id)
                & (Crime.date_id == OccurenceDate.id),
                isouter=True,
            )
            .filter(OccurenceDate.year.between(2021, 2022))
        )
        .group_by(Neighborhood.neighborhood, OccurenceDate.year)
        .order_by(Neighborhood.neighborhood)
        .order_by(OccurenceDate.year)
    )

    return query.offset(skip).limit(limit).all()
