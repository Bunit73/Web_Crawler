from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
import urllib.error

from time import sleep

import validators

import Tree
import ClientSocket


class SearchGeneric(object):
    """
    Generic Crawler Class
    """
    def __init__(self, root_url, limit=1, socket=None):
        self.root_url = root_url
        self.tree = Tree.Node(root_url)
        self.limit = limit
        self.visited = []
        self.sleep_time = 0.5
        self.socket = socket

    def validate_url(self):
        return validators.url(self.root_url)

    def test_url_is_absolute(self, url):
        return bool(urllib.parse.urlparse(url).netloc)

    def append_node(self, root, child, comment=''):
        if root != child:
            self.tree.add_to_tree(root, child, comment)

    def write_log(self):
        pass

    def print_to_console(self):
        print(self.tree.make_json())

    def socket_output(self):
        output = {'tree': self.tree.make_json(),
                  'log': 'log data',
                  'final': 'no'
                  }
        self.socket.emit('message', output)


class Breadth(SearchGeneric):
    """
    Breadth Crawler
    """
    def __init__(self, root_url, limit, socket):
        super().__init__(root_url, limit, socket)
        self.queue = [{'root': root_url, 'url': root_url}]

    def search(self, emit=None):
        while (len(self.queue) != 0) & (self.limit > 0):
            url = self.queue.pop(0)

            if self.test_url_is_absolute(url['url']) is False:
                url['url'] = urllib.parse.urljoin(url['root'], url['url'])

            if (validators.url(url['url']) is True) & (url not in self.visited):
                self.visited.append(url)
                # change the header so sites dont kick the python header
                req = urllib.request.Request(url['url'], data=None, headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko)\
                     Chrome/35.0.1916.47 Safari/537.36'})

                try:
                    page_data = urllib.request.urlopen(req)
                except urllib.error.HTTPError:
                    page_data = None
                    comment = 'Denied Access'

                if page_data is not None:
                    soup = BeautifulSoup(page_data.read(), "html.parser")

                    # add links to queue
                    for link in soup.find_all('a', href=True):
                        self.queue.append({'root': url['url'], 'url': link['href']})

                    comment = ''

                # append the node to the tree
                self.append_node(url['root'], url['url'], comment)

                if emit == 'console':
                    self.print_to_console()
                elif emit == 'socket':
                    self.socket_output()

                self.limit = self.limit - 1

            else:
                self.queue.pop(0)

            if emit == 'socket':
                self.socket.sleep(self.sleep_time)
            else:
                sleep(self.sleep_time)

            self.search(emit)


class Depth(SearchGeneric):
    """
    Depth Crawler
    """
    def __init__(self, root_url, limit, socket):
        super().__init__(root_url, limit, socket)
        self.stack = [{'root': root_url, 'url': root_url}]

    def search(self, emit=None):
        while (len(self.stack) != 0) & (self.limit > 0):
            url = self.stack.pop(0)
            if self.test_url_is_absolute(url['url']) is False:
                url['url'] = urllib.parse.urljoin(url['root'], url['url'])

            if (validators.url(url['url']) is True) & (url not in self.visited):
                self.visited.append(url)
                # change the header so sites dont kick the python header
                req = urllib.request.Request(url['url'], data=None, headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko)\
                     Chrome/35.0.1916.47 Safari/537.36'})

                try:
                    page_data = urllib.request.urlopen(req)
                except urllib.error.HTTPError:
                    page_data = None
                    comment = 'Denied Access'

                if page_data is not None:
                    soup = BeautifulSoup(page_data.read(), "html.parser")

                    # add links to queue
                    for link in soup.find_all('a', href=True):
                        self.stack.insert(0, {'root': url['url'], 'url': link['href']})

                    comment = ''

                # append the node to the tree
                self.append_node(url['root'], url['url'], comment)

                if emit == 'console':
                    self.print_to_console()
                elif emit == 'socket':
                    self.socket_output()

                self.limit = self.limit - 1

            else:
                self.stack.pop(0)

            if emit == 'socket':
                self.socket.sleep(self.sleep_time)
            else:
                sleep(self.sleep_time)

            self.search(emit)
