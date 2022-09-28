from functools import lru_cache
import pydantic


class Settings(pydantic.BaseSettings):

    # project config
    title: str = "An API"
    prefix: str = ""
    version: str = "1.0.0"
    license_name: str = "Apache 2.0"
    license_url: str = "https://www.apache.org/licenses/LICENSE-2.0.html"

    # database config
    POSTGRES_HOST: str
    POSTGRES_DB: str
    POSTGRES_PORT: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    DBT_PROFILES_DIR: str = "."
    DBT_SCHEMA: str = "dev"

    # env config
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
