import nexmo

from src.util.env import get_env
from src.util import log

client = nexmo.Client(key=get_env('NEXMO_KEY'), secret=(get_env('NEXMO_SECRET')))


def send_sms(fromWho, toWho, text):
    client.send_message({
        'from': fromWho,
        'to': toWho,
        'text': text,
    })

    log.info('SMS sent to {}'.format(toWho))
