很好的问题。Databricks 里的角色 (roles) 比较多，以下是一些主要的角色类型 +它们的职责 (基于 Databricks 官方文档 +常用实践)：

---

## Databricks 主要角色 (Roles) 一览

1. **Account-level 管理角色**
    
    - **Account Admin（账户管理员）**
        
        - 管理整个 Databricks 账户 (多个 workspace) 的权限。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/index.html?utm_source=chatgpt.com "Databricks administration introduction | Databricks Documentation"))
            
        - 负责创建 / 删除 workspaces、管理身份 (users / groups / service principals)、设置计费、访问账户控制台等。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/index.html?utm_source=chatgpt.com "Databricks administration introduction | Databricks Documentation"))
            
    - **Marketplace Admin**
        
        - 管理 Databricks Marketplace (如果有这个功能)。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/index.html?utm_source=chatgpt.com "Databricks administration introduction | Databricks Documentation"))
            
    - **Billing Admin（计费管理员）**
        
        - 查看预算、管理 serverless 预算策略等。 ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/databricks/admin/admin-concepts?utm_source=chatgpt.com "Databricks administration overview - Azure Databricks | Microsoft Learn"))
            
    - **Service Principal Manager**
        
        - 管理 service principal（应用身份）的角色分配。 ([Atlan](https://atlan.com/know/databricks/data-access-control/?utm_source=chatgpt.com "Databricks Data Access Control: A Complete Guide for 2024"))
            
    - **Group Manager**
        
        - 管理 group (用户组) 的成员关系。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/users-groups/index.html?utm_source=chatgpt.com "Manage users, service principals, and groups | Databricks on AWS"))
            
2. **Workspace-level 管理角色**
    
    - **Workspace Admin（工作区管理员）**
        
        - 管理单个 workspace 里的设置 (workspace-level identities, cluster, 作业等) 。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/index.html?utm_source=chatgpt.com "Databricks administration introduction | Databricks Documentation"))
            
    - **Metastore Admin（元存储管理员）**
        
        - 管理 Unity Catalog metastore 中的对象 (catalog, schema, 表 etc.) 的权限与所有权。 ([Databricks Documentation](https://docs.databricks.com/administration-guide/index.html?utm_source=chatgpt.com "Databricks administration introduction | Databricks Documentation"))
            
3. **对象级别角色**（更细粒度权限）
    
    - **Owner（拥有者）**
        
        - 对某个具体对象 (notebook、工作簿、作业、表等) 拥有全部权限 (可以读写、分配权限等)。 ([cloudopsnow.in](https://www.cloudopsnow.in/understanding-roles-and-permissions-in-databricks/?utm_source=chatgpt.com "Understanding Roles and Permissions in Databricks: Part-4 - CLoudOps Now!"))
            
    - （除了 owner 以外，还有基于 Unity Catalog 的数据访问权限角色，比如 catalog-level, schema-level, table-level 权限，但这些不是 “角色 (role)” 而是 “权限 (privilege)”）
        

---

如果你说的是 **Unity Catalog** 里面的数据权限 (metastore) 角色 /权限 (roles & privileges)，我也可以罗列那些角色 (比如 catalog-owner, schema-owner, table-owner 等) 给你。要吗？