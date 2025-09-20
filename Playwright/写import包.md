要编写一个可以在 Python 中 `import` 的函数，你需要将该函数放置在一个模块中，然后确保模块的路径在 Python 的 `sys.path` 中。以下是详细的步骤：

### 1. 创建一个 Python 文件

首先，创建一个 Python 文件，例如 `mymodule.py`。在这个文件中，你可以定义你需要的函数：

```python
# 文件名: mymodule.py

def greet(name):
    return f"Hello, {name}!"
```

### 2. 确保模块文件的路径在 `sys.path` 中

要确保 Python 能够找到你的模块，模块文件（`mymodule.py`）需要位于 Python 的模块搜索路径中。这些路径包括当前工作目录或在 `PYTHONPATH` 环境变量中指定的路径。

如果你的文件在项目目录中（例如 `myproject`），确保你在执行脚本或启动 Python 解释器时，工作目录是项目的根目录，或者将项目目录添加到 `PYTHONPATH` 环境变量中。

### 3. 在 Python 中导入并使用函数

在你项目中的其他 Python 文件中，你可以导入并使用定义的函数。例如，在一个名为 `main.py` 的文件中：

```python
# 文件名: main.py

# 导入 mymodule 中的 greet 函数
from mymodule import greet

def main():
    # 使用导入的函数
    print(greet("World"))

if __name__ == "__main__":
    main()
```

### 4. 运行 Python 脚本

在项目目录中，运行 `main.py` 文件：

```bash
python main.py
```

你应该会看到输出：

```
Hello, World!
```

### 5. 使用包和模块

如果你的项目有多个模块或文件，可以将它们组织成一个包。包是一个包含 `__init__.py` 文件的目录。创建一个目录（例如 `myproject`），并在其中放置你的模块和 `__init__.py` 文件：

```
myproject/
    __init__.py
    mymodule.py
    main.py
```

`__init__.py` 文件可以是空的，或者可以包含包的初始化代码。然后，你可以在 `main.py` 中这样导入模块：

```python
# 文件名: myproject/main.py

from myproject.mymodule import greet

def main():
    print(greet("World"))

if __name__ == "__main__":
    main()
```

在这种情况下，你需要在项目目录之外执行 `main.py` 时，将 `myproject` 目录添加到 `PYTHONPATH` 环境变量中，或将你的工作目录设置为项目目录。

### 总结

1. **定义函数**：将函数写入一个 Python 文件。
2. **确保路径**：确保模块文件路径在 Python 的 `sys.path` 中。
3. **导入函数**：在其他 Python 文件中使用 `from module import function` 导入并使用函数。
4. **组织项目**：使用包和模块结构来组织更复杂的项目。