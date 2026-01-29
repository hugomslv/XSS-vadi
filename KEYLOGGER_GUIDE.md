# Guide Capture de Mots de Passe (Keylogger XSS)

## Usage pédagogique UNIQUEMENT

Cette fonctionnalité démontre à quel point XSS peut être dangereux.

## Mise en place

1. Admin : Allez sur /admin/demo-rickroll
2. Copiez le "Payload Keylogger"
3. Publiez comme commentaire global
4. Les élèves se connectent
5. Leurs mots de passe apparaissent dans le panneau admin

## Démo en live

Sur votre écran admin projeté :
- Les captures apparaissent en temps réel (3 secondes)
- Les lignes rouges = mot de passe capturé
- Badge "Formulaire" = keylogger actif
- Colonne "Mot de passe" affiche le mot de passe EN CLAIR

## Effet wow

L'élève se connecte normalement, le formulaire fonctionne,
MAIS vous avez capturé son mot de passe sans qu'il s'en rende compte !
