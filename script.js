// Save data to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fitness-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const steps = +document.getElementById('steps').value;
      const workout = document.getElementById('workout').value;
      const duration = +document.getElementById('duration').value;
      const calories = +document.getElementById('calories').value;

      const activity = {
        date: new Date().toLocaleDateString(),
        steps, workout, duration, calories
      };

      const data = JSON.parse(localStorage.getItem('fitnessData')) || [];
      data.push(activity);
      localStorage.setItem('fitnessData', JSON.stringify(data));
      alert('Activity logged!');
      form.reset();
    });
  }

  // Dashboard rendering
  const summary = document.getElementById('summary');
  if (summary) {
    const data = JSON.parse(localStorage.getItem('fitnessData')) || [];

    let totalSteps = 0;
    let totalCalories = 0;
    let weeklyLabels = [];
    let weeklyCalories = [];

    data.slice(-7).forEach((entry) => {
      totalSteps += entry.steps;
      totalCalories += entry.calories;
      weeklyLabels.push(entry.date);
      weeklyCalories.push(entry.calories);
    });

    summary.innerHTML = `
      <p><strong>Total Steps (Last 7 days):</strong> ${totalSteps}</p>
      <p><strong>Total Calories Burned:</strong> ${totalCalories}</p>
    `;

    // Render chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weeklyLabels,
        datasets: [{
          label: 'Calories Burned',
          data: weeklyCalories,
          backgroundColor: '#28a745'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
