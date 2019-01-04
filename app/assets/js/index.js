window.onload = () => {
  let box = document.getElementById('index-right-box');
  initApp().then((success) => {
    box.innerHTML = buildCard(true);
  }, (error) => {
    box.innerHTML = buildCard(false);
  });
}

let buildCard = (success) => {
  let amsg = !success ? "Sign up" : "Try it out";
  let aref = !success ? "sign-in.html" : "apidoc.html";
  let aclr = !success ? "primary" : "info";
  let html = `
    <h4 class="card-title p-2">
      Get your API Key
    </h4>
    <div class="card-text mb-auto p-2">
      <p>The API is free to classify up to 500 names per month (origin, ethnicity) and 5000 names per month (gender).</p>
      <p>FREE TRIAL – NO CREDIT CARD NEEDED.</p>
    </div>
    <div class="p-2">
    <a href="${aref}" class="btn btn-${aclr} no-mrg-btm">${amsg} !</a>
    </div>
 `;
  return html;
} 
