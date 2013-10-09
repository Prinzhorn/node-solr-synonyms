node-solr-synonyms
==================

Parse Solr/ElasticSearch synonyms files into JavaScript objects. You can then replace tokens with their synonyms easily.

Info on synonyms file format http://wiki.apache.org/solr/AnalyzersTokenizersTokenFilters#solr.SynonymFilterFactory


Installation
------------

> npm install solr-synonyms


Usage
-----

```js
var synonyms = require('solr-synonyms');
```

Now you have access to the api.


API
---

### synonyms.parse(inputString[, ignoreCase = true, expand = false])

* `inputString`: The string in solr format (see http://wiki.apache.org/solr/AnalyzersTokenizersTokenFilters#solr.SynonymFilterFactory)
* `ignoreCase`: Ignore the case. Duh.
* `expand`: See http://wiki.apache.org/solr/AnalyzersTokenizersTokenFilters#solr.SynonymFilterFactory

Returns an object which maps the keys to arrays of strings.


### synonyms.replace(tokens, synonyms)

* `tokens`: An array of strings.
* `synonyms`: An object which maps words to synonyms, e.g. the output of `synonyms.parse`.

Returns a new array where `tokens` have been replaced by their `synonyms`.


Example output
--------------

### Given this input

```
# blank lines and lines starting with pound are comments.

#Explicit mappings match any token sequence on the LHS of "=>"
#and replace with all alternatives on the RHS.  These types of mappings
#ignore the expand parameter in the schema.
#Examples:
i-pod, i pod => ipod,
sea biscuit, sea biscit => seabiscuit

#Equivalent synonyms may be separated with commas and give
#no explicit mapping.  In this case the mapping behavior will
#be taken from the expand parameter in the schema.  This allows
#the same synonym file to be used in different synonym handling strategies.
#Examples:
ipod, i-pod, i pod
foozball , foosball
universe , cosmos

# If expand==true, "ipod, i-pod, i pod" is equivalent to the explicit mapping:
ipod, i-pod, i pod => ipod, i-pod, i pod
# If expand==false, "ipod, i-pod, i pod" is equivalent to the explicit mapping:
ipod, i-pod, i pod => ipod

#multiple synonym mapping entries are merged.
foo => foo bar
foo => baz
#is equivalent to
foo => foo bar, baz
```


### with `expand = false`

```js
{
	'i-pod': ['ipod', 'i-pod', 'i pod'],
	'i pod': ['ipod', 'i-pod', 'i pod'],
	'ipod': ['ipod', 'i-pod', 'i pod'],
	'sea biscuit': ['seabiscuit'],
	'sea biscit': ['seabiscuit'],
	'foosball': ['foozball'],
	'foozball': ['foozball'],
	'universe': ['universe'],
	'cosmos': ['universe'],
	'foo': ['foo bar', 'baz']
}
```


### with `expand = true`

```js
{
	'i-pod': ['ipod', 'i-pod', 'i pod'],
	'i pod': ['ipod', 'i-pod', 'i pod'],
	'ipod': ['ipod', 'i-pod', 'i pod'],
	'sea biscuit': ['seabiscuit'],
	'sea biscit': ['seabiscuit'],
	'foozball': ['foozball', 'foosball'],
	'foosball': ['foozball', 'foosball'],
	'universe': ['universe', 'cosmos'],
	'cosmos': ['universe', 'cosmos'],
	'foo': ['foo bar', 'baz']
}
```