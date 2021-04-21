# How to manage database in Openshift using KubeDB

```bash
~ $ oc get nodes
NAME                 STATUS   ROLES           AGE   VERSION
crc-xl2km-master-0   Ready    master,worker   12d   v1.20.0+bafe7
```
## Step 1: Installing KubeDB 
</br>

### Step 1.1: Get Cluster ID
```bash
~ $ oc get ns kube-system -o=jsonpath='{.metadata.uid}'
08b1259c-5d51-4948-a2de-e2af8e6835a4 

```
###  Step 1.2: Get License

Go to [Appscode License Server](https://license-issuer.appscode.com/) to get the license.txt file. For this tutorial we will use KubeDB Enterprise Edition.
![The KubeVault Overview](licenseserver.png)

### Step 1.3 Install KubeDB
We need [helm](https://helm.sh/docs/intro/install/) to install KubeDB. It can be installed by the following commands:
```bash
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

Finally we install `KubeDB`

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update

$ helm search repo appscode/kubedb
NAME                        CHART VERSION APP VERSION DESCRIPTION
appscode/kubedb             v2021.04.16   v2021.04.16 KubeDB by AppsCode - Production ready databases...
appscode/kubedb-autoscaler  v0.3.0        v0.3.0      KubeDB Autoscaler by AppsCode - Autoscale KubeD...
appscode/kubedb-catalog     v0.18.0       v0.18.0     KubeDB Catalog by AppsCode - Catalog for databa...
appscode/kubedb-community   v0.18.0       v0.18.0     KubeDB Community by AppsCode - Community featur...
appscode/kubedb-crds        v0.18.0       v0.18.0     KubeDB Custom Resource Definitions
appscode/kubedb-enterprise  v0.5.0        v0.5.0      KubeDB Enterprise by AppsCode - Enterprise feat...

# Install KubeDB Enterprise operator chart
$ helm install kubedb appscode/kubedb \
    --version v2021.04.16 \
    --namespace kube-system \
    --set-file global.license=/path/to/the/license.txt \
    --set kubedb-enterprise.enabled=true \
    --set kubedb-autoscaler.enabled=true
```
Let's verify the installation:
```bash
watch oc get pods --all-namespaces -l "app.kubernetes
Every 2.0s: oc get pods --all-namespaces -l app.kubernetes.io/instance=kubedb                                                                                                      Shohag: Wed Apr 21 10:08:54 2021

NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE
kube-system   kubedb-kubedb-autoscaler-569f66dbbc-qqmmb   1/1     Running   0          3m28s
kube-system   kubedb-kubedb-community-b6469fb9c-4hwbh     1/1     Running   0          3m28s
kube-system   kubedb-kubedb-enterprise-b658c95fc-kwqt6    1/1     Running   0          3m28s

```
We can see the CRD Groups that have been registered by the operator by running the following command:
```bash
 oc get crd -l app.kubernetes.io/name=kubedb
```

# Step 2: Deploying Database

> Now we can Install a number of common databases with the help of KubeDB.

## Deploying MySQL Database
Let's first create a Namespace in which we will deploy the database.
```bash
oc create ns demo
```
Now lets apply the following yaml file:
```yaml
apiVersion: kubedb.com/v1alpha2
kind: MySQL
metadata:
  name: mysql-quickstart
  namespace: demo
spec:
  version: "8.0.23-v1"
  storageType: Durable
  storage:
    storageClassName: "local-path"
    accessModes:
    - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
  terminationPolicy: WipeOut
```
This yaml uses MySQL CRD.
> NOTE: This might fail if correct permissions and storage class is not set. Let's make some checks so that the above yaml does not fail.
### Check 1: StorageClass check
Let's First check if storageclass is available:
```bash
oc get storageclass
NAME         PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION
local-path   rancher.io/local-path   Delete          WaitForFirstConsumer   false    
```
If you dont see the above output then you should run:
```bash
oc apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
```
This will create the storage-class named local-path.

### Check 2: Correct Permissions

If you apply the above yaml and it is stuck in provisioning state then the pvc does not have required permissions. In such a case you should run:
```bash
oc adm policy add-scc-to-user privileged system:serviceaccount:local-path-storage:local-path-provisioner-service-account
```
This command will give the required permissions. </br>
### Deploy MySQL CRD
Once these are handled correctly and the MySQL CRD is deployed you will see that the following are created:
```bash
Every 2.0s: oc get all -n demo                                     Shohag: Wed Apr 21 13:19:10 2021

NAME                     READY   STATUS    RESTARTS   AGE
pod/mysql-quickstart-0   1/1     Running   0          31m

NAME                            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/mysql-quickstart        ClusterIP   10.217.5.195   <none>        3306/TCP   31m
service/mysql-quickstart-pods   ClusterIP   None           <none>        3306/TCP   31m

NAME                                READY   AGE
statefulset.apps/mysql-quickstart   1/1     31m

NAME                                                  TYPE               VERSION   AGE
appbinding.appcatalog.appscode.com/mysql-quickstart   kubedb.com/mysql   8.0.23    31m

NAME                                VERSION     STATUS   AGE
mysql.kubedb.com/mysql-quickstart   8.0.23-v1   Ready    31m
```


