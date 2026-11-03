# Mettre le portfolio sur un serveur (VPS)

Le site est une application **Angular statique**. Une fois construit, ce n'est que du HTML, du CSS, du JavaScript, des images et des polices. Il n'y a ni base de données ni serveur d'application : un serveur web comme nginx suffit.

## 1. Avant de construire : deux choses à remplir

1. **L'hébergeur dans les mentions légales** (obligatoire) : dans `src/app/data/profil.ts`, remplace les deux « À compléter » de `HEBERGEUR` par le nom et l'adresse de l'hébergeur du VPS (par exemple la société qui loue le serveur). Le champ `site` est facultatif.
2. **L'adresse du site** : dans `public/sitemap.xml` et `public/robots.txt`, remplace `DOMAINE-DU-SITE` par le nom de domaine, par exemple `weimin.exemple.fr`.

## 2. Construire le site

Il faut **Node.js 22 LTS** (20.19+ ou 24 marchent aussi).

```bash
git clone https://github.com/C0rbi/portfolio-weimin.git
cd portfolio-weimin
npm ci
npm run build
```

Les fichiers à publier sont dans **`dist/portfolio-weimin/browser/`**.

Si le site n'est pas à la racine du domaine (par exemple `https://exemple.fr/weimin/`), construis avec :

```bash
npm run build -- --base-href /weimin/
```

## 3. Servir avec nginx

Copie le contenu de `dist/portfolio-weimin/browser/` dans le dossier du site, par exemple `/var/www/portfolio-weimin`.

```nginx
server {
    listen 80;
    server_name weimin.exemple.fr;

    root /var/www/portfolio-weimin;
    index index.html;

    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Application Angular : les adresses comme /veille ou /realisations/... renvoient index.html.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Les fichiers JS, CSS et polices ont une empreinte dans leur nom : on peut les garder en cache longtemps.
    location ~* \.(?:js|css|woff2)$ {
        try_files $uri =404;
        expires 1y;
    }
}
```

Ajoute ensuite le HTTPS, par exemple avec Let's Encrypt :

```bash
sudo certbot --nginx -d weimin.exemple.fr
```

À vérifier une fois en ligne :

- l'accueil, puis une adresse directe comme `/veille` ou `/mentions-legales`, qui doivent s'ouvrir sans erreur 404 ;
- le téléchargement du CV ;
- la page « Mentions légales », qui doit afficher le bon hébergeur.

## 4. Mettre à jour le site

```bash
cd portfolio-weimin
git pull
npm ci
npm run build
```

Puis recopie `dist/portfolio-weimin/browser/` dans le dossier du site.

À chaque envoi sur GitHub, l'onglet **Actions** du dépôt lance les tests et la construction : une coche verte veut dire que le code est prêt à être mis en ligne.
