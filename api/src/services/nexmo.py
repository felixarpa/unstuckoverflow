import nexmo

from src.util.env import get_env
from src.util import log


client = nexmo.Client(key=get_env('NEXMO_KEY'), secret=(get_env('NEXMO_SECRET')))


def send_sms(from_who, to_who, text):
    client.send_message({
        'from': from_who,
        'to': to_who,
        'text': text,
    })
    log.info('SMS sent to {}'.format(to_who))
