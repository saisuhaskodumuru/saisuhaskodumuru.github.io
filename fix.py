import re

with open("assets/css/style.css", "r") as f:
    css = f.read()

# Replace #footer class
footer_regex = re.compile(r'#footer\s*\{[^}]+\}')
new_footer = """#footer {
  padding: 20px 15px;
  color: #f4f6fd;
  font-size: 14px;
  background: #040b14;
  margin-left: 0 !important;
  width: 100% !important;
  text-align: center;
  position: relative;
  z-index: 9999;
  border-top: 1px solid #1a1a1a;
}"""
css = footer_regex.sub(new_footer, css, count=1)

# Ensure minimized sidebar is highly visible
header_min_regex = re.compile(r'@media\s*\(min-width:\s*1200px\)\s*\{\s*body\.header-minimized\s*#header\s*\{.*?(?=^$|\Z)', re.MULTILINE | re.DOTALL)
new_header_min = """@media (min-width: 1200px) {
  body.header-minimized #header {
    width: 80px !important;
    padding: 0 10px !important;
    left: 0 !important;
    overflow: hidden !important;
    border-right: 1px solid #1a1a1a;
  }
  
  body.header-minimized #header .profile,
  body.header-minimized #header .nav-menu a span {
    display: none !important;
  }

  body.header-minimized #header .nav-menu a {
    justify-content: center !important;
    padding: 15px 0 !important;
  }

  body.header-minimized #header .nav-menu a i {
    padding-right: 0 !important;
    margin: 0 !important;
    font-size: 24px !important;
    display: block !important;
  }

  body.header-minimized #main {
    margin-left: 80px !important;
  }
}
"""
css = header_min_regex.sub(new_header_min, css)

with open("assets/css/style.css", "w") as f:
    f.write(css)
print("Updated style.css")
