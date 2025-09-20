![[Pasted image 20240917220927.png]]
![[Pasted image 20240917221206.png]]
![[Pasted image 20240917222146.png]]
在 Azure Pipelines 中，**"Tag sources on success"** 的意思是当流水线成功完成后，自动为代码源的最新提交打上一个标签（tag）。

### 详细解释

- **Tag**：在版本控制系统（如 Git）中，标签是一种标记，可以将特定的提交（commit）打上一个具有特定意义的名称。通常用于标记一个重要的版本发布或一个稳定的构建点。
  
- **Sources**：在这里指的是代码的源头，也就是代码库中的最新提交。

- **On success**：这意味着只有在流水线成功执行后，才会为代码打上标签。成功执行通常意味着所有任务（如构建、测试、部署等）都通过了，没有错误。

### 作用

"Tag sources on success" 功能通常用于版本控制，以便跟踪每次成功构建后的状态。这样，你可以很容易回溯到某个构建成功的版本。比如，如果你在发布新版本时启用了这个功能，系统会自动给发布的代码提交打上一个标签，可能类似于 `v1.0.0` 或 `build-2024-09-17-01` 之类的格式。

### 使用场景

- **自动版本控制**：每当构建或发布成功后自动打标签，便于将来回滚或审查时参考特定版本。
- **持续交付（CD）流程**：在持续交付管道中，当发布到生产环境时，可以自动为成功发布的代码打标签。

### 示例

在 Azure Pipeline YAML 文件中，你可以配置 `tagSources` 选项，如下：

```yaml
- task: UseGitVersion@5
  inputs:
    tagSources: true
```

当构建成功后，代码的最新提交将被自动打上标签，你可以通过 Git 查看这个标签，确保每个构建的成功状态被记录下来。

### 总结

**"Tag sources on success"** 是一个非常有用的功能，它帮助团队在每次成功构建后自动为代码库中的最新提交打标签，从而方便未来的版本管理和追踪。
![[Pasted image 20240917222448.png]]
![[Pasted image 20240917223239.png]]
```c
# Write your commands here

echo 'Network Diag'
echo '------------------ Inspecting DE ------------------'
BFF='olo-ci-graph-at.dominostest.com.au'
echo using BFF url for DE: $BFF

echo DNS Lookup
nslookup $BFF

echo ping -c 1 -R -t 10 -w 10 -v $BFF
ping -c 1 -R -t 10 -w 10 -v $BFF

echo curl -v https://$BFF/graphql ...
curl -L -X POST -H "dpe-application: web" -H "dpe-country: DE" -H "dpe-env: CI" -H "dpe-language: en" -H "content-type: application/json" -d '{"operationName":"storeSearchQuery","variables":{"searchString":"hami"},"query":"query storeSearchQuery($searchString: String!) {\n  storeSearch(searchString: $searchString) {\n    storeNo\n    media {\n      name\n      displayAddress\n      __typename\n    }\n    geo {\n      longitude\n      latitude\n      __typename\n    }\n    timeZone\n    loyalty {\n      isEnabled\n      __typename\n    }\n    priceInfo {\n      taxRate\n      minOrderPricePickup\n      minOrderPriceDelivery\n      __typename\n    }\n    __typename\n  }\n}\n"}' https://olo-ci-graph-at.dominostest.com.au/graphql

```

![[Pasted image 20240917224229.png]]
task group:
![[Pasted image 20240917224441.png]]
![[Pasted image 20240917225200.png]]
![[Pasted image 20240917225257.png]]
![[Pasted image 20240917225328.png]]
![[Pasted image 20240917225939.png]]
end of task
![[Pasted image 20240917230641.png]]
![[Pasted image 20240917230820.png]]
![[Pasted image 20240918000046.png]]
![[Pasted image 20240918000132.png]]
$(nodeVersion) 是定义的变量
![[Pasted image 20240918000905.png]]
![[Pasted image 20240918001416.png]]
![[Pasted image 20240918001436.png]]
![[Pasted image 20240918002137.png]]
![[Pasted image 20240918002732.png]]
![[Pasted image 20240918002747.png]]
![[Pasted image 20240918002930.png]]
![[Pasted image 20240918003126.png]]
![[Pasted image 20240918003401.png]]
NODE_ENV=production yarn update:features && yarn workspace olo.web build:prod
`NODE_ENV` 是一个环境变量，在 Node.js 应用程序中非常常用。它用于指示应用程序的运行环境，以便应用程序能够根据不同的环境进行不同的配置和行为调整。
and(succeeded(), or(contains(variables['Build.SourceBranch'], 'refs/heads/hotfix'), eq(variables['Build.SourceBranch'], 'refs/heads/master')))
![[Pasted image 20240918110839.png]]
![[Pasted image 20240918111018.png]]
![[Pasted image 20240918111318.png]]
根据不同的情况进行编译
![[Pasted image 20240918112806.png]]
![[Pasted image 20240918114631.png]]
![[Pasted image 20240918115911.png]]
![[Pasted image 20240918120116.png]]
![[Pasted image 20240918120135.png]]
![[Pasted image 20240918120153.png]]
![[Pasted image 20240918120311.png]]
![[Pasted image 20240918120442.png]]
![[Pasted image 20240918150912.png]]
![[Pasted image 20240918151551.png]]
![[Pasted image 20240918151827.png]]
在 React 项目中，执行 `yarn build` 或 `npm run build` 后，生成的 `dist` 目录是最终的生产环境构建产物，它包含了优化后的静态文件，适合在服务器上部署。该目录的结构和内容大致如下：

### 1. **`index.html`**
   这是 React 应用的入口文件，是最重要的文件之一。它通常是一个相对简单的 HTML 文件，包含一个 `div`，例如：

   ```html
   <div id="root"></div>
   ```

   React 应用的所有内容都会被 JavaScript 注入到这个 `div` 中，称为单页应用（SPA）。`index.html` 还会加载编译后的 JavaScript 和 CSS 文件，通常通过 `<script>` 和 `<link>` 标签引入。

### 2. **JavaScript 文件（如 `main.[hash].js`、`runtime.[hash].js`）**
   - **`main.[hash].js`**：这是 React 应用的主要 JavaScript 文件，包含了所有核心逻辑和代码。在构建过程中，React 会将源代码进行打包、压缩和混淆，生成一个或多个 JavaScript 文件。这些文件使用哈希值命名（如 `main.123abc.js`），以确保浏览器缓存能够被正确管理，当文件内容发生变化时，哈希值也会变化。
   
   - **`runtime.[hash].js`**：这是运行时的 JavaScript 文件，负责在浏览器加载 React 应用时进行引导操作。它主要用于管理模块加载和执行。
   
   - **`vendor.[hash].js`（有时会出现）**：如果项目中有使用第三方库（例如 React、lodash 等），Webpack 或其他打包工具可能会将它们分离出来，生成一个 `vendor.[hash].js` 文件，用于缓存这些第三方依赖。

### 3. **CSS 文件（如 `main.[hash].css`）**
   构建过程中的 CSS 文件是项目中所有 CSS 的组合。这个文件会被优化、压缩，并包含在最终的 HTML 文件中，通常也是通过 `<link>` 标签引入。与 JavaScript 文件一样，CSS 文件也可能带有哈希值以便缓存管理。

### 4. **静态资源文件夹（如 `static` 文件夹）**
   React 项目构建时会将所有静态资源（如图片、字体等）打包到一个 `static` 文件夹中。这个文件夹包含：
   
   - **`static/js`**：存放 JavaScript 文件
   - **`static/css`**：存放 CSS 文件
   - **`static/media`**：存放图片、字体等文件，通常带有哈希值作为文件名，以便浏览器缓存管理。

### 5. **`asset-manifest.json`**
   这是一个生成的清单文件，它记录了所有文件的映射关系，通常用于服务器端渲染（SSR）或渐进式 Web 应用（PWA）。这个文件列出了构建产物的资源路径以及它们的哈希值，以便服务器或服务工作者能够正确加载它们。

### 6. **`robots.txt`**
   这是一个用于搜索引擎的文件，用于指定哪些文件或路径可以被爬虫索引，哪些不能。在 React 项目中，默认的 `robots.txt` 文件非常简单，可能只是一个占位符，开发者可以根据需求进行配置。

### 7. **`favicon.ico` 和其他图标**
   在构建时，项目的 favicon 和其他图标（如果有）也会被包含在生成的 `dist` 目录中。这些图标用于浏览器标签、桌面快捷方式等。

### 8. **`manifest.json`**
   这是 PWA 应用的配置文件。它描述了应用的元数据，如名称、图标、启动 URL 等。如果你的 React 应用是一个 PWA，这个文件对于安装和离线体验是必要的。

### 9. **`service-worker.js`（如果是 PWA 应用）**
   如果启用了 PWA 功能，构建后的 `dist` 目录中会包含一个 `service-worker.js` 文件。它是 PWA 的核心文件，负责管理离线缓存和资源加载。

### 目录结构示例：

```plaintext
dist/
│
├── index.html
├── static/
│   ├── css/
│   │   └── main.123abc.css
│   ├── js/
│   │   ├── main.123abc.js
│   │   └── runtime.456def.js
│   └── media/
│       ├── logo.789ghi.png
│       └── font.101112.woff2
├── asset-manifest.json
├── robots.txt
├── favicon.ico
├── manifest.json
└── service-worker.js (optional)
```

### 总结

`dist` 目录中的文件是 React 应用的生产环境静态文件，主要包括优化后的 HTML、JavaScript、CSS 和其他静态资源。构建后的文件通常具有哈希值来避免缓存问题，并且根据需要会包含 PWA 相关的 `service-worker.js` 和 `manifest.json` 文件。这些文件会被部署到服务器上，供用户访问和加载应用。
![[Pasted image 20240918152238.png]]
the group of tasks
![[Pasted image 20240918152353.png]]
![[Pasted image 20240918153548.png]]
![[Pasted image 20240918153621.png]]
![[Pasted image 20240918193413.png]]
```bash
set -e

OS=`uname`

if [[ "$OS" == "Linux" ]]; then

  echo
  echo '##[section]THIS TASK IS NOW DEPRECIATED ON LINUX'
  echo
  echo AWS CLI is now included by default on Azure DevOps Ubuntu build agents.
  echo Please remove this task from your pipelines using Ubuntu build agents.
  echo
  
  sleep 10
  exit 0

else

  # Mac & Windows
  #
  
  echo
  echo '##[section]Upgrade Python Package Installer (PIP)'
  echo
  
  sudo pip3 install pip --upgrade
  
  echo
  echo '##[section]Install AWS CLI Package'
  echo
  
  sudo pip3 install awscli
  
  echo
  echo '##[section]Test CLI'
  echo
  
  echo '##[command]aws --version'
  aws --version
  echo
  
  exit 0

fi
```
![[Pasted image 20240918153650.png]]
![[Pasted image 20240918193928.png]]

![[Pasted image 20240918153723.png]]
```bash
echo '##[section]Check Akamai if firewall cli is installed'
echo

##check /home/vsts/.akamai-cli/src/cli-firewall is exist.
 
if [ -d "/home/vsts/.akamai-cli/src/cli-firewall" ]; then
    echo "/home/vsts/.akamai-cli/src/cli-firewall does exist."
    exit 0
fi

echo
echo '##[section]Generate .edgerc'
echo

# Check the required environment variables are set. These should be provided by a variable group.
#
if [[ -z "$HOST" || -z "$ACCESS_TOKEN" || -z "$CLIENT_TOKEN" || -z "$CLIENT_SECRET" ]]; then
  echo "Please ensure the following environment variables are set:"
  echo
  echo "  \$HOST"
  echo "  \$ACCESS_TOKEN"
  echo "  \$CLIENT_TOKEN"
  echo "  \$CLIENT_SECRET"
  exit 1
fi

# Create the .edgerc file.
#
set -u
cat > ~/.edgerc << EOF
[firewall]
host = $HOST
access_token = $ACCESS_TOKEN
client_token = $CLIENT_TOKEN
client_secret = $CLIENT_SECRET

[site-shield]
host = $HOST
access_token = $ACCESS_TOKEN
client_token = $CLIENT_TOKEN
client_secret = $CLIENT_SECRET
EOF

set -x

echo
echo '##[section]Install Firewall Module'
echo

akamai install --force firewall
```

![[Pasted image 20240918154202.png]]
```bash
set -ux

echo

aws s3api head-bucket --bucket "$BUCKET_NAME"

if [[ "$?" -eq 0 ]]; then
  echo "Bucket Exists.  No need to create. Deleting content"
  aws s3 rm s3://$(Bucket.Name) --recursive
else
  set -e
  aws s3 mb s3://$(Bucket.Name)
  sleep 5
fi

exit 0
```
![[Pasted image 20240918154302.png]]
![[Pasted image 20240918154735.png]]
![[Pasted image 20240918154930.png]]
![[Pasted image 20240918154946.png]]
![[Pasted image 20240918155001.png]]
![[Pasted image 20240918155237.png]]
```bash
#!/usr/bin/env python
#
#  Grabs a site-shield map and write it to an JSON file that is easily parsed by Terraform/Python, etc
#
#    akamai site-shield list-cidrs --map-id 6890
#

import os
import json
import requests
from urllib.parse import urljoin
from akamai.edgegrid import EdgeGridAuth, EdgeRc


HOME_DIR = os.environ["HOME"]
OUTPUT_DIR = os.environ.get("AGENT_TEMPDIRECTORY", ".")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "akamai_production_cidr_ranges.json")
SITE_SHIELD_ID = os.environ.get("SITE_SHIELD_ID", 6890)
DROP_MASK_ON_SINGLE_IP = os.environ.get("DROP_MASK_ON_SINGLE_IP") == "true"  # Azure doesn't like /32 on single IPs

edgerc = EdgeRc(f'{HOME_DIR}/.edgerc')
section = 'site-shield'
baseurl = 'https://%s' % edgerc.get(section, 'host')

s = requests.Session()
s.auth = EdgeGridAuth.from_edgerc(edgerc, section)

result = s.get(urljoin(baseurl, '/siteshield/v1/maps/{}'.format(SITE_SHIELD_ID)))

# If we are waiting for a Site Shield map update to be approved, the API will return a list
# of "proposed" CIDR ranges which include the new ranges that we need to allow.  Otherwise,
# the proposed list is empty, and we just need to consider the "current" list.
#
try:
    if result.json().get("proposedCidrs"):
        cidr_list = result.json()["proposedCidrs"]
    else:
        cidr_list = result.json()["currentCidrs"]
except Exception:
    print("Uh oh, something went wrong.  This was the file we got back from the Akamai API:")
    print()
    print(result.content)
    exit(1)

assert(len(cidr_list) >= 20), "Received < 20 CIDRS, something is wrong."

# Azure Storage IP lists don't like "/32" on the end of single IPs, so cut
# the mask off if DROP_MASK_ON_SINGLE_IP is set.
if DROP_MASK_ON_SINGLE_IP:
    # remove "/32" from the end
    cidr_list = [x[:-3] if x.endswith("/32") else x for x in cidr_list]

output = {
  "akamai_site_shield": {
    "production": {
      SITE_SHIELD_ID: {
        "all": cidr_list,
        "ipv4": [c for c in cidr_list if ":" not in c],
        "ipv6": [c for c in cidr_list if ":" in c]
      }
    }
  }
}

print("Output File: {}".format(OUTPUT_FILE))
print()
print(json.dumps(output, indent=4))

with open(OUTPUT_FILE, "w") as outfile:
    json.dump(output, outfile, indent=4)

```
![[Pasted image 20240918155324.png]]
```bash
#!/usr/bin/env python3

import re
import os
import json
import requests
import urllib.request
from fake_useragent import UserAgent

OUTPUT_DIR = os.environ.get("AGENT_TEMPDIRECTORY", "/tmp")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "policy.json")

BUCKET_NAME = os.environ.get("BUCKET_NAME", "LOCALTESTING123")
DOMINOS_HQ_ADDRESSES = ["203.192.84.184/29", "103.168.16.2/32", "89.207.24.164/32"]
DEVOPS_CIDR_GROUP_NAMES = ["AzureCloud.australiaeast",       # "dominos-au" organisation is in "Australia East"
                           "AzureCloud.australiasoutheast"]  # but build agents can be in either of these
AKAMAI_PROD_DATA_OUTPUT_FILE = os.path.join(OUTPUT_DIR, "akamai_production_cidr_ranges.json")

USER_AGENT = UserAgent()

def gather_akamai_production_ranges():
    # Open script output file (should be in the current directory)
    #
    with open(AKAMAI_PROD_DATA_OUTPUT_FILE) as f:
        data = json.load(f)

    # "Proposed" CIDR list only exists when a map needs to be approved. Otherwise its empty.
    akamai_prod_cidr_ranges = data["akamai_site_shield"]["production"]["6890"]["ipv4"]

    assert(len(akamai_prod_cidr_ranges) > 20), "Doesn't seem like enough CIDR Ranges for Akamai Prod!"

    return akamai_prod_cidr_ranges


try:
    DOWNLOAD_URL = "https://www.microsoft.com/en-us/download/details.aspx?id=56519"
    headers = { 'User-Agent': USER_AGENT.random }
    response = requests.get(DOWNLOAD_URL, headers=headers)
    download_page = response.text
    json_url = re.search(r'href="(?P<url>https://download.microsoft.com[^"]+)', download_page).group("url")
    assert(len(json_url) > 20 and json_url.startswith("https://"))
    print("New way...")
except Exception as e:
    # Microsoft will sometimes block the python request even though we are setting a browser user agent
    DOWNLOAD_URL = "https://www.microsoft.com/en-us/download/confirmation.aspx?id=56519"
    response = urllib.request.urlopen(DOWNLOAD_URL)
    htmlBytes = response.read()
    download_page = htmlBytes.decode("utf8")
    json_url = re.search(r';url=(?P<url>https://[^"]+)', download_page).group("url")
    assert(len(json_url) > 20 and json_url.startswith("https://"))

print("Processing Groups...")
print()
groups = requests.get(json_url).json()

akamai_production_cidr_ranges = gather_akamai_production_ranges()

cidr_ranges = DOMINOS_HQ_ADDRESSES

for g in filter(lambda x: x["name"] in DEVOPS_CIDR_GROUP_NAMES, groups["values"]):
    cidr_ranges += [r for r in g["properties"]["addressPrefixes"] if ":" not in r]   # filter IPv6

cidr_ranges += akamai_production_cidr_ranges

print("{}: {}".format(DEVOPS_CIDR_GROUP_NAMES, cidr_ranges))

bucket_policy = {
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": [
                f"arn:aws:s3:::{BUCKET_NAME}",
                f"arn:aws:s3:::{BUCKET_NAME}/*"
            ],
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": cidr_ranges
                }
            }
        }
    ]
}

print()
print("Bucket Name: {}".format(BUCKET_NAME))
print("Output File: {}".format(OUTPUT_FILE))
print()
print(json.dumps(bucket_policy, indent=4))

with open(OUTPUT_FILE, "w") as f:
    json.dump(bucket_policy, f, indent=4)

```
![[Pasted image 20240918155426.png]]
![[Pasted image 20240918155449.png]]
![[Pasted image 20240918155505.png]]
![[Pasted image 20240918155520.png]]
详细解释一下这个流程：
是的，如果你的 React 项目编译好之后生成了 `dist` 文件夹，通常里面包含了编译后的静态资源（如 HTML、CSS、JavaScript 文件），那么它可以被视为一个静态网站。你可以将这些静态文件上传到 Amazon S3，并通过配置 S3 存储桶来托管和访问这些静态文件。下面是具体的步骤：

### 将 React 项目部署到 S3 的步骤

1. **编译 React 项目**
   - 使用 `yarn build` 或 `npm run build` 命令编译你的 React 项目。编译完成后，`dist` 文件夹（或 `build` 文件夹，取决于你的配置）会包含编译后的静态文件。

2. **创建 S3 存储桶**
   - 登录到 AWS 管理控制台。
   - 导航到 **S3** 服务。
   - 点击 **Create bucket** 按钮，创建一个新的存储桶。
   - 为存储桶选择一个唯一的名称，并选择区域。其他设置可以按需配置。

3. **上传静态文件**
   - 进入你创建的 S3 存储桶。
   - 点击 **Upload** 按钮，选择你的 `dist` 文件夹中的所有静态文件，并上传到存储桶。

4. **配置存储桶为静态网站托管**
   - 在 S3 存储桶的设置中，找到 **Properties** 标签。
   - 向下滚动到 **Static website hosting** 部分，并点击 **Edit**。
   - 选择 **Enable** 静态网站托管。
   - 在 **Index document** 字段中输入 `index.html`（通常这是你的主要 HTML 文件）。
   - 如果有错误页面，可以在 **Error document** 字段中指定，例如 `404.html`。
   - 点击 **Save changes**。

5. **设置存储桶权限**
   - 转到 **Permissions** 标签。
   - 在 **Bucket Policy** 部分，配置存储桶策略，允许公共访问（如果你希望所有人都能访问你的静态网站）。示例策略如下：
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::your-bucket-name/*"
         }
       ]
     }
     ```
   - 请将 `your-bucket-name` 替换为你的存储桶名称。

6. **访问静态网站**
   - 在存储桶的 **Properties** 标签下，找到 **Static website hosting** 部分，记录 **Endpoint** URL。这就是你静态网站的访问地址。
   - 使用浏览器打开这个 URL，你应该能够看到你上传的 React 应用程序。

### 总结

将编译后的 React 项目（即 `dist` 文件夹中的内容）上传到 S3 并配置为静态网站托管后，你的应用程序就可以通过 S3 提供的 URL 进行访问。S3 是一个非常适合托管静态网站的解决方案，因为它提供了高可用性和可靠性，同时简化了静态文件的管理。
![[Pasted image 20240918195450.png]]
```bash
echo
echo "=== Get External IP ==="
curl -s https://icanhazip.com/
echo

#echo "=== Test S3 Bucket Access ==="
#URL=https://dpe-cmrc-ci-syd-olo-site-$COUNTRIES.s3-ap-southeast-2.amazonaws.com/index.html
#echo URL=$URL
#curl -f $URL
#if [[ $? -ne  0 ]]; then
#  echo
#  echo "Build Agent cannot access the S3 Bucket at URL=$URL"
#  echo "Exiting..."
#  exit 1
#fi

echo "=== Test PR Bucket Access ==="

if [[ -z "$BUCKET_NAME" ]]; then
  echo
  echo "BUCKET_NAME is not set!"
  echo "Exiting..."
  exit 1
fi

URL=https://$BUCKET_NAME.s3-ap-southeast-2.amazonaws.com/index.html
echo URL=$URL
curl -f $URL
if [[ $? -ne  0 ]]; then
  echo
  echo "Build Agent cannot access the PR Bucket at URL=$URL"
  echo "Exiting..."
  exit 1
fi

```
![[Pasted image 20240918195530.png]]
```bash
echo
echo "=== Get External IP ==="
curl -s https://icanhazip.com/
echo

echo "=== Test GraphQL ==="
echo

URL=https://olo-ci-graph-at.dominostest.com.au/graphql
VARIABLES='{"searchString": "lux"}'
QUERY='query storeSearchQuery($searchString: String!) { storeSearch(searchString: $searchString) {\n storeNo\n media {\n name\n displayAddress\n __typename\n }\n geo {\n longitude\n latitude\n __typename\n }\n timeZone\n loyalty {\n isEnabled\n __typename\n }\n priceInfo {\n taxRate\n minOrderPricePickup\n minOrderPriceDelivery\n __typename\n }\n __typename }}'
PAYLOAD="{\"variables\": $VARIABLES, \"query\": \"$QUERY\"}"

echo
echo == Syntax Check JSON Payload ==
echo
echo $PAYLOAD | python -m json.tool

echo
echo == Curl Version ==
echo
curl --version

echo
set -ex
#--http0.9 \
curl $URL -H 'Accept-Encoding: gzip, deflate, br' \
          -H 'Content-Type: application/json' \
          -H 'Accept: application/json' \
          -H 'Connection: keep-alive' \
          -H 'DNT: 1' \
          -H 'Origin: https://olo-ci-graph-at.dominostest.com.au' \
          -H 'dpe-country: AU' \
          -H 'dpe-language: en' \
          -H 'dpe-application: ios' \
          -H 'dpe-version: 2' \
          --compressed \
          --data-binary "$PAYLOAD" \
          -v
```
![[Pasted image 20240918195632.png]]
![[Pasted image 20240918194540.png]]
![[Pasted image 20240918195033.png]]
![[Pasted image 20240918195054.png]]
![[Pasted image 20240918195324.png]]
![[Pasted image 20240918195721.png]]
the task group:web OLO - create and deploy PR bucket
![[Pasted image 20240918195909.png]]
![[Pasted image 20240918195948.png]]
![[Pasted image 20240918200605.png]]
![[Pasted image 20240918200620.png]]
![[Pasted image 20240918200652.png]]
![[Pasted image 20240918200727.png]]
![[Pasted image 20240918200827.png]]
![[Pasted image 20240918200855.png]]
![[Pasted image 20240918200909.png]]
![[Pasted image 20240918200923.png]]
![[Pasted image 20240918200936.png]]
![[Pasted image 20240918200955.png]]
![[Pasted image 20240918201007.png]]
![[Pasted image 20240918201031.png]]
```bash
echo ===================================
echo
echo "Download the HTML report from:"

echo "Mobile: https://dev.azure.com/dominos-au/_apis/resources/Containers/$(build.containerId)/reports?itemPath=reports%2Fchrome-mobile-html-report-config_$(COUNTRIES).html"

echo "Desktop: https://dev.azure.com/dominos-au/_apis/resources/Containers/$(build.containerId)/reports?itemPath=reports%2Fchrome-desktop-html-report-config_$(COUNTRIES).html"

echo "Kiosk: https://dev.azure.com/dominos-au/_apis/resources/Containers/$(build.containerId)/reports?itemPath=reports%2Fchrome-kiosk-html-report-config_$(COUNTRIES).html"

echo
echo ===================================
```
![[Pasted image 20240918201142.png]]
