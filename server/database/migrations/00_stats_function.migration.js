
const functionName = 'countPairMatch';
async function up({ context: queryInterface }) {
	// https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-createFunction
	const params = [
		{type: 'integer', name: 'pairId', direction: 'IN'},
		{type: 'integer', name: 'pairNumber', direction: 'IN'},
		{type: 'boolean', name: 'won', direction: 'IN'},
		{type: 'integer', name: 'result', direction: 'IN'}
	  ];
	const functionBody = `
		select count(*)
        from stage1 s1
        where (
			score = case when won = true then 2 else 0 end or
			score = case when won = true then 3 else 1 end
		) and pairId = case when pairNumber = 1 then s1."pair1Id" else s1."pair2Id" end
        group by case when pairNumber = 1 then s1."pair1Id" else s1."pair2Id" end;
	`;
	await queryInterface.createFunction(functionName, params ,'bigint', language, functionBody, [], { force: true });
}

async function down({ context: queryInterface }) {
	await queryInterface.dropFunction(functionName);
}

export default { up, down };