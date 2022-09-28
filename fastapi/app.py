from glob import glob
from sys import prefix
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from crime.routes import router
from config import settings

description = """
An API description
"""

app = FastAPI(
    title=settings.title,
    description=description,
    version=settings.version,
    license_info={"name": settings.license_name, "url": settings.license_url},
)

prefix = settings.prefix

app.include_router(router)
app.include_router(router, prefix=prefix)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
