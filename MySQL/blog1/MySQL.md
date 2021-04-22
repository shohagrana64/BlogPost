# Deploy MySQL Database in kubernetes cluster using KubeDB
In this tutorial we will use [KubeDB](https://kubedb.com/) to create a MySQL database in kind single node cluster.</br>
For this demo the pre-requisites are:

1) Having a kuberenetes cluster. This tutorial uses [kind](https://kind.sigs.k8s.io/docs/user/quick-start/).

2) Having [Helm 3](https://helm.sh/docs/intro/quickstart/) installed.

3) Having KubeDB installed. Please follow this to [install KubeDB](https://kubedb.com/docs/v2021.03.17/setup/). In this page you can find the [comparison between Community Edition and Enterprise Edition](https://kubedb.com/docs/v2021.03.17/overview/) and install the one you prefer.

Now let's start <mark>Installing MySQL</mark> in the `kubernetes cluster`.</br>
## Installing MySQL in Kubernetes cluster

### Step 1: Creating Namespace
Start by creating a namespace named demo.
```bash
$ kubectl create ns demo
namespace/demo created
```
  ## Step 2: Create a MYSQL Object
  Copy the following and save it in mysql-quickstart.yaml file.
  ```yaml
apiVersion: kubedb.com/v1alpha2
kind: MySQL
metadata:
  name: mysql-quickstart
  namespace: demo
spec:
  version: "8.0.23"
  storageType: Durable
  storage:
    storageClassName: "standard"
    accessModes:
    - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
  terminationPolicy: DoNotTerminate
  ```
  apply the yaml file from terminal:
```
kubectl apply -f mysql-quickstart.yaml
```
This CRD will create the following for us:

![Test](/home/ac/Desktop/mysql-commands/MySQL CRD.png)

### Step 3: Create phpMyAdmin Deployment and Service
Copy the following and save it in demo.yaml file.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: myadmin
  name: myadmin
  namespace: demo
spec:
  replicas: 1
  select  env:
          - name: PMA_ARBITRARY
            value: '1'

---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: myadmin
  name: myadmin
  namespace: demo
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: http
  selector:
    app: myadmin
  type: LoadBalancerntainers:
      - image: phpmyadmin/phpmyadmin:latest
        imagePullPolicy: Always
        name: phpmyadmin
        ports:
        - containerPort: 80
          name: http
          protocol: TCP
        env:
          - name: PMA_ARBITRARY
            value: '1'

---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: myadmin
  name: myadmin
  namespace: demo
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: http
  selector:
    app: myadmin
  type: LoadBalancer
  ```

apply the yaml file from terminal:
```
kubectl apply -f demo.yaml
```

## Step 4: Connect with MySQL database
We will need Server, username and password to connect to the MySQL server.
```bash
$ kubectl get pods mysql-quickstart-0 -n demo -o yaml | grep podIP

  podIP: 10.244.0.18


$ kubectl get secrets -n demo mysql-quickstart-auth -o jsonpath='{.data.\username}' | base64 -d

root 

$ kubectl get secrets -n demo mysql-quickstart-auth -o jsonpath='{.data.\password}' | base64 -d

X1(YHS-gRkF2B~9b 

```
## Step 5: Login to phpMyAdmin

From the previous step, we can see the output that we got was: </br></br>
`Server : 10.244.0.18` </br>
`Username: root`</br>
`Password: X1(YHS-gRkF2B~9b`</br>

Use these credentials to login to phpMyAdmin.</br></br>

### Congratulations! :partying_face: 	:confetti_ball: 	:confetti_ball: We have successfully deployed `mySQL database` in kubernetes cluster using `kubeDB` and a `phpMyAdmin` image.
</br>

Now we can use the phpMyAdmin GUI directly to communicate with the mySQL server, Or we can use the command line to interact with the mySQL server in the following way:

```bash
kubectl exec -it -n demo  <pod-name> -- bash
```
For the tutorial we will use the following command:
```bash
kubectl exec -it -n demo  mysql-quickstart-0 -- bash
```
Now connect to the mySQL server:


```bash
mysql -uroot -p${MYSQL_ROOT_PASSWORD}
```
Here the password is saved in the environment variable MYSQL_ROOT_PASSWORD and as we saw before the username is root.</br>

From here we can do all the MySQL operations such as:

```sql
show Databases;
create Database; 
select* from <database name>; 
```
In the next part we will show how to backup and recover mySQL database using Stash.

If you want to learn more you can see the official documentation [here](https://kubedb.com/docs/v2021.03.17/guides/mysql/quickstart/https://github.com/kubedb/docs/raw/v2021.03.17/docs/guides/mysql/quickstart/yamls)