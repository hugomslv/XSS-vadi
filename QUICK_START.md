# 🚀 Guide de démarrage rapide

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

## Trouver votre IP

```bash
node find-ip.js
```

Ou sous Windows:
```bash
ipconfig
```

## Accès

- **Local:** http://localhost:3000
- **Réseau:** http://[VOTRE_IP]:3000

## Comptes

### Élèves
- **Nom:** N'importe quel prénom
- **Mot de passe:** `toto`

### Admin
- **Login:** `admin`
- **Mot de passe:** `admin**123`

## Flux de démonstration suggéré

1. Les élèves se connectent et explorent les chapitres 1-3
2. L'admin prépare la démo Rickroll (Chapitre 4 ou `/admin/demo-rickroll`)
3. Les élèves visitent un chapitre et sont "attaqués"
4. L'admin montre les captures dans le panneau admin
5. Discussion sur les défenses (`/defense`)

## Problèmes courants

### Port déjà utilisé
Modifiez le port dans `server.js`:
```javascript
const PORT = 3001; // au lieu de 3000
```

### Les élèves ne peuvent pas se connecter
- Vérifiez le pare-feu Windows
- Assurez-vous d'être sur le même réseau
- Utilisez `node find-ip.js` pour vérifier l'IP

### Réinitialiser l'application
Supprimez `data.json` et redémarrez le serveur.

## ⚠️ Rappel de sécurité

Cette application est VOLONTAIREMENT VULNÉRABLE.
**NE PAS déployer sur Internet !**
Usage pédagogique local uniquement.
