document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const jobsTableBody = document.getElementById('jobsTableBody');
    const runScheduler = document.getElementById('runScheduler');
    const totalProfit = document.getElementById('totalProfit');
    const scheduledJobs = document.getElementById('scheduledJobs');
    const timeline = document.getElementById('timeline');

    let jobs = [];

    
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const jobId = document.getElementById('jobId').value;
        const deadline = parseInt(document.getElementById('deadline').value);
        const profit = parseInt(document.getElementById('profit').value);

        
        if (!/[A-Z]/.test(jobId)) {
            alert('Job ID must be a single uppercase letter (A-Z)');
            return;
        }

        
        jobs.push({ id: jobId, deadline: deadline, profit: profit });
        updateJobsTable();
        jobForm.reset();
    });

    function updateJobsTable() {
        jobsTableBody.innerHTML = jobs.map((job, index) => `
            <tr>
                <td>${job.id}</td>
                <td>${job.deadline}</td>
                <td>${job.profit}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeJob(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    
    window.removeJob = (index) => {
        jobs.splice(index, 1);
        updateJobsTable();
    };

    
    runScheduler.addEventListener('click', () => {
        if (jobs.length === 0) {
            alert('Please add at least one job!');
            return;
        }

        
        const inputContent = jobs.map(job => `
            ${job.id} ${job.deadline} ${job.profit}
        `).join('\n');

    
        const blob = new Blob([inputContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'input.txt';
        link.click();
        URL.revokeObjectURL(url);

      
        const cppProgram = new ActiveXObject('WScript.Shell');
        cppProgram.Run('src\backend\job_scheduler.exe');

        setTimeout(() => {
            try {
                const fs = new ActiveXObject('Scripting.FileSystemObject');
                const file = fs.OpenTextFile('output.txt', 1);
                const output = file.ReadAll();
                file.Close();

                const lines = output.split('\n');
                const scheduledJobsText = lines[0].replace('Scheduled Jobs: ', '').trim();
                const totalProfitValue = parseInt(lines[1].replace('Total Profit: ', '').trim());
                const schedule = lines[2].replace('Schedule: ', '').trim().split(' ');

                totalProfit.textContent = totalProfitValue;
                updateScheduledJobs(scheduledJobsText.split(' '));
                updateTimeline(schedule);
            } catch (error) {
                console.error('Error reading output file:', error);
                alert('Error reading output file. Please check if the C++ program ran successfully.');
            }
        }, 1000);
    });

   
    function updateScheduledJobs(jobs) {
        scheduledJobs.innerHTML = jobs.map(job => `
            <span class="badge bg-primary">${job}</span>
        `).join('');
    }

    function updateTimeline(schedule) {
        timeline.innerHTML = schedule.map((job, index) => `
            <div class="timeline-slot">
                <div class="slot-number">${index}</div>
                <div class="slot-content">
                    ${job !== '-' ? `<div class="job-block">${job}</div>` : ''}
                </div>
            </div>
        `).join('');
    }
});
