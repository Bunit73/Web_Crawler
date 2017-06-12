

# http://stackoverflow.com/questions/2482602/a-general-tree-implementation-in-python
class Node(object):
    def __init__(self, data, comment=''):
        self.name = data
        self.comment = comment
        self.children = []

    def get_name(self):
        return self.name

    def add_child(self, obj):
        """Adds a child to the node list"""
        if type(obj) is Node:
            self.children.append(obj)
        else:
            raise Exception("Only Nodes can be appended")

    def children_length(self):
        """Returns the count of children node has"""
        return len(self.children)

    def get_max_depth(self):
        """Returns count of nodes in deepest branch"""
        max_depth = 0
        for c in self.children:
            max_depth = max(max_depth, c.get_max_depth())
        return max_depth + 1

    def get_node_count(self):
        """Returns total count of nodes"""
        count = 0
        for c in self.children:
            count += c.get_node_count()
        return count + 1

    def add_to_tree(self, root, child, comment=''):
        """Depth First Pre-Order Tree Traversal"""
        if child is None:
            return
        stack = list()
        stack.append(self)
        while len(stack) > 0:
            node = stack.pop()
            if node.get_name() == root:
                node.add_child(Node(child, comment))
                return
            if len(node.children) > 0:
                for c in node.children:
                    stack.append(c)

    def make_json(self):
        """Returns a JSON like object representation of the tree"""
        data = {
            'name': self.name,
            'comment': self.comment,
            'children': []
        }
        for c in self.children:
            data['children'].append(c.make_json())
        return data
