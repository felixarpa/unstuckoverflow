import unittest
import requests


class HelpTest(unittest.TestCase):

    def setUp(self):
        self.endpoint = 'http://0.0.0.0:8081/help'
        self.user_id = 2
        self.stackoverflow_url = 'https://stackoverflow.com/questions/43325501/how-do-i-write-a-sequence-of-promises-in-python'
        self.headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.106 Safari/537.36'}

    def test_endpoint(self):
        request = requests.get(self.stackoverflow_url, headers=self.headers)
        self.assertEqual(request.status_code, 200)

        data = {'page_html': request.text, 'user_id': 2}
        response = requests.post(self.endpoint, json=data)
        self.assertEqual(response.status_code, 200)

        response_json = response.json()
        self.assertTrue('error' in response_json)
        self.assertTrue('response' in response_json)
        self.assertTrue('skills' in response_json['response'])
        self.assertTrue('user' in response_json['response'])
        self.assertFalse(response_json['error'])
        self.assertTrue(len(response_json['response']['skills']) > 0)


if __name__ == '__main__':
    unittest.main()
