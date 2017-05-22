from bs4 import BeautifulSoup
import urllib.request

import validators
import Tree


class SearchGeneric(object):
    """
    Generic Crawler Class
    """
    def __init__(self, root_url, limit=1):
        self.root_url = root_url
        self.tree = Tree.Node(root_url)
        self.limit = limit
        self.visited = []

    def validate_url(self):
        return validators.url(self.root_url)


class Breadth(SearchGeneric):
    """
    Breadth Crawler
    """
    def __init__(self, root_url, limit):
        super().__init__(root_url, limit)
        self.queue = [{'root':root_url,'url':root_url}]

    def search(self):
        while (len(self.queue) != 0) & (self.limit > 0):
            url = self.queue.pop(0)
            if (validators.url(url['url']) == True) & (url not in self.visited):
                self.visited.append(url)
                # change the header so sites dont kick the python header
                req = urllib.request.Request(url['url'], data=None, headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'})
                page_data = urllib.request.urlopen(req)
                soup = BeautifulSoup(page_data.read(), "html.parser")

                # add links to queue
                for link in soup.find_all('a', href=True):
                    self.queue.append({'root':url['url'],'url':link['href']})
                # print(self.visited)
                # append the node to the tree
                if self.root_url != url['url']:
                    self.tree.add_to_tree(url['root'],url['url'])
                print(Tree.make_json(self.tree))
                self.limit = self.limit - 1
            else:
                print("Bad Link: ", url)
                self.queue.pop(0)
            self.search()



class Depth(SearchGeneric):
    """
    Depth Crawler
    """
    def __init__(self, root_url, limit):
        super().__init__(root_url, limit)
        self.stack = []

    def search(self, root_url):
        pass
