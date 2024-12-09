const express = require("express");
const cors = require("cors");

const PORT = 3000;
const TEAMS = [
    {
        id: "N12C54612D",
        name: "👨‍🔧 Engineers 👩‍🔧"
    },
    {
        id: "AJ65MD2312",
        name: "👩‍🦱 Human Resources 👨‍🦱"
    }
];

const NAMES = [
    "Mahyar", "Maryam", "Negin", "Erfan", "Negar",
    "Sajjad", "Nima", "Ruhoullah", "Artimis", "Abolfazl", "Fatameh"
];

const app = express();
app.use(cors());

function generateTeam(id, min, max) {
    const rand = () => Math.floor(Math.random() * (max - min) + min);

    return NAMES.map((name) => ({
        name: `${name}_${id.slice(0, 3)}`,
        team: id,
        kills: rand(),
        revives: rand(),
        assists: rand(),
        deaths: rand()
    }))
}

function getMINMAX() {
    const _1 = [10, 30]
    const _2 = [0, 15];
    if (Math.random() > 0.5) {
        return [_1, _2]
    }
    return [_2, _1];
}

app.get("/teams", (req, res) => {
    return res.json(TEAMS);
});

app.get("/scoreboard", (req, res) => {
    const [m1, m2] = getMINMAX();
    const t1 = generateTeam(TEAMS[0].id, ...m1);
    const t2 = generateTeam(TEAMS[1].id, ...m2);
    return res.json([...t1, ...t2].sort(() => 0.5 - Math.random()));
});


app.listen(PORT, () => {
    console.clear();
    console.log(`🚀 LISTENING ON http://localhost:${PORT} 🚀`);
});
