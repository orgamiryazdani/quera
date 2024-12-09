const teamsTable = document.querySelector('.teams');
const statusText = document.querySelector('.status');

const getTeam = async () => {
    const response = await fetch('http://localhost:3000/teams');
    const data = await response.json();
    return data;
}

const getUsers = async () => {
    const response = await fetch('http://localhost:3000/scoreboard');
    const data = await response.json();
    return data;
}

const calculateScore = (users) => {
    return users.reduce((total, user) => {
        const userScore = user.kills * 100 + user.revives * 75 + user.assists * 50;
        return total + userScore;
    }, 0);
}

const createTable = async () => {
    const teams = await getTeam();
    const users = await getUsers();
    let highestScore = 0;
    let winningTeam = '';

    teamsTable.innerHTML = '';

    teams.forEach((team) => {
        const teamUsers = users.filter(user => user.team === team.id);
        const userScoreSort = teamUsers.sort((a, b) => (b.kills * 100 + b.revives * 75 + b.assists * 50) - (a.kills * 100 + a.revives * 75 + a.assists * 50))
        const teamScore = calculateScore(teamUsers);
        if (teamScore > highestScore) {
            highestScore = teamScore;
            winningTeam = team.name;
        }

        teamsTable.innerHTML += `
        <div class="team" id="TEAM_ID">
	<h2>${team.name}</h2>
	<table>
		<tr>
			<th>Rank</th>
			<th>Name</th>
			<th>Kills</th>
			<th>Assists</th>
			<th>Revives</th>
			<th>Deaths</th>
			<th>Score</th>
		</tr>
        ${userScoreSort.map((user, index) => {
            let rank = '';
            if (index === 0) rank = '🥇';
            else if (index === 1) rank = '🥈';
            else if (index === 2) rank = '🥉';
            else rank = index + 1;
            return `
            <tr>
                <td>${rank}</td>
                <td>${user.name}</td>
                <td>${user.kills}</td>
                <td>${user.assists}</td>
                <td>${user.revives}</td>
                <td>${user.deaths}</td>
                <td>${user.kills * 100 + user.revives * 75 + user.assists * 50}</td>
            </tr>
            `
        })}
	</table>
</div>
`
    });

    statusText.innerText = `${winningTeam} Has the Upper Hand !`
}

createTable()