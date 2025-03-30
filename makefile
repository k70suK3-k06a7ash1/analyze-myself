exec:
	deno run --allow-env --allow-net --env-file main.ts 
push:
	git add . && git commit -m 'chore' && git push origin 
	