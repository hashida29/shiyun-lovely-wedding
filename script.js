
// Countdown
function startCountdown() {
  const wedding = new Date('May 14, 2026 15:00:00').getTime(); // default time 3:00 PM - edit if needed
  const d = document.getElementById('days');
  const h = document.getElementById('hours');
  const m = document.getElementById('minutes');
  const s = document.getElementById('seconds');
  function tick(){
    const now = Date.now();
    const diff = wedding - now;
    if(diff<0){ d.innerText='0'; h.innerText='0'; m.innerText='0'; s.innerText='0'; return;}
    const days = Math.floor(diff/(1000*60*60*24));
    const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
    const seconds = Math.floor((diff%(1000*60))/1000);
    d.innerText=days; h.innerText=hours; m.innerText=minutes; s.innerText=seconds;
  }
  tick(); setInterval(tick,1000);
}

// Simple RSVP - stores to localStorage and shows a thank you
function handleRsvp(e){
  e.preventDefault();
  const name = document.getElementById('r_name').value.trim();
  const email = document.getElementById('r_email').value.trim();
  const attend = document.getElementById('r_attend').value;
  const meal = document.getElementById('r_meal') ? document.getElementById('r_meal').value : '';
  const msg = document.getElementById('r_msg').value.trim();
  if(!name || !email){ alert('Please enter name and email'); return;}
  const submissions = JSON.parse(localStorage.getItem('rsvps')||'[]');
  submissions.push({name,email,attend,meal,msg,ts:Date.now()});
  localStorage.setItem('rsvps', JSON.stringify(submissions));
  document.getElementById('rsvp-form').reset();
  document.getElementById('rsvp-thanks').style.display='block';
  setTimeout(()=>{ document.getElementById('rsvp-thanks').style.display='none'; },4000);
}

// Audio toggle
function toggleAudio(){
  const a = document.getElementById('bg-audio');
  if(a.paused){ a.play(); document.getElementById('audio-play').innerText='⏸'; }
  else { a.pause(); document.getElementById('audio-play').innerText='▶'; }
}

document.addEventListener('DOMContentLoaded', function(){
  startCountdown();
  document.getElementById('rsvp-form').addEventListener('submit', handleRsvp);
  document.getElementById('audio-btn').addEventListener('click', toggleAudio);
});
