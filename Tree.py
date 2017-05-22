

# http://stackoverflow.com/questions/2482602/a-general-tree-implementation-in-python
class Node(object):
    def __init__(self, data, comment=''):
        self.name = data
        self.comment = comment
        self.children = []

    def __str__(self):
        pass

    def get_name(self):
        return self.name

    def add_child(self, obj):
        self.children.append(obj)

    def children_length(self):
        return len(self.children)

    def get_max_depth(self):
        return get_depth(self)

    def get_node_count(self):
        return get_node_count(self)

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
        data = {
            'name': self.name,
            'children': []
        }
        for c in self.children:
            data['children'].append(c.make_json())
        return data


def get_depth(node):
    if node is None:
        return 0
    else:
        max_depth = 0
        for c in node.children:
            max_depth = max(max_depth, get_depth(c))

    return max_depth + 1


def get_node_count(node):
    if node is None:
        return 0
    else:
        count = 0
        for c in node.children:
            count += get_node_count(c)
    return count + 1
