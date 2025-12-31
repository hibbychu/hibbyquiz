import os

IGNORE_DIRS = {"node_modules", ".git", "__pycache__"}

def print_tree(path, prefix=""):
    try:
        entries = sorted(os.listdir(path))
    except PermissionError:
        return

    entries = [e for e in entries if e not in IGNORE_DIRS]

    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        print(prefix + connector + entry)

        if os.path.isdir(full_path):
            extension = "    " if index == len(entries) - 1 else "│   "
            print_tree(full_path, prefix + extension)


if __name__ == "__main__":
    root_dir = "."  # current directory
    print(root_dir)
    print_tree(root_dir)
