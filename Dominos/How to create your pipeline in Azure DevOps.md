- [Prerequisite](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Prerequisite)
- [Creating a YAML pipeline in DevOps](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Creating-a-YAML-pipeline-in-DevOps)
    - [Your project has no existing pipeline](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Your-project-has-no-existing-pipeline)
        - [Permissions](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Permissions)
        - [Rename/move](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Rename%2Fmove)
    - [Your project has an existing YAML pipeline](https://dominos.atlassian.net/wiki/spaces/PF/pages/6719308477/How+to+create+your+pipeline+in+Azure+DevOps#Your-project-has-an-existing-YAML-pipeline)

# Prerequisite

- [How to setup and configure Pipeline-as-a-Service](https://dominos.atlassian.net/wiki/spaces/PF/pages/4708205222) has been actioned by the consumer team.
    

# Creating a YAML pipeline in DevOps

If your repository is hosted on Azure DevOps, please follow these instructions:  
[[Legacy] How to create your pipeline in Azure DevOps: DevOps hosted repository](https://dominos.atlassian.net/wiki/spaces/PF/pages/5031757031)

## Your project has no existing pipeline

This is the simplest case and you can use the Platform Pipeline without any additional considerations.

**To create a new yaml pipeline in this scenario:**

Go to the Azure DevOps Pipelines home page for your project (eg. [https://dev.azure.com/dominos-au/OneDigital/_build](https://dev.azure.com/dominos-au/OneDigital/_build "https://dev.azure.com/dominos-au/OneDigital/_build") for repositories in the OneDigital project), then click “New pipeline” on the top right corner:

![[Pasted image 20250827230641.png]]


Select “GitHub” from the list:

![[Pasted image 20250827230656.png]]

You might get a question to authorize Azure Pipelines to connect to GitHub

![[Pasted image 20250827230705.png]]

Search for and select your repository. We will use Platform.DemoProject.DotNet in this example. Make sure the option ‘All repositories’ is selected.

![[Pasted image 20250827230716.png]]

If no repositories are showing up for you and you get below warning – you may have to select a service account:

![[Pasted image 20250827230727.png]]

Select “Existing Azure Pipelines YAML file” from the list that appears:

![[Pasted image 20250827230735.png]]

Select the branch and `azure-pipelines.yml` file, then click “Continue”:

![[Pasted image 20250827230747.png]]

Click “Run” in Review your pipeline YAML:

![[Pasted image 20250827230802.png]]

After a few moments, your pipeline will be created and run for the first time. If your build does not succeed, please contact us for assistance.

![[Pasted image 20250827230817.png]]

### Permissions

Since this is the first run of this pipeline it’s likely you’ll get a message asking for granting permissions.

Will happen for Pipeline Metrics, SBX, Stage and Prod.

You might be able to approve Pipeline Metrics yourself

You will have reach out to Platform Foundations to request approval for the remainder of the steps

#### Pipeline Metrics step

![[Pasted image 20250827230830.png]]

Approval needed for the Pipeline Metrics step

On the warning box, click View and then Permit

![[Pasted image 20250827230846.png]]

![[Pasted image 20250827230854.png]]

Give access to Pipeline Metrics

![[Pasted image 20250827230902.png]]

Give access to Pipeline Metrics

#### SBX, Staging, Production steps

The first run for each of these environments require approval. Please reach out to the Platform Foundations for assistance.

![[Pasted image 20250827230912.png]]

Approval needed for SBX

### Rename/move

You also have the option to rename and move the pipeline if you like

![[Pasted image 20250827230921.png]]

## Your project has an existing YAML pipeline

When you view your pipeline definition, and you see yaml, like the following, you have a “yaml-defined” pipeline.

![[Pasted image 20250827230931.png]]

In this case since our Platform Pipeline is also yaml-defined, Azure DevOps will not create a new pipeline entity and continue showing new builds run on the Platform Pipeline in the existing pipeline page.