this is base-platform-pipeline.yml file
```yaml
parameters:

- name: deployment_regions

type: object

default:

- aue

- weu

- jpe

- name: checkCoverage

type: object

default:

policy: disabled

coverageType: lines

coverageThreshold: 80

baseBranchRef: refs/heads/master

warningOnly: false

- name: buildPlatform

type: string

default: dotnet

- name: deploymentPlatforms

type: object

default: []

- name: workingDirectory

type: string

default: $(Build.SourcesDirectory)/$(Build.Repository.Name)

- name: skipCIForNonMaster

type: boolean

default: false

- name: daysToRetainBuild

type: number

default: 730

- name: buildOptions

type: object

default:

continueOnLintError: true

- name: imposterServices

type: object

default: []

  

stages:

- stage: set_build_number

displayName: "Set Build Number"

jobs:

- template: modules/jobs/set-build-number.yaml@templates

parameters:

workingDirectory: ${{parameters.workingDirectory}}

  

- stage: validate_pipeline

displayName: "Pipeline Validation"

dependsOn:

- set_build_number

jobs:

- template: modules/jobs/validate.yaml@templates

parameters:

workingDirectory: ${{parameters.workingDirectory}}

  

- stage: pipeline_metrics

displayName: "Pipeline Metrics"

dependsOn:

- set_build_number

condition: or( eq(variables['Build.SourceBranch'], 'refs/heads/main'), eq(variables['Build.SourceBranch'], 'refs/heads/master'), startsWith(variables['Build.SourceBranch'], 'refs/heads/hotfix/') )

jobs:

- template: modules/jobs/collect-metrics.yaml@templates

parameters:

workingDirectory: ${{parameters.workingDirectory}}

metricSubscription: "dpe-cmrc-stage"

resourceGroup: "dpe-stage-rg-ain-aue-001"

appInsightName: "dpe-stage-ain-aue-001"

  

- stage: imposter_configuration

displayName: "Imposter Configuration"

dependsOn:

- set_build_number

jobs:

- template: modules/jobs/imposter-config-generation.yaml@templates

parameters:

workingDirectory: ${{parameters.workingDirectory}}

imposterServices: ${{parameters.imposterServices}}

  

- stage: build

displayName: Build

dependsOn:

- validate_pipeline

jobs:

- template: modules/jobs/build.yaml@templates

parameters:

checkCoverage: ${{ parameters.checkCoverage }}

workingDirectory: ${{ parameters.workingDirectory }}

buildOptions: ${{ parameters.buildOptions }}

buildPlatform: ${{ parameters.buildPlatform }}

- ${{ if ne(parameters.buildPlatform, 'docker') }}:

- template: modules/jobs/build-container.yaml@templates

parameters:

workingDirectory: ${{ parameters.workingDirectory }}

  

- ${{ each deploymentPlatform in parameters.deploymentPlatforms }}:

- ${{if and(deploymentPlatform.platform, contains('aca, aks', deploymentPlatform.platform))}}:

- template: modules/stages/sbx.yaml@templates

parameters:

buildPlatform: ${{ parameters.buildPlatform }}

deploymentPlatform: ${{ deploymentPlatform.platform }}

bicepConfigVersion: ${{ deploymentPlatform.bicepConfigVersion }}

helmChartVersion: ${{ deploymentPlatform.helmChartVersion }}

subscription: ${{ deploymentPlatform.subscription }}

workingDirectory: ${{ parameters.workingDirectory }}

imposterServices: ${{ parameters.imposterServices }}

  

- template: modules/stages/ci.yaml@templates

parameters:

buildPlatform: ${{ parameters.buildPlatform }}

deploymentPlatform: ${{ deploymentPlatform.platform }}

bicepConfigVersion: ${{ deploymentPlatform.bicepConfigVersion }}

helmChartVersion: ${{ deploymentPlatform.helmChartVersion }}

subscription: ${{ deploymentPlatform.subscription }}

skipCIForNonMaster: ${{ parameters.skipCIForNonMaster }}

workingDirectory: ${{ parameters.workingDirectory }}

imposterServices: ${{ parameters.imposterServices }}

  

- ${{ each region in parameters.deployment_regions }}:

- template: modules/stages/stage.yaml@templates

parameters:

buildPlatform: ${{ parameters.buildPlatform }}

deploymentPlatform: ${{ deploymentPlatform.platform }}

region: ${{ region }}

helmChartVersion: ${{ deploymentPlatform.helmChartVersion }}

bicepConfigVersion: ${{ deploymentPlatform.bicepConfigVersion }}

subscription: ${{ deploymentPlatform.subscription }}

daysToRetainBuild: ${{ parameters.daysToRetainBuild }}

  

- ${{ each region in parameters.deployment_regions }}:

- template: modules/stages/prod.yaml@templates

parameters:

buildPlatform: ${{ parameters.buildPlatform }}

deploymentPlatform: ${{ deploymentPlatform.platform }}

region: ${{ region }}

helmChartVersion: ${{ deploymentPlatform.helmChartVersion }}

bicepConfigVersion: ${{ deploymentPlatform.bicepConfigVersion }}

subscription: ${{ deploymentPlatform.subscription }}

  

- ${{ if eq(deploymentPlatform.platform, 'aks') }}:

- ${{ if ne(parameters.buildPlatform, 'docker') }}:

# The second for-each loop keeps the log out put and status icons in the correct order

- ${{ each region in parameters.deployment_regions }}:

- template: modules/stages/pvt.yaml@templates

parameters:

buildPlatform: ${{ parameters.buildPlatform }}

deploymentPlatform: ${{ deploymentPlatform.platform }}

region: ${{ region }}

subscription: ${{ deploymentPlatform.subscription }}

```


1. [Platform.DemoProject.DotNet] azure-pipelines.yml
```yaml
variables:
- group: "CMRC - Platform.Pipeline"
- group: "CORP - Platform.Pipeline"
- group: "Global - Platform.DemoProject"

# PF Specific overrides - AKS

- name: AKS.Cluster.Namespace.SBX

value: pf

- name: AKS.Cluster.Namespace.CI

value: pf

- name: AKS.Cluster.Namespace.Stage

value: pf

- name: AKS.Cluster.Namespace.Prod

value: pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.Stage.AUE

value: dpe-stage-aks-aue-001-pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.Stage.WEU

value: dpe-stage-aks-weu-001-pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.Stage.JPE

value: dpe-stage-aks-jpe-001-pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.PROD.AUE

value: dpe-prod-aks-aue-001-pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.PROD.WEU

value: dpe-prod-aks-weu-001-pf

- name: Platform.Pipeline.ADO.Environment.AKS.CMRC.PROD.JPE

value: dpe-prod-aks-jpe-001-pf

- name: App.Name2

value: service-demoproject-dotnet

# PF Specific overrides - ACA

- name: Platform.Pipeline.ADO.Environment.ACA.STAGE.AUE

value: dpe-stage-aca-aue-001-pf

- name: Platform.Pipeline.ADO.Environment.ACA.STAGE.WEU

value: dpe-stage-aca-weu-001-pf

- name: Platform.Pipeline.ADO.Environment.ACA.STAGE.JPE

value: dpe-stage-aca-jpe-001-pf

- name: Platform.Pipeline.ADO.Environment.ACA.PROD.AUE

value: dpe-prod-aca-aue-001-pf

- name: Platform.Pipeline.ADO.Environment.ACA.PROD.WEU

value: dpe-prod-aca-weu-001-pf

- name: Platform.Pipeline.ADO.Environment.ACA.PROD.JPE

value: dpe-prod-aca-jpe-001-pf

- name: App.Name

value: service-demoproject-dotnet

- name: App.ShortName

value: demoproject-dotnet

- name: Service.Template.DNS

value: http://service-demoproject-dotnet

# by default enableGatedDeploymentInCI is false #https://dominos.atlassian.net/wiki/spaces/PF/pages/4827088059/Enable+gated+deployment+to+CI

# - name: enableGatedDeploymentInCI

# value: true

  

resources:

repositories:

- repository: templates

type: GitHub

endpoint: dominos-dpe

name: dominos-dpe/Platform.Pipeline

  

trigger:

branches:

include:

- "*"

  

pr:

branches:

include:

- main

- hotfix/*

paths:

exclude:

- .github/**

  

extends:

template: base-platform-pipeline.yml@templates

parameters:

buildPlatform: dotnet8 # default value dotnet6, valid values dotnet6, dotnet8, dotnet6-function4, dotnet8-function4, node16, node18, node20

# imageVersion: aff45b9d7d0bcb7b46104152a829a753e22881e4 # default value is set by the Platform.Pipeline repository

buildOptions:

continueOnLintError: true #https://dominos.atlassian.net/wiki/spaces/PF/pages/5061313528/How+to+stop+a+pipeline+on+Linting+error

deploymentPlatforms: #https://dominos.atlassian.net/wiki/spaces/PF/pages/5032378854/Picking+Deployment+target

- platform: aks

subscription: cmrc

helmChartVersion: $(aks-service-helmchart-version)

# Deployment of ACA in CMRC subscription is only supported for AUE region

# - platform: aca

# subscription: cmrc

# bicepConfigVersion: 3.0.0

# If the Imposter task (consistently) fails to download the Swagger definition for any of these services, it's probably ok to remove

# the service from the list. We don't control the services, so we can't guarantee that the Swagger definition will always be available.

# Remember to make the corresponding change in Platform.DemoProject.DotNet.Tests.Imposter/Program.cs.

imposterServices:

- service-callerid

- service-customer

- service-datasanitisation

- service-offers

- service-payments-edenred

- service-payments-provider-paypal

- service-product

- service-storemenu

- service-simpleorder

- service-supervisor

- service-swrve-scaler

- service-taguchi-membership

- service-targetedoffers

# by default check coverage is disabled ,

# https://dominos.atlassian.net/wiki/spaces/PF/pages/5004394548/How+to+add+build+quality+check

checkCoverage:

policy: fixed

warningOnly: true

coverageThreshold: "90"

# default value for deployment_regions is all 3 regions aue,weu and jpe this can be overriden as below

# https://dominos.atlassian.net/wiki/spaces/PF/pages/4903043509/Configuring+deployment+regions

# deployment_regions:

# - aue

# - weu

# Default skipCIForNonMaster is false

# https://dominos.atlassian.net/wiki/spaces/PF/pages/5130716629/How+to+Skip+deployment+to+CI+when+triggered+from+non-master+main+or+hotfix+branches.

skipCIForNonMaster: true
```

validate.yaml
```yaml
parameters:

- name: workingDirectory

type: string

- name: buildPlatformVersion

type: string

jobs:

- job: validate_deployments

displayName: Validate Deployments

container:

image: dpecoreacraueaks01.azurecr.io/platform.pipeline.python:${{ parameters.buildPlatformVersion }}

endpoint: dpecoreacraueaks01

steps:

- checkout: self

path: s/$(Build.Repository.Name)

- checkout: templates

path: s/Platform.Pipeline

  

- bash: |

poetry config -- http-basic.devops build ${PAT}

poetry install --no-root

displayName: "Install dependencies"

workingDirectory: $(Build.SourcesDirectory)/Platform.Pipeline/modules/tasks/pipeline/validate-pipeline

env:

PAT: $(System.AccessToken)

  

- bash: poetry run python3 src/validate_pipeline_params.py ${{parameters.workingDirectory}}/azure-pipelines.yml

displayName: Validate deployment file

workingDirectory: $(Build.SourcesDirectory)/Platform.Pipeline/modules/tasks/pipeline/validate-pipeline

  

- bash: poetry run python3 src/validate_component_file.py ${{parameters.workingDirectory}}/pipeline/component.yml

displayName: Validate component file

workingDirectory: $(Build.SourcesDirectory)/Platform.Pipeline/modules/tasks/pipeline/validate-pipeline

  

- bash: poetry run python3 src/validate_build_platform_end_of_life.py ${{parameters.workingDirectory}}/azure-pipelines.yml /eol-tracking.yaml

displayName: Validate end-of-life

workingDirectory: $(Build.SourcesDirectory)/Platform.Pipeline/modules/tasks/pipeline/validate-pipeline
```


validate_pipeline_params.py
```python
import sys
from semver.version import Version # type: ignore
from common import load_pipeline_file
def validate_deployment(deployment):

if not isinstance(deployment, dict):

print("##vso[task.logissue type=error]Deployment is not object: " + str(deployment))

return False

if "platform" not in deployment:

print("##vso[task.logissue type=error]Deployment object missing platform")

return False

if "subscription" not in deployment:

print("##vso[task.logissue type=error]Deployment object missing subscription")

return False

if deployment["platform"] == "aca":

if "bicepConfigVersion" not in deployment:

print("##vso[task.logissue type=error]Deployment for aca missing bicepConfigVersion")

return False

if not Version.is_valid(deployment["bicepConfigVersion"]):

print("##vso[task.logissue type=error]The 'bicepConfigVersion' parameter should be valid semver, e.g., 1.0.1")

print("##vso[task.logissue type=error]Please check valid versions at:",

"https://dev.azure.com/dominos-au/Platform/_git/Platform.ACABicep/tags")

return False

if deployment["platform"] == "aks":

if "helmChartVersion" not in deployment:

print("##vso[task.logissue type=error]Deployment for aks missing helmChartVersion")

return False

if not Version.is_valid(deployment["helmChartVersion"]):

print("##vso[task.logissue type=error]The 'helmChartVersion' parameter should be valid semver, e.g., 1.0.1")

print("##vso[task.logissue type=error]Please check valid versions at:",

"https://dev.azure.com/dominos-au/OneDigital/_git/Infra.HelmCharts?path=/charts/dominos-service/Chart.yaml")

return False

if deployment["platform"] == "sta":

if "markets" not in deployment:

print("##vso[task.logissue type=error]Deployment for sta missing market lists")

return False

if "projectName" not in deployment:

print("##vso[task.logissue type=error]Deployment for sta missing projectName")

return False

return True

  
  

def validate_pipeline_object(deployments):

for deployment in deployments:

if not validate_deployment(deployment):

return False

return True

  
  

def validate_build_platform(parameters):

platforms = [

"dotnet6",

"dotnet6-function4",

"dotnet8",

"dotnet8-function4",

"node16",

"node18",

"node20",

"docker",

"python312"

]

if "buildPlatform" in parameters:

if "dotnet" == parameters["buildPlatform"]:

print("##vso[task.logissue type=error]Please use the new buildPlatform names: dotnet6, dotnet8, dotnet6-function4, dotnet8-function4")

return False

if "node" == parameters["buildPlatform"]:

print("##vso[task.logissue type=error]Please use the new buildPlatform names: node16, node18, node20")

return False

if parameters["buildPlatform"] not in platforms:

print("##vso[task.logissue type=error]Invalid buildPlatform: " + parameters["buildPlatform"])

return False

return True

  
  

def validate_build_options(parameters):

if "buildOptions" in parameters:

if "continueOnLintError" in parameters["buildOptions"]:

if not isinstance(parameters["buildOptions"]["continueOnLintError"], bool):

print("##vso[task.logissue type=error]continueOnLintError should be true or false")

return False

if "customArtifacts" in parameters["buildOptions"]:

if not isinstance(parameters["buildOptions"]["customArtifacts"], list):

print("##vso[task.logissue type=error]customArtifacts should be a list")

return False

for artifact in parameters["buildOptions"]["customArtifacts"]:

if not isinstance(artifact, dict):

print("##vso[task.logissue type=error]customArtifacts should be a list of objects")

return False

if "name" not in artifact:

print("##vso[task.logissue type=error]customArtifacts object missing name")

return False

if "path" not in artifact:

print("##vso[task.logissue type=error]customArtifacts object missing path")

return False

return True

  
  

def validate_pipeline_file(filename):

data = load_pipeline_file.load(filename)

if data is False:

return False

  

if validate_build_platform(data["extends"]["parameters"]) is False:

return False

  

if validate_build_options(data["extends"]["parameters"]) is False:

return False

  

# Support for build only pipelines

if "deploymentPlatforms" not in data["extends"]["parameters"]:

return True

  

return validate_pipeline_object(data["extends"]["parameters"]["deploymentPlatforms"])

  
  

if __name__ == "__main__":

if len(sys.argv) < 2:

print("Please provide the filepath of the pipeline yaml file.")

sys.exit(1)

else:

pipeline_file = sys.argv[1]

if validate_pipeline_file(pipeline_file):

print(f"Validation of pipeline file: {pipeline_file} passed successfully.")

sys.exit(0)

else:

print(f"Validation of pipeline file: {pipeline_file} failed.")

print("Check out the confuence page For more details: "

"https://dominos.atlassian.net/wiki/spaces/PF/pages/5032378854/Picking+Deployment+target") # noqa: 503

sys.exit(1)
```

explain:
The provided Python script contains several functions designed to validate the structure and parameters of a pipeline YAML file. Here is a summary of each function:

1. **[`validate_deployment(deployment)`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**:
    
    - Validates a single deployment configuration.
    - Checks if the deployment is a dictionary and contains required keys like [`platform`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) and [`subscription`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - For specific platforms ([`aca`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), [`aks`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), [`sta`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)), it checks for additional required keys and validates their values.
    - Returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) if all checks pass, otherwise logs an error and returns [`False`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
2. **[`validate_pipeline_object(deployments)`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**:
    
    - Iterates over a list of deployments and validates each one using [`validate_deployment`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - Returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) if all deployments are valid, otherwise returns [`False`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
3. **[`validate_build_platform(parameters)`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**:
    
    - Validates the [`buildPlatform`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) parameter.
    - Checks if the [`buildPlatform`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) is among the allowed values.
    - Logs an error and returns [`False`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) if the [`buildPlatform`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) is deprecated or invalid, otherwise returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
4. **[`validate_build_options(parameters)`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**:
    
    - Validates the [`buildOptions`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) parameter.
    - Checks if [`continueOnLintError`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) is a boolean and if [`customArtifacts`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) is a list of dictionaries containing [`name`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) and [`path`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) keys.
    - Logs an error and returns [`False`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) if any validation fails, otherwise returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
5. **[`validate_pipeline_file(filename)`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**:
    
    - Loads the pipeline YAML file using [`load_pipeline_file.load`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - Validates the [`buildPlatform`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) and [`buildOptions`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) parameters.
    - If the pipeline is a build-only pipeline (i.e., it does not contain [`deploymentPlatforms`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)), it returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - Otherwise, it validates the [`deploymentPlatforms`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) using [`validate_pipeline_object`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - Returns [`True`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) if all validations pass, otherwise returns [`False`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
6. **Main Block**:
    
    - Checks if a pipeline file path is provided as a command-line argument.
    - If not, it prints an error message and exits with a status code of 1.
    - If a file path is provided, it validates the pipeline file using [`validate_pipeline_file`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
    - Depending on the validation result, it prints a success or failure message and exits with the appropriate status code. If validation fails, it also provides a link to a Confluence page for more details.