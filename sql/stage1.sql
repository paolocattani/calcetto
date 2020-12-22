

-- Stage 1
	select s.id,s.name,
		s."pair1Id" , concat(p1p1."name",' ',p1p1."surname"), concat(p1p2."name",' ',p1p2."surname"),
		s."pair2Id" , concat(p2p1."name",' ',p2p1."surname"), concat(p2p2."name",' ',p2p2."surname"),
		s.score
	from stage1 s
	join tournament t on s."tournamentId" = t.id
	join pairs p1 on s."pair1Id" = p1.id
	join player p1p1 on p1."player1Id" = p1p1.id
	join player p1p2 on p1."player2Id" = p1p2.id
	join pairs p2 on s."pair2Id" =p2.id
	join player p2p1 on p2."player1Id" = p2p1.id
	join player p2p2 on p2."player2Id" = p2p2.id
	where t."name" ='T6'
	order by s.id


