// Comment at the top of a .md or .cs file for Copilot to read
/**
 * Goal: Generate a comprehensive Mermaid flowchart showing the complete architecture flow of this repository.
 * 
 * Requirements:
 * 1. Start with Client Applications connecting to WebApi Layer
 * 2. Show API Controllers (scan Controllers/ folder for actual controller classes)
 * 3. Show Application Services layer (scan *.App project for service classes)
 * 4. Show Data Access layer (scan for Repository classes and database connections)
 * 5. Include external service dependencies
 * 6. Use subgraphs to group related components by layer
 * 7. Show the actual class names from the codebase, not generic names
 * 8. Follow clean architecture principles - show dependency flow from outer to inner layers
 * 
 * Structure:
 * - graph TB (top to bottom)
 * - Client → API Controllers → Application Services → Data Access
 * - Include external services as separate connections
 * - Use meaningful node labels with actual class names
 * - Group by architectural layers using subgraph
 * 
 * Scan these folders/projects for actual class names:
 * - Controllers/ (for API controllers)
 * - *.App/ (for application services)  
 * - *.Data/ or similar (for repositories)
 * - Look for external service clients
 * - Check for database connections (CosmosDB, SQL, etc.)
 */

Generate a Mermaid flowchart (graph TB) showing the complete architecture of this repository:

1. Analyze the actual codebase structure
2. Show flow: Client → API Controllers → Application Services → Data Access
3. Use subgraphs for each layer
4. Include actual class names from the code (not generic names)
5. Show external service dependencies
6. Follow clean architecture dependency flow

Scan for:
- Controllers in WebApi project
- Services in *.App project  
- Repositories in data layer
- External service clients
- Database connections

Use the same format as the example Mermaid diagram provided.