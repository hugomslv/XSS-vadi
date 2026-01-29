# Configuration réseau pour XSS-VADI

## 🌐 Votre IP détectée : 157.26.174.107

⚠️ **ATTENTION** : Cette IP est une **IP PUBLIQUE**. Votre application sera accessible depuis Internet !

## 🔥 Configuration du Firewall Windows (IMPORTANT)

### Étape 1 : Ouvrir le port 3000

1. Appuyez sur **Windows + R**
2. Tapez : `wf.msc` et appuyez sur Entrée
3. Cliquez sur **Règles de trafic entrant** (à gauche)
4. Cliquez sur **Nouvelle règle...** (à droite)
5. Sélectionnez **Port** → Suivant
6. Sélectionnez **TCP** et tapez **3000** dans "Ports locaux spécifiques"
7. Cliquez **Suivant** → **Autoriser la connexion**
8. Cochez **Domaine**, **Privé** et **Public**
9. Nom : `XSS-VADI Demo`
10. Cliquez **Terminer**

### Étape 2 : Tester depuis un autre PC

Depuis un PC élève, ouvrez un navigateur et allez sur :
```
http://157.26.174.107:3000
```

## 📱 Pour les élèves

Partagez cette URL avec vos élèves :
```
http://157.26.174.107:3000
```

Identifiants élèves :
- **Nom** : (n'importe quel nom)
- **Mot de passe** : toto

## 🛡️ Sécurité

### Pendant le cours :
- ✅ Le serveur est accessible sur le réseau
- ✅ Les élèves peuvent se connecter

### Après le cours :
- ❌ **Arrêtez le serveur** (`Ctrl+C` dans le terminal)
- ❌ **Désactivez la règle firewall** si nécessaire

### Si vous avez une IP locale (192.168.x.x) :
- ✅ Plus sûr, accessible uniquement sur votre réseau local
- ✅ Pas besoin de firewall externe
- ✅ Idéal pour un TP en salle de classe

## 🔍 Vérifier que ça marche

1. Démarrez le serveur : `npm start`
2. Notez l'IP affichée dans la console
3. Depuis votre PC : `http://localhost:3000`
4. Depuis un PC élève : `http://VOTRE_IP:3000`
5. Les deux doivent fonctionner

## 📊 Voir les captures en temps réel

1. Connectez-vous en admin : `http://VOTRE_IP:3000/admin`
2. Les captures des élèves apparaissent automatiquement toutes les 3 secondes
3. Notification sonore + visuelle quand nouvelle capture

## ❓ Problèmes fréquents

### "Impossible de se connecter" depuis un autre PC
- ✅ Vérifiez que le firewall autorise le port 3000
- ✅ Vérifiez que le serveur est bien démarré
- ✅ Utilisez l'IP exacte affichée au démarrage

### "403 Forbidden" lors de l'exfiltration
- ✅ Supprimez l'ancien commentaire global
- ✅ Copiez le nouveau payload depuis /admin/demo-rickroll
- ✅ Republiez le commentaire

### Pas de captures dans le panneau admin
- ✅ Ouvrez la console navigateur (F12) côté élève
- ✅ Vérifiez les logs `[DEMO]` dans la console
- ✅ Vérifiez les logs `[COLLECT]` dans la console serveur
