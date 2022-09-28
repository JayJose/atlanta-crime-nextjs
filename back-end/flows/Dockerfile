FROM python:3.9

WORKDIR /usr/src/app

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY config ./config
COPY data ./data
COPY utility ./utility

COPY setup.py .

RUN pip install .

ENTRYPOINT [ "python3" ]
CMD ["flow.py"]