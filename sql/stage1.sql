

-- Stage 1
	with details as (
		select p.id id ,
			case when p1.alias is not null then p1.alias else concat(p1."name",' ',p1."surname") end player1,
			case when p2.alias is not null then p2.alias else concat(p2."name",' ',p2."surname") end player2
		from pairs p
		join player p1 on p."player1Id" = p1.id
		join player p2 on p."player2Id" = p2.id
	)
	select s.id,s.name,d1.id,d1.player1,d1.player2,d2.id,d2.player1,d2.player2,s.score
	from stage1 s
	join tournament t on s."tournamentId" = t.id
	join details d1 on d1.id=s."pair1Id"
	join details d2 on d2.id=s."pair2Id"
	where t."name" ='T6'
	order by s.id

