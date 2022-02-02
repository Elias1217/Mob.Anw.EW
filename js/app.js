
const container = document.querySelector(".container");

const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: " Beatae", image: "images/coffee5.jpg" },
  { name: " Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" }
];

const showCoffees = () => {
  let output = "";

  coffees.forEach(
    ({ name, image }) =>
      (output += `
      <div class="card">
        <img class="card--avatar" src=${image} />
        <h1 class="card--title"> ${name} </h1>
        <a class="card--link" href="#">Taste</a>
      </div>
    `)
  );

  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
  async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.scan();
      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          consoleLog("Record type:  " + record.recordType);
          consoleLog("MIME type:    " + record.mediaType);
          consoleLog("=== data ===\n" + decoder.decode(record.data));
        }
      }
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC is not supported.");
  }
}

async function writeTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    try {
      await ndef.write("What Web Can Do Today");
      consoleLog("NDEF message written!");
    } catch(error) {
      consoleLog(error);
    }
  } else {
    consoleLog("Web NFC is not supported.");
  }
}

function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += data + '\n';
};
}
  
  
  

