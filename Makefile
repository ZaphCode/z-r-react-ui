BACKEND_DIR = ~/Development/go/go-ecommerce-project
FRONTEND_WEB_URL = http://localhost:5173

runbackdev:
	cd ${BACKEND_DIR} && go run cmd/main.go dev

runfrontdev:
	sleep 2 && yarn dev

openweb:
	sleep 3 && open ${FRONTEND_WEB_URL}

rundev: 
	$(MAKE) -j 3 runbackdev runfrontdev openweb


.DEFAULT_GOAL := rundev


### a1703613245