# Spécifications techniques de la base de données

La base de données sera nommée *cdp*.
Tout le code doit respecter la casse présente dans ce fichier.

## Tables

- users
- projects
- sprints
- issues
- tasks

## Champs

Pour la table users :

- name
- password

Pour la table projects :

- name
- description
- repo
- backlog

Pour la table sprints :

- length
- name

Pour la table issues :

- description
- state
- difficulty
- priority
- planification (quel sprint)

Pour la table tasks :

- description