from statistics import mode
from sqlalchemy.orm import Session

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
        db.query(
            Crime.id,
            Crime.date_id,
            OccurenceDate.date,
            OccurenceDate.day_name,
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

    return query.offset(skip).limit(limit).all()
