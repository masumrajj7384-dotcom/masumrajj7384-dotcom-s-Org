fetch("http://localhost:3000/api/news?ticker=TCS&name=Tata%20Consultancy%20Services").then(r => r.json()).then(data => {
  data.slice(0, 5).forEach(d => console.log("-", d.title, "| SOURCE:", d.source?.name));
}).catch(console.error);
