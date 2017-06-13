"""
Name:               Web_Crawler.py
Description:        Flask server that handles routing and socket functions
  
References:
    http://flask.pocoo.org/
    https://flask-socketio.readthedocs.io/en/latest/
    http://www.gevent.org/gevent.monkey.html
    http://www.shanelynn.ie/asynchronous-updates-to-a-webpage-with-flask-and-socket-io/
    http://stackoverflow.com/questions/22238090/validating-urls-in-python
    https://github.com/miguelgrinberg/Flask-SocketIO/issues/371
"""
import random
import string
import json

import validators

import ClientSocket
import Crawler

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from gevent import monkey

# Monkey patch replaces class in the standard socket module so they can work with gevent
# http://www.gevent.org/intro.html#beyond-sockets
monkey.patch_all()

app = Flask(__name__)

# make a random secret thats between 10 and 20 chars long
# http://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python
app.config['SECRET_KEY'] = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits)
                                   for _ in range(random.randrange(10, 20, 1)))

# Wrap the flask app with the flask socket io
io = SocketIO(app, engineio_logger=True, ping_timeout=7200)


@app.route('/', methods=['GET'])
def index():
    """Index Page"""
    return render_template("index.html")


@app.route("/cookie_handler", methods=['GET'])
def cookie_handler():
    """
    Cookie Handling & From Validation
    """
    # make the response object
    response = app.make_response('')

    search_json = {}
    url = request.args['url']
    type = request.args['type']
    num = int(request.args['number'])
    keyword = request.args['keyword']

    # Validate Inputs
    if not validators.url(url):
        response = app.make_response('Bad URL')
        response.status_code = 400
        return response

    # search type
    if type not in ['Depth', 'Breadth']:
        response = app.make_response('Bad Search Type')
        response.status_code = 400
        return response

    # amount of pages
    if num < 1 or num > 125:
        response = app.make_response('Invalid Pick A Number Between 1-125')
        response.status_code = 400
        return response

    # keyword
    if keyword == '':
        response = app.make_response('Invalid Keyword')
        response.status_code = 400
        return response

    # Set response code for success
    response.status_code = 200

    # Make the json with the search data
    search_json['url'] = url
    search_json['type'] = type
    search_json['num'] = num
    search_json['keyword'] = keyword

    # add search to cookie
    if request.cookies.get('past_searches'):
        past_searches = json.loads(request.cookies.get('past_searches'))

        # loop though the cookie to see if the search has been done
        past_search_check = False
        for s in past_searches['searches']:
            if (s['url'] == url) & (s['keyword'] == keyword):
                past_search_check = True
                break

        searches = past_searches['searches']

        # If it hasnt been searched before add it to the cookie
        if not past_search_check:
            searches.append(search_json)

        response.set_cookie('past_searches', json.dumps({'searches': searches}))

    # if there is no cookie/no prior searches make the cookie with the search info
    else:
        response.set_cookie('past_searches', json.dumps({'searches': [search_json]}))

    return response


@app.errorhandler(404)
def page_not_found(error):
    return '404 - This Page Does Not Exist', 404


# Socket IO Listeners
@io.on('connect')
def connected():
    """Handle Socket Connection"""
    emit('conn response', {'msg': 'Connected'})


@io.on('random tree')
def handle_numbers(obj=None):
    client = ClientSocket.Socket(io, request.sid)
    #  https://github.com/miguelgrinberg/Flask-SocketIO/issues/371
    if obj['type'] == 'Breadth':
        crawler = Crawler.Breadth(obj['url'], int(obj['number']), str(obj['keyword']), client)
        crawler.search('socket')
    elif obj['type'] == 'Depth':
        crawler = Crawler.Depth(obj['url'], int(obj['number']), str(obj['keyword']), client)
        crawler.search('socket')
    else:
        client.emit("Error", "Bad Data")


if __name__ == "__main__":
    io.run(app, 'localhost', 5000, debug=False)
