from typing import List
def split_into_chunks(doc_file: str) -> List[str]:
    with open(doc_file, 'r') as file:
        content = file.read()
    return [chunk for chunk in content.split("\n\n")]
    
chunks = split_into_chunks("doc.md")

for i, chunk in enumerate(chunks):
    print(f"[{i}] {chunk}\n")