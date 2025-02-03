let workouts = [];
let currentPage = 1;
const itemsPerPage = 5;

function addWorkout() {
    const name = document.getElementById('userName').value;
    const type = document.getElementById('workoutType').value;
    const minutes = document.getElementById('workoutMinutes').value;
    if (name && type && minutes) {
        workouts.push({ name, type, minutes: parseInt(minutes) });
        updateWorkoutList();
        updateChart();
        updateFilterOptions();
    }
}

function updateWorkoutList() {
    const tbody = document.getElementById('workoutList');
    tbody.innerHTML = '';
    let filteredWorkouts = workouts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    filteredWorkouts.forEach(workout => {
        let row = `<tr><td>${workout.name}</td><td>${workout.type}</td><td>${workout.minutes}</td></tr>`;
        tbody.innerHTML += row;
    });
}

function updateChart() {
    const ctx = document.getElementById('workoutChart').getContext('2d');
    const types = [...new Set(workouts.map(w => w.type))];
    const data = types.map(type => workouts.filter(w => w.type === type).reduce((sum, w) => sum + w.minutes, 0));

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: types,
            datasets: [{
                label: 'Workout Minutes',
                data: data,
                backgroundColor: ['#ff79c6', '#50fa7b', '#8be9fd', '#bd93f9'],
                borderColor: ['#ff92d0', '#69f0ae', '#a3ffff', '#caaaff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}