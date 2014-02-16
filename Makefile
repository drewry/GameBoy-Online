build:
	@rm app.nw
	@zip app.nw -r ./
	@nodewebkit app.nw