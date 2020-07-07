PROJECT_ID=$(shell gcloud config get-value core/project)
APP=cloud-run-app
all:
	@echo "build  - Build the docker image"
	@echo "deploy - Deploy the image to Cloud Run"
	@echo "clean  - Clean resoruces created in this test"
	@echo "call   - Call the Cloud Run service"
	@echo "webcopy"

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

call2:
	@echo "Calling sec Cloud Run service"
	url=$(shell gcloud run services describe sec --format='value(status.url)' --region us-central1 --platform managed); \
	token="eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkNTU0ZjBjMTJjNjQ3MGZiMTg1MmY3OWRiZjY0ZjhjODQzYmIxZDciLCJ0eXAiOiJKV1QifQ.eyJjYW5leGVjIjp0cnVlLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdDEtMjUzNTIzIiwiYXVkIjoidGVzdDEtMjUzNTIzIiwiYXV0aF90aW1lIjoxNTkzNjI2MjE2LCJ1c2VyX2lkIjoiMzdqbDl1RHNZdmVWdXpSOU1YQVJGcTFxNHNqMSIsInN1YiI6IjM3amw5dURzWXZlVnV6UjlNWEFSRnExcTRzajEiLCJpYXQiOjE1OTM2MjYyMTYsImV4cCI6MTU5MzYyOTgxNiwiZW1haWwiOiJpcF91c2VyMUB4eXouY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImlwX3VzZXIxQHh5ei5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.UqWzgkROiXrgJDZK-2WXDldJtaY1F78FTgdjk0yckfoSL1wFq9iyijHqbwdppkqC9jJFWXUqiyBYhG3NtnuKRSD9gwYLKtDSu0JSJBu5RUP58H8jU-i3nwHVfl5vsRBlD4OgYiPfvZuw-GrcKUdeQDWRhN5LcWRwGtU4iUFos1MWLe4NggsOnN2QXPA79Fu_YdCc6yRgv0eQhhs6ahU9LTkROdQJkjAzmKTSd4MHQgbQE83j9wL-c8NWSpAsiKooDxC2gM2_eXGIw3jzNGTv3oPnTeBz7wYmm80wi8Lif7kgYvI1NuTpLd8HjNP3F9s0QEq3QbIRvShTViUlicq-bA"; \
	curl --request GET \
  		--header "Authorization: Bearer $$token" \
  		--header "Content-Type: text/plain" \
  		$$url/env

call-local:
	@echo "Calling sec Cloud Run service"
	@url="http://localhost:8080"; \
	token=$(shell gcloud auth print-identity-token); \
	curl --request GET \
  		--header "Authorization: Bearer $$token" \
  		--header "Content-Type: text/plain" \
  		$$url/env \
  		--data-binary "ps -ef"

enable:
	gcloud services enable \
		cloudbuild.googleapis.com \
		containerregistry.googleapis.com \
		run.googleapis.com \
		iam.googleapis.com

webcopy:
	gsutil cp html/test1.html gs://$(PROJECT_ID)