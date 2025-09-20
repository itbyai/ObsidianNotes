在使用 `pytest` 运行测试时，如果你的测试函数中的 `print()` 语句没有在控制台上显示，可能是因为 `pytest` 默认会捕获所有输出，包括标准输出（stdout）和标准错误输出（stderr），并将其作为测试结果的一部分进行处理。

要确保 `print()` 语句的输出能够显示在控制台上，你可以使用以下几种方法：

### 1. 使用 `-s` 选项
在运行 `pytest` 时，添加 `-s` 选项可以禁用输出捕获，这样 `print()` 语句的输出会直接显示在控制台中。

```bash
pytest -s
```

### 2. 使用 `capsys` 或 `capfd` 固件
在测试函数中，可以使用 `pytest` 提供的 `capsys` 或 `capfd` 固件来捕获并检查输出。这些固件允许你在测试中检查标准输出和标准错误输出。

```python
def test_print(capsys):
    print("this is test print")
    captured = capsys.readouterr()
    assert "this is test print" in captured.out
```

### 3. 检查日志设置
如果你使用了日志库（如 `logging`），请确保日志级别和配置允许输出到控制台。例如：

```python
import logging

logging.basicConfig(level=logging.DEBUG)

def test_print():
    logging.debug("this is a debug message")
```

确保在运行测试时，日志级别设置为允许输出。

### 4. 确保测试函数被正确执行
确保你的测试函数遵循 `pytest` 的命名规范（通常以 `test_` 开头）并被 `pytest` 发现和执行。

### 5. 检查 `pytest` 配置文件
有时候，`pytest` 的配置文件（如 `pytest.ini`、`pyproject.toml` 或 `setup.cfg`）中可能存在配置项影响了输出。检查这些文件是否有相关配置，调整配置以适应你的需求。

通过上述方法，你可以确保 `print()` 语句的输出在运行 `pytest` 时能够正确显示在控制台中。