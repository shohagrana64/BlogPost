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