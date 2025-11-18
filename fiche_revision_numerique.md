# Fiche de Révision - Sciences du Numérique

Cette fiche est structurée pour une révision efficace : une synthèse des concepts clés en haut, avec des liens vers des explications détaillées plus bas.

---

## Synthèse : Concepts et Définitions Clés

### 1. Systèmes d'Exploitation (OS)

*   **Processus vs Thread :** Un processus a une mémoire isolée; les threads d'un processus partagent la même mémoire --- [détails](#ex-proc-thread)
*   **Ordonnancement :** Gestion de l'accès au processeur (`FIFO`, `Round Robin`, `SJF`, `SRTF`) --- [détails](#ex-ordo)
    *   **Temps de séjour** = Temps de fin - Temps d'arrivée
    *   **Temps d'attente** = Temps de séjour - Temps d'exécution
*   **Synchronisation :**
    *   **Condition de Concurrence :** Bug lié à l'ordre d'exécution imprévisible de threads --- [détails](#ex-race)
    *   **Interblocage (Deadlock) :** Attente mutuelle de ressources entre plusieurs processus. 4 conditions : Exclusion mutuelle, Détention et attente, Pas de préemption, Attente circulaire --- [détails](#ex-deadlock)
*   **Gestion de la mémoire :**
    *   **Mémoire Virtuelle :** Isolation des processus et extension de la RAM via le disque --- [détails](#ex-mem-virt)
    *   **Pagination :** Division de la mémoire en blocs de taille fixe (pages).
    *   **Fragmentation interne :** Espace perdu dans la dernière page allouée à un processus. --- [détails](#ex-pagination)
*   **Systèmes de fichiers :**
    *   **I-node :** Structure contenant les métadonnées d'un fichier, incluant des pointeurs vers les blocs de données.
    *   **Taille max de fichier** = (Nb pointeurs directs + Nb pointeurs indirects × (Taille bloc / Taille pointeur)) × Taille bloc --- [détails](#ex-inode)


### 2. Algorithmique et Structures de Données

*   **Complexité Big O :** Notation pour l'efficacité d'un algorithme (`O(1)`, `O(log n)`, `O(n)`, `O(n log n)`, `O(n²)`, `O(2^n)`) --- [détails](#ex-big-o)
*   **Master Theorem :** Pour `T(n) = aT(n/b) + O(n^d)`, permet de trouver la complexité des algos récursifs. --- [détails](#ex-master-theorem)
*   **Classes de Problèmes :**
    *   **P :** Solution trouvable en temps polynomial.
    *   **NP :** Solution vérifiable en temps polynomial.
    *   **NP-complet :** Les problèmes les plus difficiles de NP (ex: Voyageur de commerce). --- [détails](#ex-np)
*   **Table de Hachage :** Accès en `O(1)` en moyenne. Gestion des collisions (sondage linéaire, double hachage). --- [détails](#ex-hash)
*   **Graphes :**
    *   **Terminologie :** Sommets, arêtes, degré. **Lemme des poignées de main** : \( \sum \text{deg}(v) = 2 \times |\text{Arêtes}| \) --- [détails](#ex-graph-term)
    *   **Représentations :** Matrice d'adjacence vs Liste d'adjacence --- [détails](#ex-graph-rep)
    *   **Parcours :** BFS (en largeur, plus court chemin en arêtes) et DFS (en profondeur, exploration exhaustive). --- [détails](#ex-graph-parcours)
    *   **Algorithmes :** Dijkstra (plus court chemin pondéré), Kruskal/Prim (arbre couvrant de poids minimum). --- [détails](#ex-graph-algo)

### 3. Cryptographie

*   **Symétrique vs Asymétrique :** Même clé (AES) vs paire de clés publique/privée (RSA) --- [détails](#ex-crypto-sym)
*   **Chiffrement de César :** Décalage simple de l'alphabet. --- [détails](#ex-cesar)
*   **RSA :**
    1.  Choisir `p`, `q` (premiers).
    2.  `n = p \times q`.
    3.  `φ(n) = (p-1)(q-1)`.
    4.  Choisir `e` premier avec `φ(n)`.
    5.  Calculer `d` tel que `d \times e \equiv 1 \pmod{\phi(n)}` (inverse modulaire). --- [détails](#ex-rsa)
*   **Signature Numérique :** Garantit Authenticité, Intégrité, Non-répudiation (créée avec la clé privée, vérifiée avec la publique) --- [détails](#ex-signature)
*   **Hachage et Salage :** Empreinte à sens unique (SHA-256) + ajout d'aléa pour contrer les tables arc-en-ciel. --- [détails](#ex-hachage)
*   **Arithmétique modulaire :**
    *   **Algorithme d'Euclide :** Calcul du PGCD.
    *   **Petit Théorème de Fermat :** Si `p` est premier, `a^{p-1} \equiv 1 \pmod p`. --- [détails](#ex-crypto-theo)

### 4. Green IT et Analyse de Données

*   **Green IT :**
    *   **PUE (Power Usage Effectiveness) :** \( \text{PUE} = \frac{\text{Énergie totale du datacenter}}{\text{Énergie des équipements IT}} \) (proche de 1 = efficace) --- [détails](#ex-greenit)
    *   **Consommation (kWh) :** \( \frac{\text{Puissance (W)} \times \text{Heures d'utilisation}}{1000} \) --- [détails](#ex-greenit)
*   **Python pour la data :**
    *   **Pandas :** `DataFrame`, `read_csv`, `groupby()`, `mean()`, filtrage booléen.
    *   **NumPy :** `array`, `dot()` (produit scalaire). --- [détails](#ex-pandas)

---
---

## Explications et Exemples

### <a name="ex-proc-thread"></a>Processus vs Thread
Un **processus** est un programme isolé. Si vous ouvrez deux fenêtres de votre navigateur, ce sont deux processus distincts. Si l'un plante, l'autre continue de fonctionner. Un **thread** est une sous-tâche au sein d'un processus. Dans votre traitement de texte, un thread peut vérifier l'orthographe pendant qu'un autre enregistre votre document en arrière-plan. Ils partagent la même mémoire (le document sur lequel vous travaillez).

### <a name="ex-ordo"></a>Ordonnancement
*   **FIFO (First-In, First-Out) :** Le premier arrivé est le premier servi.
    *   **Exemple :** P1(10ms), P2(2ms).
        *   P1 arrive à t=0, attend 0ms, finit à t=10. Séjour = 10ms.
        *   P2 arrive à t=0, attend 10ms, finit à t=12. Séjour = 12ms.
        *   Séjour moyen = (10+12)/2 = 11ms.
*   **SJF (Shortest Job First) :** Le plus court est servi en premier.
    *   **Exemple :** P1(10ms), P2(2ms).
        *   P2 arrive à t=0, attend 0ms, finit à t=2. Séjour = 2ms.
        *   P1 arrive à t=0, attend 2ms, finit à t=12. Séjour = 12ms.
        *   Séjour moyen = (2+12)/2 = 7ms. (Meilleur que FIFO)
*   **SRTF (Shortest Remaining Time First) :** SJF préemptif. Si un processus plus court arrive, il prend la main.
    *   **Exemple :** P1(8ms, arr 0), P2(4ms, arr 1).
        *   t=0: P1 commence.
        *   t=1: P2 arrive. Il reste 7ms à P1, P2 ne dure que 4ms. P1 est préempté.
        *   t=1 à t=5: P2 s'exécute et finit.
        *   t=5: P1 reprend pour ses 7ms restantes.
*   **Round Robin :** Temps partagé équitable.
    *   **Exemple :** P1(10ms), P2(3ms) avec quantum=4ms.
        *   t=0-4: P1 s'exécute (reste 6ms).
        *   t=4-7: P2 s'exécute et finit.
        *   t=7-11: P1 s'exécute (reste 2ms).
        *   t=11-13: P1 s'exécute et finit.

### <a name="ex-race"></a>Condition de Concurrence
Imaginez deux personnes (threads) essayant de retirer 100€ d'un compte commun de 150€. Les deux lisent le solde (150€). Les deux autorisent le retrait. Le solde final devrait être -50€, mais à cause d'un mauvais ordre d'exécution, il pourrait finir à 50€. Solution : Utiliser des verrous (mutex) ou des sémaphores.

### <a name="ex-deadlock"></a>Interblocage (Deadlock)
Deux personnes au milieu d'un couloir étroit. La personne A veut aller à droite, la personne B veut aller à gauche. A ne bougera pas tant que B ne bouge pas, et B ne bougera pas tant que A ne bouge pas. Ils sont bloqués.

### <a name="ex-mem-virt"></a>Mémoire Virtuelle
Votre ordinateur a 8Go de RAM, mais vous ouvrez des programmes qui en demandent 12Go. L'OS utilise une partie du disque dur pour stocker temporairement les 4Go "en trop", donnant l'illusion que la RAM est infinie.

### <a name="ex-pagination"></a>Pagination et Fragmentation
*   **Exemple :** Pages de 4Ko. Un processus de 10Ko a besoin de \( \lceil 10/4 \rceil = 3 \) pages.
    *   Les deux premières pages (8Ko) sont pleines.
    *   La troisième page contient les 2Ko restants.
    *   **Fragmentation interne** = Espace perdu dans la dernière page = 4Ko - 2Ko = 2Ko.

### <a name="ex-inode"></a>Calcul de taille de fichier (i-node)
*   **Exemple :** Blocs de 4Ko (4096 octets), pointeurs de 4 octets. 12 pointeurs directs, 1 indirect.
    *   Taille via pointeurs directs = 12 × 4Ko = 48Ko.
    *   Un bloc indirect contient 4096 / 4 = 1024 pointeurs.
    *   Taille via pointeur indirect = 1024 × 4Ko = 4096Ko = 4Mo.
    *   Taille max = 48Ko + 4Mo.

### <a name="ex-big-o"></a>Complexité Big O
C'est comme estimer la durée d'une tâche :
*   `O(1)` : Accéder à un tableau par son index `tab[5]`.
*   `O(log n)` : Recherche dichotomique.
*   `O(n)` : Parcourir un tableau.
*   `O(n²)` : Boucles imbriquées `for i in n: for j in n:`.
*   `O(2^n)` : Certains problèmes de backtracking.

### <a name="ex-master-theorem"></a>Master Theorem
Pour `T(n) = aT(n/b) + O(n^d)`:
*   Si `log_b(a) > d` -> complexité `O(n^{log_b(a)})`.
*   Si `log_b(a) = d` -> complexité `O(n^d log n)`.
*   Si `log_b(a) < d` -> complexité `O(n^d)`.
*   **Exemple :** `T(n) = 2T(n/2) + O(n)`. a=2, b=2, d=1. `log_2(2) = 1`, donc cas 2 -> `O(n log n)`.

### <a name="ex-np"></a>Problèmes NP-complets
*   **Exemple (Voyageur de commerce) :** Trouver le plus court chemin qui passe par une liste de villes une seule fois. Facile avec 5 villes, mais le temps de calcul explose de manière exponentielle avec 50 villes, rendant la solution exacte impossible à trouver en un temps raisonnable.

### <a name="ex-hash"></a>Table de Hachage
*   **Sondage linéaire :** Si la case `h(k)` est occupée, on essaie `h(k)+1`, `h(k)+2`, etc.
*   **Exemple :** Taille 10, h(k)=k%10. Insérer 12, 22, 32.
    *   12 va en 2.
    *   22 veut aller en 2, mais c'est pris. Il va en 3.
    *   32 veut aller en 2, c'est pris. 3 est pris. Il va en 4.

### <a name="ex-graph-term"></a>Terminologie des Graphes
*   **Lemme des poignées de main :** Dans un graphe non orienté, la somme des degrés de tous les sommets est égale à deux fois le nombre d'arêtes. Utile pour vérifier la validité d'un graphe.

### <a name="ex-graph-rep"></a>Représentations de Graphes
*   **Matrice d'adjacence :** Un grand tableau où la cellule (i, j) contient 1 s'il y a une arête. Rapide pour voir s'il y a une route, mais prend `O(V²)` place.
*   **Liste d'adjacence :** Pour chaque sommet, on liste ses voisins. Plus compact pour les graphes peu denses (`O(V+E)` place).

### <a name="ex-graph-parcours"></a>Parcours de Graphes
*   **BFS (en largeur) :** Explore par niveaux. Utilise une file (queue). Trouve le plus court chemin en nombre d'arêtes.
*   **DFS (en profondeur) :** Explore une branche à fond. Utilise une pile (stack) ou la récursivité.

### <a name="ex-graph-algo"></a>Algorithmes sur les Graphes
*   **Dijkstra :** Trouve le plus court chemin pondéré d'un point à tous les autres. Ne fonctionne pas avec des poids négatifs.
*   **Kruskal/Prim :** Trouvent un Arbre Couvrant de Poids Minimum (MST). Kruskal trie toutes les arêtes par poids et les ajoute si elles ne forment pas de cycle.

### <a name="ex-crypto-sym"></a>Cryptographie Symétrique vs Asymétrique
*   **Symétrique :** Une clé de maison. La même clé ouvre et ferme la porte. Rapide. Ex : AES.
*   **Asymétrique :** Un cadenas et sa clé. La clé publique (cadenas ouvert) chiffre, la clé privée (clé du cadenas) déchiffre. Lent. Ex : RSA.

### <a name="ex-cesar"></a>Chiffrement de César
*   **Exemple (décalage de +3) :** A -> D, B -> E, ..., Z -> C.
    *   "CESI" devient "FHVL".

### <a name="ex-rsa"></a>Algorithme RSA
*   **Exemple :** p=3, q=11.
    *   n = 3 * 11 = 33.
    *   φ(n) = (3-1)(11-1) = 2 * 10 = 20.
    *   Choisir e=3 (premier avec 20).
    *   Trouver `d` tel que `3d ≡ 1 mod 20`. `3 * 7 = 21`, donc `d=7`.
    *   Clé publique: (n=33, e=3). Clé privée: (n=33, d=7).

### <a name="ex-signature"></a>Signature Numérique
Pour prouver que vous êtes l'auteur d'une lettre, vous signez le *hash* de la lettre avec votre clé **privée**. N'importe qui peut vérifier cette signature en utilisant votre clé **publique**.

### <a name="ex-hachage"></a>Hachage et Salage
Le hachage transforme "motdepasse123" en "e6a1...". On ne peut pas revenir en arrière. Le **salage** ajoute des caractères aléatoires avant le hachage ("motdepasse123-A#f8") pour que le hachage soit unique même pour des mots de passe identiques.

### <a name="ex-crypto-theo"></a>Théorèmes Clés
*   **Algorithme d'Euclide (PGCD) :** `pgcd(198, 126)` -> `198 = 1*126 + 72` -> `126 = 1*72 + 54` -> `72 = 1*54 + 18` -> `54 = 3*18 + 0`. Le PGCD est 18.
*   **Petit Théorème de Fermat :** `3^10 mod 11`. 11 est premier. Donc `3^(11-1) ≡ 1 mod 11`.

### <a name="ex-greenit"></a>Green IT
*   **PUE :** Un PUE de 1.5 signifie que pour chaque 1kW consommé par les serveurs, 0.5kW est utilisé pour le reste (clim, etc.). `Énergie IT = Énergie totale / PUE`.
*   **Consommation :** Un PC de 100W allumé 10h consomme `(100 * 10) / 1000 = 1 kWh`.

### <a name="ex-pandas"></a>Python pour la Data
*   **Pandas :** `df.groupby('ville')['temp'].mean()` calcule la température moyenne par ville.
*   **NumPy :** `a.dot(b)` pour `a=[1,2]` et `b=[3,4]` fait `(1*3) + (2*4) = 11`.
