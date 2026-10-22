Optional CSS rebuild (Node.js required only on developer machine):
From this development directory run:
npx --yes tailwindcss@3.4.17 -c tailwind.config.cjs -i input.css -o ../public_html/assets/css/site.css --content ../public_html/index.html --minify

Normal hosting needs only the contents of public_html. No build is needed.
