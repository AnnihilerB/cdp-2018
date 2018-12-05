# Instuctions de déploiement

Afin de déployer une release il faut suivre les étapes suivantes :

- Se placer sur la branche **release**.
- Merger la branche master sur release.
- Vérifier le fonctionnement de la branche release.
- Tagger le commit avec **git tag**. Le tag est de la forme **v[NUM DE VERSION]**.
- Pusher le code et les tags via **git push && git push --tags**.
- TravisCI lancera alors une build et les tests. Une fois les tests validés, la release sera publiée dans l'onglet release du github. Il suffira de mettre à jour le changelog de la release directement sur Github