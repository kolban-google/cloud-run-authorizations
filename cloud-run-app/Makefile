PROJECT_ID=$(shell gcloud config get-value core/project)
APP=cloud-run-app
all:
	@echo "build   - Build the docker image"
	@echo "deploy  - Deploy the image to Cloud Run"
	@echo "clean   - Clean resoruces created in this test"
	@echo "call    - Call the Cloud Run service"

deploy:
	gcloud run deploy $(APP) \
		--image gcr.io/$(PROJECT_ID)/$(APP) \
		--max-instances 1 \
		--platform managed \
		--region us-central1 \
		--allow-unauthenticated
	url=$(shell gcloud run services describe cloud-run-app --format='value(status.url)' --region us-central1 --platform managed); \
	echo "Target URL = $$url"

build:
	gcloud builds submit --tag gcr.io/$(PROJECT_ID)/$(APP)

build-locally:
	docker build . --tag cloud-run-app

run-locally:
	docker run cloud-run-app

clean:
	-gcloud container images delete gcr.io/$(PROJECT_ID)/$(APP) --quiet
	-gcloud run services sec \
		--platform managed \
		--region us-central1 \
		--quiet

call:
	@echo "Calling $(APP) Cloud Run service"
	url=$(shell gcloud run services describe cloud-run-app --format='value(status.url)' --region us-central1 --platform managed); \
	token=$(shell gcloud auth print-identity-token); \
	curl --request GET \
  		--header "Authorization: Bearer $$token" \
  		--header "Content-Type: text/plain" \
  		$$url/operation

enable:
	gcloud services enable \
		cloudbuild.googleapis.com \
		containerregistry.googleapis.com \
		run.googleapis.com \
		iam.googleapis.com