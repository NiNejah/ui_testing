## How to use 
> **@annotation** arg1 arg2 ... **;** 
```java
@open 
url

@close

@click 
id

@write 
id 
text

@compareText 
id 
sqlRowTobeCompare 
sqlRequete  
```
## annotation
| annotation   | parametres      | Description |
|--------------|-----------|:------------|
|  @open     | url (form url) _none pour le momen_ | open the browser   |
|  @close     | none | close the  browser  |
|  @click    | **id** (l'id de l'element ) | il vous permer de click sur un elment dans la form en donane l'id |
|  @write    | **id**  / **text** | envoyer un text au form   | 
|  @read    | **id**  / **(action)** : un auther (annotation) | lire un champ et faire quelque chose avec les resultat (il fait que l'afichage poue le memont) ...| 
| @compareText      |  **id** (l'id de l'element )  / **sqlRequete**  / **sqlRowTobeCompare** la line de table au on va comparer les données | compare un innner text avac un requete sql |