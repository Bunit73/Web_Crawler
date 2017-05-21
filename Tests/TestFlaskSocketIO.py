"""
Name:           test_flask_socketIO.py
Description:    Server side unittests for flask and flaskSocketIO
References:
    https://damyanon.net/flask-series-testing/
"""
import unittest
import string
import random

from routes import app
from flask import Flask, request
from flask_socketio import SocketIO, emit
from gevent import monkey

monkey.patch_all()

"""
class TestFlaskRoutes(unittest.TestCase):
    
    def setUp(self):
        # self.app = app.test_client()
        # self.app.testing = True


    def tearDown(self):
        pass

    def test_home_page(self):
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

    def test_cookie_handler_all(self):
        result = self.app.get('/cookie_handler?url=http%3A%2F%2Ffacebook.com&type=Depth&number=1&keyword=ABC')
        self.assertEqual(result.status_code, 200)

    def test_bad_url_for_search(self):
        result = self.app.get('/cookie_handler?url=facebook&type=Depth&number=1&keyword=ABC')
        self.assertEqual(result.status_code, 400)

    def test_bad_search_type_for_search(self):
        result = self.app.get('/cookie_handler?url=http%3A%2F%2Ffacebook.com&type=NA&number=1&keyword=ABC')
        self.assertEqual(result.status_code, 400)

    def test_bad_keyword_for_search(self):
        result = self.app.get('/cookie_handler?url=http%3A%2F%2Ffacebook.com&type=NA&number=1&keyword=')
        self.assertEqual(result.status_code, 400)

    def test_no_search_args(self):
        result = self.app.get('/cookie_handler?u')
        self.assertEqual(result.status_code, 400)
"""

class TestFlaskSocketIO(unittest.TestCase):
    """Test Flask Socket IO Functionality"""
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['SECRET_KEY'] = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits)
                                   for _ in range(random.randrange(10, 20, 1)))
        self.io = SocketIO(self.app)

        self.disconnected = False

        @self.io.on('connect')
        def connected():
            emit('conn response', {'msg': 'Connected'})

        @self.io.on('disconnect')
        def disconnect():
            emit('conn ended', {'msg': 'Goodbye'})

    def tearDown(self):
        pass

    def test_connection(self):
        """Test Connection"""
        client = self.io.test_client(self.app)
        resp = client.get_received()
        self.assertEqual(resp[0]['args'][0]['msg'], 'Connected', "Did not receive the connect message")
        client.disconnect()

    def test_socket_emit(self):
        """Test Unique Client Message"""
        client1 = self.io.test_client(self.app)
        client2 = self.io.test_client(self.app)

        client1.emit('test client')
        client2.emit('test client')

        resp1 = client1.get_received()
        resp2 = client2.get_received()

        self.assertNotEqual(resp1[1]['args'][0], resp2[1]['args'][0], 'Different clients got same message')

        client1.disconnect()
        client2.disconnect()


if __name__ == '__main__':
    unittest.main()