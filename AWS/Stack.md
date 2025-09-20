这个页面显示了在AWS CloudFormation中的多个堆栈(Stack)信息。我们可以从页面上的信息得出以下几点：

1. **堆栈状态**：所有列出的堆栈状态都为"UPDATE_COMPLETE"或"CREATE_COMPLETE"，这表示这些堆栈已经成功创建或更新。
2. **堆栈名称**：堆栈名称包括：
    - olo-stage-syd-services-loyaltyintegration-ft-service-v-1-0
    - olo-stage-syd-dynamodb-loyaltypendingredemption-ft-storage-v-1-0
    - Phoenix-DPZ-Loyalty-Integration
    - 其他与“loyaltyintegration”或“loyalty”相关的堆栈

3. **创建时间**：堆栈的创建时间显示在页面上。

### 如何部署API
从堆栈的名称和描述中，可以推断这些堆栈是用于部署API服务的，具体步骤可能如下：
1. **创建CloudFormation模板**：模板定义了AWS资源（如API Gateway、Lambda函数、DynamoDB表等）。
2. **创建堆栈**：使用CloudFormation模板创建堆栈，这会自动创建并配置所有定义的资源。
3. **更新堆栈**：如果需要修改API服务，可以更新CloudFormation模板并更新堆栈。

### 如何找到相应的服务的URL
要找到部署的API服务的URL，可以按照以下步骤：
1. **查看堆栈的输出**：在CloudFormation控制台中，选择一个堆栈，然后查看其“Outputs”部分。如果模板中有定义API Gateway的输出，该部分会列出API的URL。
2. **检查资源**：查看堆栈中创建的资源，寻找API Gateway（如果有），然后在API Gateway控制台中查看API的详细信息，包括其URL。

具体步骤如下：
1. 选择一个堆栈，比如`olo-stage-syd-services-loyaltyintegration-ft-service-v-1-0`。
2. 点击堆栈名称，进入堆栈的详细信息页面。
3. 在详细信息页面中，导航到“Outputs”标签。如果有API Gateway的URL，它会在这里列出。
4. 如果没有找到输出，检查“Resources”标签，寻找API Gateway资源。点击资源名称，会导航到API Gateway控制台，在那里可以找到API的详细信息和URL。

通过这些步骤，你应该能够找到部署API的URL，并了解如何通过CloudFormation部署和管理API服务。