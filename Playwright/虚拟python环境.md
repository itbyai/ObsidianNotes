在 macOS 上创建和管理 Python 3 虚拟环境的步骤如下：

### 使用 `venv` 模块

这是 Python 3 内置的虚拟环境工具。适用于 Python 3.3 及更高版本。

1. **打开终端**。

2. **创建虚拟环境**：
   ```sh
   python3 -m venv myenv
   ```
   这里的 `myenv` 是虚拟环境的名称，你可以根据需要修改。

3. **激活虚拟环境**：
   ```sh
   source myenv/bin/activate
   ```
   激活后，你会看到命令提示符前面出现虚拟环境的名称，例如 `(myenv)`。

4. **在虚拟环境中安装包**：
   ```sh
   pip install package_name
   ```

5. **停用虚拟环境**：
   ```sh
   deactivate
   ```

### 使用 `virtualenv` 工具

如果你需要支持 Python 2 或者想使用更灵活的虚拟环境工具，可以使用 `virtualenv`。

1. **首先安装 `virtualenv`**：
   ```sh
   pip install virtualenv
   ```

2. **创建虚拟环境**：
   ```sh
   virtualenv myenv
   ```

   如果你有多个 Python 版本，可以指定使用 Python 3：
   ```sh
   virtualenv -p python3 myenv
   ```

3. **激活虚拟环境**：
   ```sh
   source myenv/bin/activate
   ```

4. **在虚拟环境中安装包**：
   ```sh
   pip install package_name
   ```

5. **停用虚拟环境**：
   ```sh
   deactivate
   ```

### 使用 `pyenv` 和 `pyenv-virtualenv`（适用于多版本 Python 管理）

`pyenv` 可以帮助你管理不同版本的 Python 和虚拟环境。

1. **安装 `pyenv`**（按照 [pyenv 的官方文档](https://github.com/pyenv/pyenv) 进行安装）。

2. **安装 Python 版本**：
   ```sh
   pyenv install 3.9.6
   ```

3. **安装 `pyenv-virtualenv` 插件**：
   ```sh
   pyenv install pyenv-virtualenv
   ```

4. **创建虚拟环境**：
   ```sh
   pyenv virtualenv 3.9.6 myenv
   ```

5. **激活虚拟环境**：
   ```sh
   pyenv activate myenv
   ```

6. **停用虚拟环境**：
   ```sh
   pyenv deactivate
   ```

这些方法将帮助你在 macOS 上有效地创建和管理 Python 3 的虚拟环境。