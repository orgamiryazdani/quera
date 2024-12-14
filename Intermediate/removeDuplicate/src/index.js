const studentsArray = [
    {
        level: 2,
        grade: 10,
        name: "John",
        lastName: "Doe",
        birthDate: "2002-05-20",
        nationality: "American",
        email: "john.doe@example.com"
    },
    {
        level: 3,
        grade: 10,
        name: "John",
        lastName: "Doe",
        birthDate: "2002-05-20",
        nationality: "American",
        email: "john.doe@example.com"
    },
    {
        level: 3,
        grade: 10,
        name: "John",
        lastName: "Doe",
        birthDate: "2002-05-20",
        nationality: "Iran",
        email: "john.doe@example.com"
    },
    {
        level: 3,
        grade: 10,
        name: "Saimon",
        lastName: "Jonse",
        birthDate: "2002-06-20",
        nationality: "Italy",
        email: "Saimon.Jonse@example.com"
    },
];


function removeDuplicateStudents(students) {
    const seen = new Map();
    students.filter((student, index) => {
        const key = `${student.grade}${student.name}${student.lastName}${student.birthDate}`;
        if (seen.has(key)) {
            const existingStudent = seen.get(key);
            if (student.level > existingStudent.level) {
                seen.set(key, student);
            } else if (student.level === existingStudent.level) {
                if (index < students.indexOf(existingStudent)) {
                    seen.set(key, student);
                }
            }
            return false;
        }
        seen.set(key, student);
        student.id = `${student.grade}${student.name}${student.lastName}${student.birthDate}`;
        return true;
    });
    return Array.from(seen.values());
}

removeDuplicateStudents(studentsArray);

module.exports = removeDuplicateStudents;