#
# Makefile for web-app folder
#
PROJECT_ID=$(shell gcloud config get-value core/project)

all:
	@echo "webcopy - Copy the html to the GS Bucket"

webcopy:
	-gsutil mb -c standard -l us-central1 gs://$(PROJECT_ID)
	gsutil -h "Cache-Control: no-store" cp -a public-read html/web-app.html gs://$(PROJECT_ID)
	#gsutil acl ch -u AllUsers:R gs://$(PROJECT_ID)/web-app.html
	@echo "Page at: https://storage.googleapis.com/$(PROJECT_ID)/web-app.html"