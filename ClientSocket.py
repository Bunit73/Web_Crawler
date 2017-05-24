"""
Name:               Socket.py
Description:        Opens a socket for the individual client and streams 
References:
    https://github.com/miguelgrinberg/Flask-SocketIO/issues/371
"""
from multiprocessing import Process


class Socket:
    """
    Creates a new Process that consistently writes data through a websocket
    to 
    :param io:    flask io app
    :param sid:   socket id of the client
    :param start: Start the stream to client upon creation
    """
    def __init__(self, io, sid, start=False):
        self.sid = sid
        self.io = io
        self.connected = True

        if start:
            p = Process(target=self.run())
            p.start()


    def run(self):
        pass
        """ Creates a random n-ary tree for 30 seconds"""

    def emit(self, event, data):
        """ 
        Overrides the flask_socketio method to emit data to a single clients room (socket id)
        @:param event: socket IO event type
        @:param data:  data to be sent
        """
        self.io.emit(event, data, room=self.sid)

    def sleep(self, time):
        self.io.sleep(time)