"""
Name:               Socket.py
Description:        Opens a socket for the individual client and streams 
References:
    https://github.com/miguelgrinberg/Flask-SocketIO/issues/371
"""


class Socket:
    """
    Creates a new Process that consistently writes data through a websocket
    to 
    :param io:    flask io app
    :param sid:   socket id of the client
    """
    def __init__(self, io, sid):
        self.sid = sid
        self.io = io
        self.connected = True

    def run(self):
        pass

    def emit(self, event, data):
        """ 
        Overrides the flask_socketio method to emit data to a single clients room (socket id)
        @:param event: socket IO event type
        @:param data:  data to be sent
        """
        self.io.emit(event, data, room=self.sid)

    def sleep(self, time):
        self.io.sleep(time)
