
# Tutorial 1
# Kubernetes + Docker + NestJS + NextJS + ReactJS + Istio + RabbiMQ + MongoDB + Kind
# Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Kind](https://kind.sigs.k8s.io/)
- [Istio](https://istio.io/latest/docs/setup/getting-started/)

# Steps
```bash
# Create Kind cluster
kind create cluster --name tutorial-1 --config kind/cluster.config.yaml

# Verify cluster
kind get clusters

# Specify the cluster name as a context in kubectl
kubectl cluster-info --context tutorial-1

# Delete cluster (optional)
kind delete cluster

# Get namespaces (https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
kubectl get namespaces

# Create namespaces
kubectl apply -f ./k8s/namespaces

# Create nginx pod ()
kubectl apply -f k8s/pods/nginx.pod.yaml

# Verify nginx pod status
kubectl get pods -n sales -o wide

# Validate labels (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
kubectl get pods -l app=nginx -n sales

# Namespace quota
kubectl apply -f ./k8s/resource-quotas

# Validate namespace quota (https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-pod-namespace/)
kubectl get resourcequota sales-max-pods -n sales

# Expose nginx pod
kubectl apply -f ./k8s/services

# Get service info
kubectl get services -n sales -o wide

# View nginx on browser
kubectl port-forward -n sales service/nginx-svc 8080:80

# Network policies (https://kubernetes.io/docs/concepts/services-networking/network-policies/)

# RabbitMQ (https://www.rabbitmq.com/kubernetes/operator/operator-overview.html)
# Using operator (https://www.rabbitmq.com/kubernetes/operator/using-operator.html)
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
kubectl apply -f rabbitmq/instance.yaml
kubectl get pods -n rabbitmq-system

# Get rabbitmq admin credentials
kubectl get secrets -n rabbitmq-system
kubectl -n rabbitmq-system get secret rabbitmq-cluster-default-user -o jsonpath="{.data.username}" | base64 --decode
# Output: default_user_588rImqllSXVGS5H86t
kubectl -n rabbitmq-system get secret rabbitmq-cluster-default-user -o jsonpath="{.data.password}" | base64 --decode
# Output: SQEyCxHFxqLiLaMV6lcem8_KvxI28dPD

kubectl port-forward -n rabbitmq-system service/rabbitmq-cluster 15672:15672

# Mongo Kubernetes Operator
# https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/README.md
# https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/docs/install-upgrade.md
# https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/docs/install-upgrade.md#procedure-using-kubectl
cd mongodb-kubernetes-operator
kubectl create namespace mongo
kubectl apply -f config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml
kubectl get crd/mongodbcommunity.mongodbcommunity.mongodb.com
kubectl apply -k config/rbac/ --namespace mongo
kubectl get role mongodb-kubernetes-operator --namespace mongo
kubectl get rolebinding mongodb-kubernetes-operator --namespace mongo
kubectl get serviceaccount mongodb-kubernetes-operator --namespace mongo
kubectl create -f config/manager/manager.yaml --namespace mongo
kubectl get pods --namespace mongo

# Create replica
# Replace <your-password-here> in config/samples/mongodb.com_v1_mongodbcommunity_cr.yaml to the password you wish to use.
# Replace members line 7
# Add additional roles
# Replace secure password
kubectl apply -f config/samples/mongodb.com_v1_mongodbcommunity_cr.yaml --namespace mongo

# Check deploy status
kubectl get mongodbcommunity --namespace mongo

# List mongo services
kubectl get services -n mongo

# List mongo secrets
kubectl get secrets -n mongo

# Get connection string
kubectl get secret mongo mongodb-admin-root -n mongo -o json | jq -r '.data | with_entries(.value |= @base64d)'

# Port-forwarding
kubectl port-forward -n mongo service/mongodb-svc 27017:27017

# Create users-backend
nest new users-backend
cd users-backend
npm i class-validator class-transformer dayjs helmet dotenv @nestjs/mongoose mongoose

# https://mockaroo.com
generate many users

npm run start:dev
## Create getHealth Endpoint

# Create notifications-backend
nest new notifications-backend
npm i --save amqplib amqp-connection-manager @nestjs/microservices

```


