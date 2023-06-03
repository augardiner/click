FROM python:3.11-slim-buster

WORKDIR /app

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

ENV APP_SETTINGS=config.ProductionConfig

CMD ["flask", "run", "--host", "0.0.0.0"]
