window.onload = () => {
  let box = document.getElementById('index-right-box');
  initApp().then((success) => {
    box.innerHTML = buildCard(true);
  }, (error) => {
    box.innerHTML = buildCard(false);
  });
}

let buildCard = (success) => {
  let htit = !success ? "Get your API Key" : "Let's get started !"
  let amsg = !success ? "Sign up" : "Try it out";
  let aref = !success ? "sign-in.html" : "apidoc.html";
  let aclr = !success ? "primary" : "info";
  let pfirst = !success ? 
  "The API is free to classify up to 500 names per month (origin, ethnicity) and 5000 names per month (gender)." : 
  "You can try processing a new names directly from the API documentation page and view the results.";
  let psecond = !success ? 
  "FREE TRIAL – NO CREDIT CARD NEEDED." : 
  "From our GitHub, you can download the client SDKs for Python and Java (more coming).";
  let html = `
    <h4 class="card-title p-2">
      ${htit}
    </h4>
    <div class="card-text mb-auto p-2">
      <p>${pfirst}</p>
      <p>${psecond}</p>
    </div>
    <div class="p-2">
    <a href="${aref}" class="btn btn-${aclr} no-mrg-btm">${amsg} !</a>
    </div>
 `;
  return html;
} 
