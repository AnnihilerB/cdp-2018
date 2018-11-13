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
- id
- username
- password
- email

Pour la table projects :
- id_project
- name
- description
- deposit_url
- sprint_duration

Pour la table sprints :
- id_sprint
- name_sprint
- state_sprint

Pour la table issues :
- id_issue
- description_issue
- state_issue
- difficulty_issue
- priority_issue

Pour la table tasks :
- id_task
- name_task
- state_task

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
