# Instuctions de déploiement

Afin de déployer une release il faut suivre les étapes suivantes :

- Se placer sur la branche **release**.
- Récupérer en cherry pick les changements et commit.
- Mettre dans le messages de commit **les issues réalisées**.
- Tagger le commit avec **git tag**. Le tag est de la forme **v[NUM DE VERSION]**.
- Pusher le code et les tags via **git push && git push --tags**.
- TravisCI lancera alors une build et les tests. Une fois les tests validés, la release sera publiée dans l'onglet release du github.