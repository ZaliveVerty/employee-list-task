import './language/language.js';
import { FloatingWindow, setFont, applyTheme } from './style.js';
import { employeesReady } from './api/api.js';
import './filter.js';
import './sort.js';
import './search.js';

var accessibilityWindow = new FloatingWindow(
    document,
    document.getElementById('accessibility-button'),
    document.getElementById('accessibility-window')
);

document.querySelectorAll('.font-size-buttons .font-size-button').forEach(button => {
    button.addEventListener('click', function() {
        setFont(this.value);
    });
});

document.querySelectorAll('.contrast-buttons .contrast-button').forEach(button => {
    button.addEventListener('click', function() {
        applyTheme(this.value);
    });
});


employeesReady.then(employees => {
    var table = document.getElementById("employee-table");
    employees.forEach(employee => {
        addEmployeeToTable(employee, table);
    });
});

function addEmployeeToTable(employee, table) {
    const row = document.createElement('tr');
    row.setAttribute('employee-id', employee.id);
    row.className = 'employee-row';
    row.style.cursor = 'pointer';

    row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.getFirstName()}</td>
        <td>${employee.getLastName()}</td>
        <td>${employee.startDate.toLocaleDateString()}</td>
        <td>${employee.title}</td>
        <td>${employee.email}</td>
    `;

    // Detail row (initially hidden)
    const detailRow = document.createElement('tr');
    detailRow.className = 'detail-row';
    detailRow.style.display = 'none';
    detailRow.setAttribute('data-employee-id', employee.id);

    detailRow.innerHTML = `
        <td colspan="6" class="detail-row">
            <div>
                <h4>Additional Information</h4>
                <p><strong>Department:</strong> ${employee.department || 'N/A'}</p>
                <p><strong>Phone:</strong> ${employee.phone || 'N/A'}</p>
                <p><strong>Hourly pay:</strong> ${employee.hourlyPay || 'N/A'}</p>
            </div>
        </td>
    `;

    // Click event to toggle detail row
    row.addEventListener('click', function() {
        if (detailRow.style.display === 'none') {
            detailRow.style.display = 'table-row';
        } else {
            detailRow.style.display = 'none';
        }
    });

    // Add both rows to table
    table.appendChild(row);
    table.appendChild(detailRow);
}