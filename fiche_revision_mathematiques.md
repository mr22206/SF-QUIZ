# Fiche de Révision - Mathématiques

Cette fiche est structurée pour une révision efficace : une synthèse des formules et définitions en haut, avec des liens vers des exemples détaillés plus bas.

---

## Synthèse : Formules et Définitions Clés

### 1. Statistiques Descriptives

*   **Moyenne :** \( \mu = \frac{\sum_{i=1}^{n} x_i}{n} \) --- [détails](#ex-moyenne)
*   **Moyenne pondérée :** \( \mu_p = \frac{\sum_{i=1}^{n} x_i \times f_i}{\sum_{i=1}^{n} f_i} \) (où f est l'effectif/poids) --- [détails](#ex-moyenne)
*   **Médiane :** Valeur centrale d'une série triée --- [détails](#ex-mediane)
*   **Mode :** Valeur la plus fréquente --- [détails](#ex-mode)
*   **Étendue :** \( \text{max}(x) - \text{min}(x) \) --- [détails](#ex-etendue)
*   **Variance (σ²) :** \( \sigma^2 = \frac{\sum_{i=1}^{n} (x_i - \mu)^2}{n} \) --- [détails](#ex-variance)
*   **Écart-type (σ) :** \( \sigma = \sqrt{\sigma^2} \) --- [détails](#ex-ecart-type)
*   **Quartiles (Q1, Q3) et Écart Interquartile (IQR) :** \( IQR = Q3 - Q1 \) --- [détails](#ex-iqr)
*   **Valeur aberrante :** si \( x > Q3 + 1.5 \times IQR \) ou \( x < Q1 - 1.5 \times IQR \) --- [détails](#ex-iqr)


### 2. Probabilités

*   **Probabilité de base :** \( P(A) = \frac{\text{Cas favorables}}{\text{Cas total}} \) --- [détails](#ex-prob-base)
*   **Union (A ou B) :** \( P(A \cup B) = P(A) + P(B) - P(A \cap B) \) --- [détails](#ex-prob-union)
*   **Événements indépendants (A et B) :** \( P(A \cap B) = P(A) \times P(B) \) --- [détails](#ex-prob-indep)
*   **Événement complémentaire :** \( P(\bar{A}) = 1 - P(A) \) (utile pour "au moins un") --- [détails](#ex-prob-complement)
*   **Probabilité conditionnelle :** \( P(B|A) = \frac{P(A \cap B)}{P(A)} \) --- [détails](#ex-prob-cond)
*   **Théorème de Bayes :** \( P(A|B) = \frac{P(B|A) \times P(A)}{P(B)} \) --- [détails](#ex-bayes)
*   **Combinaisons (k parmi n) :** \( C(n,k) = \binom{n}{k} = \frac{n!}{k!(n-k)!} \)
*   **Loi Binomiale B(n, p) :**
    *   Probabilité de k succès : \( P(X=k) = C(n,k) \times p^k \times (1-p)^{n-k} \)
    *   Espérance : \( E(X) = n \times p \)
    *   Variance : \( Var(X) = n \times p \times (1 - p) \) --- [détails](#ex-loi-binom)
*   **Loi de Poisson P(λ) :**
    *   Probabilité de k événements : \( P(X=k) = \frac{e^{-\lambda} \lambda^k}{k!} \)
    *   Espérance et Variance : \( E(X) = Var(X) = \lambda \) --- [détails](#ex-loi-poisson)
*   **Loi Normale et Z-score :** \( Z = \frac{x - \mu}{\sigma} \) --- [détails](#ex-loi-normale)

### 3. Statistiques Inférentielles

*   **Théorème Central Limite :** La distribution des moyennes d'échantillons tend vers une loi normale --- [détails](#ex-tcl)
*   **Intervalle de Confiance (pour une moyenne) :** \( \left[ \bar{x} \pm z \times \frac{\sigma}{\sqrt{n}} \right] \) --- [détails](#ex-ic)
*   **Tests d'Hypothèse :** Rejet de H0 si `p-value < alpha` --- [détails](#ex-hypothese)
*   **Inégalité de Tchebychev :** Au moins \( 1 - \frac{1}{k^2} \) des données se situent à moins de k écarts-types de la moyenne. --- [détails](#ex-tchebychev)


### 4. Régression et Corrélation

*   **Covariance :** \( \text{Cov}(X,Y) = \frac{\sum (x_i - \mu_x)(y_i - \mu_y)}{n} \) --- [détails](#ex-regression)
*   **Coefficient de Corrélation (r) :** \( r = \frac{\text{Cov}(X,Y)}{\sigma_x \sigma_y} \). Mesure la force de la relation *linéaire* (entre -1 et 1) --- [détails](#ex-correlation)
*   **Régression Linéaire (Méthode des moindres carrés) :** Modèle \( y = ax + b \) qui minimise la somme des carrés des résidus. --- [détails](#ex-regression)
    *   **Pente (a) :** \( a = \frac{\text{Cov}(X,Y)}{\sigma_x^2} = \frac{n(\sum xy) - (\sum x)(\sum y)}{n(\sum x^2) - (\sum x)^2} \)
    *   **Ordonnée à l'origine (b) :** \( b = \mu_y - a \mu_x \)
*   **Coefficient de Détermination (R²) :** \( R^2 = r^2 \). Proportion de la variance expliquée par le modèle (entre 0 et 1) --- [détails](#ex-r2)

### 5. Théorie des Jeux

*   **Espérance de gain :** \( E(X) = \sum p_i \times G_i \) (somme des probabilités de chaque état multipliées par le gain de cet état) --- [détails](#ex-esperance-gain)
*   **Équilibre de Nash :** Aucun joueur ne peut bénéficier en changeant sa stratégie unilatéralement --- [détails](#ex-nash)
*   **Jeu Séquentiel :** Les joueurs jouent l'un après l'autre, résolu par induction à rebours --- [détails](#ex-jeu-seq)

---
---

## Exemples et Détails

### <a name="ex-moyenne"></a>Moyenne (μ)
La moyenne est la somme des valeurs divisée par le nombre de valeurs.
*   **Exemple simple :** Pour `[2, 5, 2, 8, 3]`, la moyenne est \( \frac{2+5+2+8+3}{5} = \frac{20}{5} = 4 \).
*   **Exemple pondéré :** Pour les données `Valeur: [10, 20], Effectif: [3, 2]`, la moyenne est \( \frac{(10 \times 3) + (20 \times 2)}{3+2} = \frac{30+40}{5} = 14 \).

### <a name="ex-mediane"></a>Médiane
La valeur centrale d'un ensemble de données trié. Si le nombre de valeurs est pair, c'est la moyenne des deux valeurs centrales. Elle est plus robuste que la moyenne face aux valeurs extrêmes.
*   **Exemple (impair) :** Pour `[2, 3, 5, 8, 10]`, la médiane est `5`.
*   **Exemple (pair) :** Pour `[2, 3, 5, 8]`, la médiane est \( \frac{3+5}{2} = 4 \).
*   **Exemple (valeur extrême) :** Pour `[1, 2, 3, 100]`, la médiane (2.5) est plus représentative que la moyenne (26.5).

### <a name="ex-mode"></a>Mode
La valeur qui apparaît le plus fréquemment. Une série peut ne pas avoir de mode ou en avoir plusieurs.
*   **Exemple :** Pour `[2, 5, 2, 8, 3]`, le mode est `2`.
*   **Exemple :** Pour `[2, 5, 8, 3]`, il n'y a pas de mode.

### <a name="ex-etendue"></a>Étendue
La différence entre la valeur maximale et la valeur minimale.
*   **Exemple :** Pour `[2, 5, 2, 8, 3]`, l'étendue est \( 8 - 2 = 6 \).

### <a name="ex-variance"></a>Variance (σ²)
La moyenne des carrés des écarts à la moyenne. Mesure à quel point les données sont dispersées.
*   **Exemple :** Pour `[10, 20, 30]`, la moyenne (μ) est 20.
    La variance est \( \frac{(10-20)^2 + (20-20)^2 + (30-20)^2}{3} = \frac{100+0+100}{3} \approx 66.67 \).

### <a name="ex-ecart-type"></a>Écart-type (σ)
La racine carrée de la variance. Exprimé dans la même unité que les données, il représente la dispersion typique autour de la moyenne.
*   **Exemple :** Pour la série ci-dessus, l'écart-type est \( \sqrt{66.67} \approx 8.16 \).

### <a name="ex-iqr"></a>Quartiles et Écart Interquartile (IQR)
Les quartiles divisent la série de données triée en quatre parties égales.
*   **Méthode :**
    1.  Triez les données.
    2.  Trouvez la médiane (c'est Q2).
    3.  Q1 est la médiane de la première moitié des données (sans inclure Q2 si n est impair).
    4.  Q3 est la médiane de la seconde moitié des données.
*   **Exemple :** Pour `[5, 8, 10, 15, 17, 25]`.
    *   Q2 (médiane) = \( (10+15)/2 = 12.5 \).
    *   Première moitié : `[5, 8, 10]`. Q1 = 8.
    *   Seconde moitié : `[15, 17, 25]`. Q3 = 17.
    *   IQR = \( 17 - 8 = 9 \).
*   **Détection d'aberration :**
    *   Limite supérieure = \( Q3 + 1.5 \times IQR = 17 + 1.5 \times 9 = 30.5 \).
    *   Limite inférieure = \( Q1 - 1.5 \times IQR = 8 - 1.5 \times 9 = -5.5 \).
    *   Toute valeur au-dessus de 30.5 ou en dessous de -5.5 serait une valeur aberrante.

### <a name="ex-prob-base"></a>Probabilité de base
*   **Exemple :** Obtenir un nombre pair avec un dé à 6 faces. Cas favorables = {2, 4, 6}. `P(Pair) = 3 / 6 = 1/2`.

### <a name="ex-prob-union"></a>Probabilité d'Union
*   **Exemple :** Probabilité de tirer un Roi ou un Coeur dans un jeu de 52 cartes.
    *   P(Roi) = 4/52. P(Coeur) = 13/52. P(Roi et Coeur) = 1/52 (le Roi de Coeur).
    *   P(Roi U Coeur) = \( \frac{4}{52} + \frac{13}{52} - \frac{1}{52} = \frac{16}{52} \).

### <a name="ex-prob-indep"></a>Probabilité d'événements indépendants
*   **Exemple :** Probabilité de faire deux "6" en lançant deux dés. Les lancers sont indépendants. `P(6 et 6) = P(6) \times P(6) = (1/6) \times (1/6) = 1/36`.

### <a name="ex-prob-complement"></a>Probabilité d'événement complémentaire
*   **Exemple :** Probabilité d'obtenir "au moins un 6" en lançant deux dés. C'est le complément de "n'obtenir aucun 6".
    *   P(pas de 6 sur un dé) = 5/6.
    *   P(aucun 6 sur deux dés) = (5/6) * (5/6) = 25/36.
    *   P(au moins un 6) = 1 - 25/36 = 11/36.

### <a name="ex-prob-cond"></a>Probabilité conditionnelle
*   **Exemple :** On lance deux dés. Quelle est la probabilité que le premier dé soit un 6, sachant que la somme est 8 ?
    *   Espace des possibles pour "somme=8": {(2,6), (3,5), (4,4), (5,3), (6,2)}. Il y a 5 cas.
    *   Parmi ces cas, un seul a le premier dé égal à 6 : (6,2).
    *   La probabilité est donc de 1/5.

### <a name="ex-bayes"></a>Théorème de Bayes
Permet de "renverser" les probabilités conditionnelles.
*   **Exemple :** Un test pour une maladie (M) a une fiabilité de 99%. La maladie touche 1% de la population. Si une personne est testée positive (+), quelle est la probabilité qu'elle soit vraiment malade ?
    *   \( P(M|+) = \frac{P(+|M) \times P(M)}{P(+)} \)
    *   P(+|M) = 0.99. P(M) = 0.01.
    *   P(+) = P(+|M)P(M) + P(+|non M)P(non M) = (0.99 * 0.01) + (0.01 * 0.99) = 0.0198.
    *   \( P(M|+) = \frac{0.99 \times 0.01}{0.0198} \approx 0.5 \). Soit 50%.

### <a name="ex-loi-binom"></a>Loi Binomiale
Modélise `k` succès dans `n` essais indépendants (avec proba `p`).
*   **Exemple :** On lance une pièce 5 fois (n=5), P(Face)=0.5 (p=0.5). Probabilité d'avoir exactement 2 Faces (k=2) ?
    *   \( C(5,2) = \frac{5!}{2!(3)!} = 10 \).
    *   \( P(X=2) = 10 \times (0.5)^2 \times (0.5)^3 = 10 \times 0.25 \times 0.125 = 0.3125 \).

### <a name="ex-loi-poisson"></a>Loi de Poisson
Modélise le nombre d'événements dans un intervalle fixe, avec un taux moyen `λ`.
*   **Exemple :** Un centre d'appel reçoit en moyenne `λ=2` appels par minute. Probabilité de recevoir 0 appel dans une minute ?
    *   \( P(X=0) = \frac{e^{-2} \times 2^0}{0!} = e^{-2} \approx 0.135 \).

### <a name="ex-loi-normale"></a>Loi Normale et Z-score
Le Z-score mesure le nombre d'écarts-types séparant une valeur de la moyenne.
*   **Exemple :** Notes (μ=12, σ=3). Un étudiant a 18. Son Z-score est \( \frac{18-12}{3} = 2 \). Il est à 2 écarts-types au-dessus de la moyenne.

### <a name="ex-tcl"></a>Théorème Central Limite
Même si la distribution des revenus dans une population est très asymétrique, la distribution des moyennes de revenus de milliers d'échantillons de 100 personnes sera approximativement normale.

### <a name="ex-ic"></a>Intervalle de Confiance
*   **Exemple :** Sur 100 personnes (n=100), la taille moyenne est 175cm (x̄=175). L'écart-type de la population est σ=10. L'IC à 95% (z=1.96) est :
    \( \left[ 175 \pm 1.96 \times \frac{10}{\sqrt{100}} \right] = [175 \pm 1.96] = [173.04, 176.96] \).

### <a name="ex-hypothese"></a>Tests d'Hypothèse
*   **Exemple :** On teste un médicament. H0: "le médicament est inefficace". On obtient une p-value de 0.03. Comme 0.03 < 0.05 (notre seuil), on rejette H0 et on conclut que le médicament a un effet statistiquement significatif.

### <a name="ex-tchebychev"></a>Inégalité de Tchebychev
Donne une borne inférieure pour la proportion de données dans un intervalle autour de la moyenne, quelle que soit la distribution.
*   **Exemple :** Pour k=2 (intervalle de 2 écarts-types), au moins \( 1 - \frac{1}{2^2} = 1 - 0.25 = 75\% \) des données sont dans l'intervalle \( [\mu - 2\sigma, \mu + 2\sigma] \).

### <a name="ex-correlation"></a>Coefficient de Corrélation
*   **Exemple :** r=1 (corrélation positive parfaite), r=-1 (corrélation négative parfaite), r=0 (pas de corrélation *linéaire*). r=0.8 indique une forte corrélation positive.

### <a name="ex-regression"></a>Régression Linéaire (Méthode des moindres carrés) et Covariance
La **méthode des moindres carrés** est une technique pour trouver la droite de régression \( y = ax + b \) qui "colle" au mieux à un nuage de points. Elle fonctionne en minimisant la somme des carrés des écarts verticaux (appelés résidus) entre chaque point de donnée et la droite.
La **covariance** mesure la variation conjointe de deux variables.
*   **Exemple de calcul (pente `a` et ordonnée `b`) :**
    *   Données : x=[1, 2], y=[3, 5]. n=2.
    *   \( \sum x = 3, \sum y = 8, \sum x^2 = 5, \sum xy = 13 \)
    *   Pente \( a = \frac{2(13) - (3)(8)}{2(5) - (3)^2} = \frac{26 - 24}{10 - 9} = 2 \).
    *   Moyennes : \( \mu_x = 1.5, \mu_y = 4 \).
    *   Ordonnée \( b = 4 - 2 \times 1.5 = 1 \).
    *   Droite de régression : \( y = 2x + 1 \).

### <a name="ex-r2"></a>Coefficient de Détermination (R²)
*   **Exemple :** Si r=0.8, alors R²=0.64. Cela signifie que 64% de la variation de y est expliquée par x.

### <a name="ex-esperance-gain"></a>Espérance de Gain
*   **Exemple :** Vous avez 60% de chance de gagner 100€ et 40% de chance de perdre 50€.
    *   L'espérance de gain est \( E(X) = (0.6 \times 100) + (0.4 \times -50) = 60 - 20 = 40€ \).

### <a name="ex-nash"></a>Équilibre de Nash
*   **Exemple (Dilemme du prisonnier) :** Deux complices sont interrogés séparément. S'ils se taisent tous les deux, ils prennent 1 an de prison. Si l'un dénonce l'autre, le délateur est libre et l'autre prend 10 ans. S'ils se dénoncent mutuellement, ils prennent 5 ans chacun. L'équilibre de Nash est qu'ils se dénoncent mutuellement, même s'ils auraient eu un meilleur résultat en coopérant (se taire).

### <a name="ex-jeu-seq"></a>Jeu Séquentiel
*   **Exemple :** Les échecs. Le joueur A joue, puis le joueur B joue en connaissant le coup du joueur A. Pour décider de son coup, le joueur A anticipe les réponses possibles de B, puis ses propres réponses, etc. (induction à rebours).
