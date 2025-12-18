let therapyGoals = [];

function initializeSession() { const input = document.getElementById('goal-input').value; if (!input.trim()) return alert("Please enter at least one goal.");

therapyGoals = input.split('\n').filter(g => g.trim() !== '');
const container = document.getElementById('goal-checklist');
container.innerHTML = '';

therapyGoals.forEach((goal, index) => {
    const div = document.createElement('div');
    div.className = "flex flex-col md:flex-row md:items-center gap-2 p-3 border rounded hover:bg-gray-50";
    div.innerHTML = `
        <span class="flex-1 font-medium text-gray-700">${goal}</span>
        <div class="flex gap-2">
            <select id="status-${index}" class="text-xs border p-1 rounded">
                <option value="worked">Worked On</option>
                <option value="not-worked">Not Addressed</option>
            </select>
            <select id="outcome-${index}" class="text-xs border p-1 rounded">
                <option value="Successful">Successful</option>
                <option value="Partially Successful">Partially</option>
                <option value="Not Successful">Not Successful</option>
            </select>
        </div>
    `;
    container.appendChild(div);
});

document.getElementById('setup-view').classList.add('hidden');
document.getElementById('session-view').classList.remove('hidden');


}

async function generateNote() { const btn = document.getElementById('gen-btn'); btn.innerText = "Generating with AI..."; btn.disabled = true;

const sessionData = {
    goals: therapyGoals.map((g, i) => ({
        goal: g,
        status: document.getElementById(`status-${i}`).value,
        outcome: document.getElementById(`outcome-${i}`).value
    })),
    engagement: document.getElementById('engagement').value,
    prompting: document.getElementById('prompting').value
};

try {
    const response = await fetch('/api/generate-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
    });
    
    const data = await response.json();
    document.getElementById('note-output').innerText = data.note;
    document.getElementById('result-view').classList.remove('hidden');
    document.getElementById('result-view').scrollIntoView();
} catch (error) {
    alert("API Error: Ensure the server is running.");
} finally {
    btn.innerText = "Generate Professional Note";
    btn.disabled = false;
}


}

function copyToClipboard() { const text = document.getElementById('note-output').innerText; navigator.clipboard.writeText(text); alert("Note copied!"); }