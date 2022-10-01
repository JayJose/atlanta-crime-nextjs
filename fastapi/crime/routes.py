from datetime import datetime, date
from fastapi import Depends, APIRouter, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database.database import get_db
from crime import schemas
from crime import crud

from config import settings

prefix = settings.prefix
router = APIRouter(prefix=f"{prefix}", tags=[prefix])
default_limit = Query(100, ge=1, le=50000)


@router.get("/neighborhoods", response_model=List[schemas.Neighborhood])
def get_neighborhoods(
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_neighborhoods(skip=skip, limit=limit, db=db)


@router.get("/offenses", response_model=List[schemas.Offense])
def get_offenses(
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_offenses(skip=skip, limit=limit, db=db)


@router.get("/dates", response_model=List[schemas.Date])
def get_dates(
    start_date: Optional[date] = "2020-01-01",
    stop_date: Optional[date] = date.today(),
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_dates(
        start_date=start_date, stop_date=stop_date, skip=skip, limit=limit, db=db
    )


@router.get("/crimes", response_model=List[schemas.Crime])
def get_crimes(
    start_date: Optional[date] = "2022-01-01",
    stop_date: Optional[date] = date.today(),
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_crimes(start_date, stop_date, skip=skip, limit=limit, db=db)


@router.get("/crimes/{neighborhood_id}", response_model=List[schemas.Crime])
def get_crimes_by_neighborhood_id(
    neighborhood_id: str,
    start_date: Optional[date] = "2022-01-01",
    stop_date: Optional[date] = date.today(),
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_crimes_by_neighborhood_id(
        neighborhood_id=neighborhood_id,
        start_date=start_date,
        stop_date=stop_date,
        skip=skip,
        limit=limit,
        db=db,
    )


#### AGGREGATED QUERIES
@router.get("/crimes/aggregated/year_and_neighborhood")
def get_crimes_by_year_and_neighborhood(
    skip: int = 0,
    limit: int = default_limit,
    db: Session = Depends(get_db),
):
    return crud.get_crimes_by_year_and_neighborhood(
        skip=skip,
        limit=limit,
        db=db,
    )
