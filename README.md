# cloud-run-authorizations
Sample artifacts for the Cloud Run authorizations article.

The repository contains folders separating out functions.  The `cloud-run-app` folder
contains the arifacts needed to build a docker container that exposes a REST interface at
`/operation`.  The container can be built by running `make build` which passes the artifacts to 
Cloud Build.  The resulting container can be found at `gcr.io/[PROJECT]/cloud-run-app`.

We can deploy the container to Cloud Run by executing `make deploy`.  Take note of the URL
used to call the service as this will be needed later.

The second folder is called `web-app` and provides HTML that should be served to a browser.
The web page contained in the `html` folder in the file called `web-app.html` presents a 
sign-in page.  Once the user signs-in, the `Call Cloud Run` button can be clicked and
a call is made to the deployed container passing in the token provided by the sign-in
process.

The folder called `auth-admin` contains the recipes to set the claim on a user. There is
a Makefile with the following rules:

* make create-sa     - Creates a service account and downloads a key file.
* make set-author    - Sets the `forum-role` claim to be `author`.
* make set-moderator - Sets the `forum-role` claim be `moderator`.

We are working with a user identified as `john@example.com`.