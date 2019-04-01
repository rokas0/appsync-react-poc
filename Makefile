start_react:
	cd app-react &&npm install && npm run start

start_graphql:
	cd graphql && npm install && serverless dynamodb install --localPath ./bin && serverless offline start