import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\s*<div class="stack-card-icon">.*?</div>'
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
