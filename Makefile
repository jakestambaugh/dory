build:
	rm -rf dist/
	cd frontend && npm run build
	mv frontend/build dist

deploy:
	gcloud app deploy
