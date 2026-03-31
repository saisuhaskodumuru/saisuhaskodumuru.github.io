import re

with open("assets/css/style.css", "r") as f:
    content = f.read()

# Replace #footer definition
old_footer = """#footer {
  padding: 15px;
  color: #f4f6fd;
  font-size: 14px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 9999;
  background: #040b14;
  transition: all ease-in-out 0.5s;
}"""
new_footer = """#footer {
  padding: 20px 15px;
  color: #f4f6fd;
  font-size: 14px;
  background: #040b14;
  margin-left: 300px;
  text-align: center;
  transition: all ease-in-out 0.5s;
}"""
content = content.replace(old_footer, new_footer)

# Replace the media query for footer
old_media_footer = """@media (max-width: 1199px) {
  #footer {
    position: static;
    width: auto;
    padding-right: 20px 15px;
  }
}"""
new_media_footer = """@media (max-width: 1199px) {
  #footer {
    margin-left: 0;
  }
}"""
content = content.replace(old_media_footer, new_media_footer)

# Replace the minimized header behavior
minimized_css = """@media (min-width: 1200px) {
  body.header-minimized #header,
  body.header-minimized #footer {
    left: -300px;
  }

  body.header-minimized #main {
    margin-left: 0;
  }
}"""

new_minimized_css = """@media (min-width: 1200px) {
  body.header-minimized #header {
    width: 65px;
    padding: 0 5px;
    overflow: hidden;
  }
  
  body.header-minimized #header .profile img,
  body.header-minimized #header .profile h1,
  body.header-minimized #header .profile .social-links,
  body.header-minimized #header .nav-menu a span {
    display: none;
  }

  body.header-minimized #header .nav-menu a {
    justify-content: center;
    padding: 15px 0;
  }

  body.header-minimized #header .nav-menu a i {
    padding-right: 0;
    margin: 0;
  }

  body.header-minimized #main,
  body.header-minimized #footer {
    margin-left: 65px;
  }
}
"""
content = content.replace(minimized_css, new_minimized_css)

with open("assets/css/style.css", "w") as f:
    f.write(content)
