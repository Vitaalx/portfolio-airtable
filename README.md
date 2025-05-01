# Portfolio Ingénierie du Web

Ce projet est un portfolio développé pour la filière IW. Il utilise Airtable comme base de données pour stocker les informations.

---

## Installation

### Prérequis

- [Docker](https://www.docker.com/) installé sur votre machine.

### Configuration

Dans chacun des dossiers suivants :

- `/vue`
- `/duplo`

Effectuez les opérations suivantes :

1. Copier le fichier `.env.local.example` :

   ```bash
   cp .env.local.example .env.local
   ```

2. Remplir les variables d’environnement dans le fichier ```.env.local```.

### Lancement du projet

```bash
git clone https://github.com/utilisateur/portfolio-airtable.git

cd portfolio-airtable

docker compose up
```

### Accès à l'application

- Interface utilisateur (front-end) : <http://localhost:3000>.
- API (back-end Duplo) : <http://localhost:1506>.
