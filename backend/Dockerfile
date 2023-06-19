FROM python:3.10

RUN apt update

RUN mkdir "backend"

WORKDIR /backend

COPY ./requirements.txt ./requirements.txt

RUN python -m pip install --upgrade pip && \
    pip install -r ./requirements.txt

COPY ./src ./src
COPY ./commands ./commands

VOLUME /src

CMD ["bash", "commands/start_server_dev.sh"]