import unittest
import Crawler


class TreeGenericCrawler(unittest.TestCase):
    def test_url(self):
        c = Crawler.SearchGeneric("http://facebook.com")
        self.assertEqual(c.validate_url(), True, "Test http://facebook.com is valid url")

    def test_bad_url(self):
        c = Crawler.SearchGeneric("place")
        self.assertNotEquals(c.validate_url(), True, "Test place is not valid url")


class BFSCrawler(unittest.TestCase):
    def test_object(self):
        b = Crawler.Breadth("https://reddit.com", 10)
        b.search()


if __name__ == '__main__':
    unittest.main()
