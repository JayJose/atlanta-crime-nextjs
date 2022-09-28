from datetime import datetime, date
from pydantic import BaseModel


class Neighborhood(BaseModel):
    id: str
    neighborhood: str
    npu: str
    created_at: datetime

    class Config:
        orm_mode = True


class Offense(BaseModel):
    id: str
    ibr_code: str
    offense_category: str
    offense: str
    crime_against: str
    created_at: datetime

    class Config:
        orm_mode = True


class Date(BaseModel):
    id: date
    date: date
    day_name: str
    day_of_year: int
    month: int
    month_name: str
    quarter: int
    year: int
    created_at: datetime

    class Config:
        orm_mode = True


class Crime(BaseModel):
    id: str
    date_id: date
    beat: str
    zone: str
    neighborhood_id: str
    neighborhood: str
    npu: str
    address: str
    latitude: float
    longitude: float
    offense_id: str
    crime_against: str
    offense_category: str
    offense: str
    created_at: datetime

    class Config:
        orm_mode = True
