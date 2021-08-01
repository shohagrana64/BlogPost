---
title: Managing Cloud Infrastructure in Kubernetes using Kubeform - Webinar
date: 2021-07-30
weight: 25
authors:
  - Shohag Rana
tags:
  - cloud-native
  - kubernetes
  - database
  - elasticsearch
  - mariadb
  - memcached
  - mongodb
  - mysql
  - postgresql
  - redis
  - kubedb
---
## Summary

AppsCode held a webinar on "Managing Cloud Infrastructure in Kubernetes using Kubeform". This took place 29th July 2021. The contents of what took place at the webinar is shown below:

1) What is Kubeform
2) Key Features of Kubeform
3) Kubeform Architecture
4) Demo
    * Create the resource
    * Update the resource
    * Delete the resource
5) Upcoming Features
6) Q & A Session

## Description of the Webinar Demo

From this demo we get an in depth view of what kubeform is and how kubeform works. Firstly, we can see the TLS enabled deployment of PostgreSQL. Secondly, we can see the smart upgrade operation. By smart we mean that:

* It will disable the ongoing shard allocation, so that no data interrupted.
* It will upgrade one pod at a time and will wait for it to join the cluster before moving to the next one.
* It will restart pods in order. First, it will restart the Primary node, then the Standby nodes.

Thirdly, we can see the Reconfiguration part of the demo. In this part, we can see the default values of the PostgreSQL cluster being changed according to the required configuration.
In the last part of the video we can see how to backup and restore the PostgreSQL cluster using Stash. All in all, it was an effective webinar.

Take a deep dive into the full webinar below:

<iframe style="height: 500px; width: 800px" src="https://www.youtube.com/embed/xUnakCSVEuQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What Next?

Please try the latest release and give us your valuable feedback.

* If you want to install KubeDB, please follow the installation instruction from [here](https://kubedb.com/docs/v2021.06.23/setup).

* If you want to upgrade KubeDB from a previous version, please follow the upgrade instruction from [here](https://kubedb.com/docs/v2021.06.23/setup/upgrade/).

## Support

To speak with us, please leave a message on [our website](https://appscode.com/contact/).

To join public discussions with the KubeDB community, join us in the [Kubernetes Slack team](https://kubernetes.slack.com/messages/C8149MREV/) channel `#kubedb`. To sign up, use our [Slack inviter](http://slack.kubernetes.io/).

To receive product announcements, follow us on [Twitter](https://twitter.com/KubeDB).

If you have found a bug with KubeDB or want to request for new features, please [file an issue](https://github.com/kubedb/project/issues/new).
