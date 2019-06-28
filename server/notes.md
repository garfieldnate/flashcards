# Get categories for a deck
SELECT count(*) numCats,
        v.language,
        c.name,
        c.id
FROM
        vocab v 
        JOIN cat_2_vocab c2v 
                ON c2v.vocab_id = v.id
        JOIN category c
                ON c2v.cat_id = c.id
WHERE
        c.parent_id IS NULL
GROUP BY v.language, c.id;

Get number of categories:

select count(*) numCats from (
SELECT 
        NULL
FROM
        vocab v 
        JOIN cat_2_vocab c2v 
                ON c2v.vocab_id = v.id
        JOIN category c
                ON c2v.cat_id = c.id
WHERE
        c.parent_id IS NULL
GROUP BY v.language, c.id
);

Get number of subcategories:
select count(*) numCats from (
SELECT 
        NULL
FROM
        vocab v 
        JOIN cat_2_vocab c2v 
                ON c2v.vocab_id = v.id
        JOIN category c
                ON c2v.cat_id = c.id
WHERE
        c.parent_id IS NOT NULL
GROUP BY v.language, c.id
);

# category names for a vocab
select 
        c.name, c.id 
from 
        cat_2_vocab c2v 
        join 
                category c 
        on 
                c.id = c2v.cat_id 
where 
        c2v.vocab_id = 200
        and
                        c.parent_id is null

# Duplicate words (237 words for Thai. Grr!)
WITH dup AS
  (SELECT foreign_word,
          english_word
   FROM vocab
   GROUP BY foreign_word
   HAVING count(*) > 1)
SELECT v.id, v.foreign_word, v.english_word, v.pronunciation, v.pos, v.language_id, v.frequency, v.image_id, v.foreign_audio_id
FROM vocab v,
     dup
WHERE v.foreign_word=dup.foreign_word
ORDER BY v.foreign_word;
