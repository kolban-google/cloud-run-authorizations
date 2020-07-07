#
# auth-admin/Makefile
#

PROJECT_ID=$(shell gcloud config get-value core/project)
all:
	@echo "set-author    - Runs the application to set the claim for john@example.com to be author"
	@echo "set-moderator - Runs the application to set the claim for john@example.com to be moderator"
	@echo "create-sa     - Creates a service account, keys and assigns a policy"

set-author:
	export GOOGLE_APPLICATION_CREDENTIALS=./sa-claims.key; \
	node set-claim.js john@example.com '{"forum-role": "author"}'

set-moderator:
	export GOOGLE_APPLICATION_CREDENTIALS=./sa-claims.key; \
	node set-claim.js john@example.com '{"forum-role": "moderator"}'

create-sa:
	-gcloud iam service-accounts create sa-claims \
		--description="Service account for claims admin" \
		--display-name="Claims Service account"
	gcloud projects add-iam-policy-binding $(PROJECT_ID) \
		--member serviceAccount:sa-claims@$(PROJECT_ID).iam.gserviceaccount.com \
		--role roles/firebase.sdkAdminServiceAgent
	gcloud iam service-accounts keys create sa-claims.key \
		--iam-account sa-claims@$(PROJECT_ID).iam.gserviceaccount.com
