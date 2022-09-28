from functools import lru_cache
import pydantic

class Settings(pydantic.BaseSettings):

    # project config
    title: str = "Atlanta Crime"
    prefix: str = ""
    version: str = "0.0.1"
    license_name: str = ""
    license_url: str = ""

    # database config
    POSTGRES_HOST: str
    POSTGRES_DB: str
    POSTGRES_PORT: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    RAW_SCHEMA: str
    CRIME_TABLE: str
    
    # env config
    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()