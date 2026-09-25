// ── Unit Calendar: renders data/events.json (edited via /admin → Unit Calendar) ──
// Past events are hidden automatically; nothing needs deleting after an event.

var MONTHS = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function(c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
}

// "2026-10-03" → local-time Date. new Date("2026-10-03") would parse as UTC
// and show the previous day in Ontario.
function parseDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}

function eventCard(ev) {
    var d = ev._date;
    var time = [ev.startTime, ev.endTime].filter(Boolean).join(" – ");
    var meta = [time, ev.location].filter(Boolean).map(escapeHtml).join(" · ");

    return '<article class="calendar-event">' +
        '<div class="calendar-date" aria-hidden="true">' +
            '<span class="calendar-date__month">' + MONTHS[d.getMonth()].slice(0, 3) + '</span>' +
            '<span class="calendar-date__day">' + d.getDate() + '</span>' +
        '</div>' +
        '<div class="calendar-body">' +
            '<p class="calendar-weekday">' + DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + '</p>' +
            '<h3>' + escapeHtml(ev.title) + '</h3>' +
            (meta ? '<p class="calendar-meta">' + meta + '</p>' : '') +
            (ev.details ? '<p class="calendar-details">' + escapeHtml(ev.details).replace(/\n/g, "<br>") + '</p>' : '') +
        '</div>' +
    '</article>';
}

function renderEvents(data, schedule) {
    var list = document.getElementById("events-list");
    if (!list) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcoming = ((data && data.events) || [])
        .map(function(ev) { return Object.assign({ _date: parseDate(ev.date) }, ev); })
        .filter(function(ev) { return ev._date && ev._date >= today; })
        .sort(function(a, b) { return a._date - b._date || String(a.startTime).localeCompare(String(b.startTime)); });

    var regular = schedule
        ? 'Regular training: ' + escapeHtml(schedule.trainingDay) + ', ' + escapeHtml(schedule.trainingTime) + '.'
        : '';

    if (!upcoming.length) {
        list.innerHTML = '<p class="calendar-empty">No special events are posted right now. ' + regular + '</p>';
        return;
    }

    list.innerHTML = upcoming.map(eventCard).join("") +
        (regular ? '<p class="calendar-note">' + regular + '</p>' : '');
}

document.addEventListener("DOMContentLoaded", function() {
    function load(path) {
        return fetch(path).then(function(res) {
            if (!res.ok) throw new Error(path + " → HTTP " + res.status);
            return res.json();
        });
    }

    Promise.all([load("data/events.json"), load("data/schedule.json").catch(function() { return null; })])
        .then(function(results) { renderEvents(results[0], results[1]); })
        .catch(function(err) {
            console.error("Failed to load calendar:", err);
            var list = document.getElementById("events-list");
            if (list) list.innerHTML = '<p class="calendar-empty">The calendar could not be loaded. Please try again later.</p>';
        });
});
