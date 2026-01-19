<div align="center">
    <img src="icon.png" alt="zUI Helper Logo" width="128"/>
    <h1>zUI Helper</h1>
</div>

**zUI Helper** est l'extension essentielle pour les développeurs FiveM utilisant la librairie d'interface **zUI**.

Elle offre une suite complète d'outils pour accélérer le développement de vos menus : auto-complétion intelligente, documentation intégrée, snippets, et modèles de code prêts à l'emploi.

## 🚀 Fonctionnalités

### 🧠 IntelliSense & Auto-complétion
Ne cherchez plus le nom des fonctions ! L'extension propose automatiquement toutes les méthodes disponibles dans l'objet `zUI` (`CreateMenu`, `Button`, `List`, `Slider`, etc.) directement dans vos fichiers Lua.

### 📖 Documentation au survol (Hover)
Passez votre souris sur n'importe quelle fonction `zUI` pour voir :
*   Sa description complète.
*   La liste détaillée de ses paramètres.
*   **Un exemple de code concret** à copier-coller.

### ⚡ Snippets Intelligents
Générez du code rapidement avec des raccourcis intuitifs :
*   `zinit` : Initialise l'objet zUI (export)
*   `zmenu` : Crée la structure d'un menu complet
*   `zsubmenu` : Crée un sous-menu
*   `zitems` : Bloc `SetItems`
*   `zbtn` : Ajoute un bouton
*   `zlist` : Ajoute une liste déroulante
*   `zcheck` : Ajoute une checkbox
*   `zslider` : Ajoute un slider de valeur
*   `zcolor` : Ajoute un sélecteur de couleur
*   `ztext` : Ajoute du texte
*   `zsep` : Ajoute un séparateur

### 🎨 Color Picker Intégré
Visualisez instantanément les couleurs hexadécimales (`"#FF0000"`) dans votre code Lua. Un clic sur le petit carré de couleur ouvre le sélecteur natif de VS Code pour ajuster la teinte sans quitter l'éditeur.

### 📋 Modèles de Menu (Templates)
Démarrez vos projets en un clin d'œil grâce à la commande :
`zUI: Insert Menu Template`

Choisissez parmi plusieurs modèles :
*   **Basic Menu** : Structure vide prête à remplir.
*   **Vehicle Management** : Exemple complet (spawner, couleur, options).
*   **Settings Menu** : Exemple de menu de configuration (checkboxes, sliders).

## 📦 Installation

1. Installez l'extension depuis le Marketplace.
2. Ouvrez un fichier `.lua` dans votre projet FiveM.
3. Commencez à taper `zUI.` ou utilisez un snippet (ex: `zmenu`).

## 🔧 Utilisation

### Snippets principaux
| Trigger | Description |
| :--- | :--- |
| `zinit` | Initialise l'objet zUI (export) |
| `zmenu` | Crée un menu principal |
| `zsubmenu` | Crée un sous-menu |
| `zitems` | Bloc `SetItems` |
| `zbtn` | Bouton simple |
| `zcheck` | Checkbox |
| `zlist` | Liste déroulante |
| `zslider` | Slider de valeur |

### Commandes
*   `CTRL+SHIFT+P` > **zUI: Insert Menu Template** : Insère un modèle complet.

## 📝 Configuration
Aucune configuration requise. L'extension détecte automatiquement les fichiers Lua.

---
*Développé pour la communauté zUI par Skyneur.*