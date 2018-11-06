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

## Fichier en charge de la base de données et méthodes

La communication avec la base de données est gérée par le fichier *dataDAO.js*.
La casse doit être respectée.
Ce fichier contient les méthodes suivantes :

- createUser
- logUser
- createIssue
- createProject
- createTask
- createSprint