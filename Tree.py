

# http://stackoverflow.com/questions/2482602/a-general-tree-implementation-in-python
class Node(object):
    def __init__(self, data):
        self.name = data
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

    def add_to_tree(self,root,child):
        """Depth First Pre-Order Tree Traversal"""
        if child is None:
            return
        stack = []
        stack.append(self)
        while len(stack) > 0:
            node = stack.pop()
            if node.get_name() == root:
                node.add_child(Node(child))
                return
            if len(node.children) > 0:
                for c in node.children:
                    stack.append(c)


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


# def add_child_to_spot(node, spot):
#     """Depth First Pre-Order Tree Traversal"""
#     if node is None:
#         return
#     stack = []
#     stack.append(node)
#     counter = 0
#     while len(stack) > 0:
#
#         if counter == spot:
#             global names
#             names = names +1
#             node.add_child(Node(names))
#             return
#         counter += 1
#         node = stack.pop()
#         if len(node.children) > 0:
#             for c in node.children:
#                 stack.append(c)


def make_json(node):
    if node is None:
        return {}
    else:
        data = {
            'name': node.name,
            'children': []
        }
        for c in node.children:
            data['children'].append(make_json(c))

    return data
