FROM python:3.6
ADD . /srv/unstuckoverflow
WORKDIR /srv/unstuckoverflow
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt
CMD uwsgi --ini unstuckoverflow.ini