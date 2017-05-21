import unittest
import Tree


class TreeTest(unittest.TestCase):

    def test_node_creation(self):
        node = Tree.Node("Root")
        self.assertEqual(type(node), Tree.Node, "Returns a node object")

    def test_add_children(self):
        root = Tree.Node("Root")
        child_A = Tree.Node("Child A")
        child_B = Tree.Node("Child B")

        root.add_child(child_A)
        root.add_child(child_B)

        self.assertEqual(root.children_length(), 2, "Root should have 2 children")
        self.assertEqual(child_A.children_length(), 0, "Child A should hav no children")
        self.assertEqual(child_B.children_length(), 0, "Child B should hav no children")

    def test_depth(self):
        root = Tree.Node("Root")
        child_a = Tree.Node("Child A")
        child_b = Tree.Node("Child B")
        grandchild_a = Tree.Node("Grand Child AA")

        root.add_child(child_a)
        root.add_child(child_b)
        child_a.add_child(grandchild_a)

        self.assertEqual(root.get_max_depth(), 3, "Root should a depth of 3")
        self.assertEqual(child_a.get_max_depth(), 2, "Child A should a depth of 2")
        self.assertEqual(child_b.get_max_depth(), 1, "Root should a depth of 1")
        self.assertEqual(grandchild_a.get_max_depth(), 1, "Root should a depth of 1")


if __name__ == '__main__':
    unittest.main()
