-- Report won/lost by pairs

create or replace view stats_player as
select pl.id playerId,
       pl."name" "name",
       pl.surname surname,
       pa.id pairId,
       coalesce(countPairMatch(pa.id,1, true),0) pair1Winnings,
       coalesce(countPairMatch(pa.id,2, true),0) pair2Winnings,
       coalesce(countPairMatch(pa.id,1, false),0) pair1Defeats,
       coalesce(countPairMatch(pa.id,1, false),0) pair2Defeats,
       coalesce(s2w.tot, 0) stage2Winnings,
       coalesce(s2l.tot, 0) stage2Defeats
from player pl
join pairs pa on pa."player1Id" = pl.id
or pa."player2Id" = pl.id
left join
    ( select s2."pairId" "pairId",
             count(*) tot
     from stage2 s2
     group by s2."pairId" ) s2w on s2w."pairId" = pa.id
left join
    ( select s2."pairId" "pairId",
             count(*) tot
     from stage2 s2
     group by s2."pairId" ) s2l on s2l."pairId" = pa.id
order by pl.id,
         pa.id;


CREATE or REPLACE FUNCTION countPairMatch (IN pairId int, IN pairNumber int, IN won boolean, OUT result bigint) AS $$
    select count(*)
        from stage1 s1
        where
            (
                score = case when won = true then 2 else 0 end or
                score = case when won = true then 3 else 1 end
            ) and pairId = case when pairNumber = 1 then s1."pair1Id" else s1."pair2Id" end
        group by case when pairNumber = 1 then s1."pair1Id" else s1."pair2Id" end
    $$ LANGUAGE SQL;

