// let locations = [];

// async function loadLocations() {
//   const response = await fetch("/columns.json");
//   const data = await response.json();
//   locations = data.data_columns.slice(3);
// }

// function filterLocations(input) {
//   const searchTerm = input.toLowerCase();
//   return locations.filter((loc) => loc.toLowerCase().includes(searchTerm));
// }

// function showDropdown(filteredLocations) {
//   const dropdown = document.getElementById("locationList");
//   dropdown.innerHTML = "";
//   if (filteredLocations.length === 0) {
//     dropdown.style.display = "none";
//     return;
//   }
//   filteredLocations.forEach((loc) => {
//     const li = document.createElement("li");
//     li.textContent = loc;
//     li.addEventListener("click", () => {
//       document.getElementById("locationSearch").value = loc;
//       dropdown.style.display = "none";
//     });
//     dropdown.appendChild(li);
//   });
//   dropdown.style.display = "block";
// }

// document
//   .getElementById("locationSearch")
//   .addEventListener("input", function () {
//     const input = this.value;
//     const filtered = filterLocations(input);
//     showDropdown(filtered);
//   });

// window.addEventListener("click", function (e) {
//   if (!document.getElementById("locationSearch").contains(e.target)) {
//     document.getElementById("locationList").style.display = "none";
//   }
// });

// function adjustPriceByAQI(estimatedPrice, aqi) {
//   let adjustmentPercentage = 0;

//   if (aqi > 0 && aqi <= 50) {
//     adjustmentPercentage = 0;
//   } else if (aqi > 50 && aqi <= 100) {
//     adjustmentPercentage = -0.02; // -2%
//   } else if (aqi > 100 && aqi <= 150) {
//     adjustmentPercentage = -0.05; // -5%
//   } else if (aqi > 150 && aqi <= 200) {
//     adjustmentPercentage = -0.08; // -8%
//   } else if (aqi > 200 && aqi <= 300) {
//     adjustmentPercentage = -0.1; // -10%
//   } else if (aqi > 300) {
//     adjustmentPercentage = -0.15; // -15%
//   }

//   return estimatedPrice * (1 + adjustmentPercentage);
// }

// document
//   .getElementById("predictForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const sqft = parseFloat(document.getElementById("total_sqft").value);
//     const bath = parseInt(document.getElementById("bath").value);
//     const bhk = parseInt(document.getElementById("bhk").value);
//     const location = document.getElementById("locationSearch").value;
//     console.log(location);

//     const response = await fetch("/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         total_sqft: sqft,
//         bath: bath,
//         bhk: bhk,
//         location,
//       }),
//     });

//     const result = await response.json();
//     document.getElementById(
//       "result"
//     ).textContent = `Estimated Price: ₹${result.estimated_price.toLocaleString()} Lakhs`;

//     // Fetch AQI data and display
//     fetch(`/api/air-quality?location=${location}`)
//       .then((res) => res.json())
//       .then((aqiData) => {
//         if (aqiData.error) {
//           document.getElementById(
//             "aqiResult"
//           ).textContent = `AQI Data: ${aqiData.error}`;
//         } else {
//           document.getElementById("aqiResult").innerHTML = `
//           Air Quality Index (AQI): ${aqiData.aqi} (${aqiData.pollution_level})
//         `;

//           // Adjust the estimated price
//           const adjustedPrice = adjustPriceByAQI(
//             result.estimated_price,
//             aqiData.aqi
//           );
//           document.getElementById(
//             "result"
//           ).textContent = `Estimated Price: ₹${adjustedPrice.toLocaleString()} Lakhs`;
//         }
//       })
//       .catch((err) => {
//         console.error("AQI fetch failed", err);
//         document.getElementById("aqiResult").textContent =
//           "Failed to fetch AQI data.";
//       });
//   });

// window.onload = loadLocations;

// document
//   .getElementById("predictForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Show spinner, Hide results
//     document.getElementById("loadingSpinner").style.display = "block";
//     document.getElementById("result").style.display = "none";
//     document.getElementById("aqiResult").style.display = "none";

//     // Example: Simulating a delay for prediction (you'll replace this with your actual fetch or axios call)
//     setTimeout(function () {
//       // After prediction is done
//       document.getElementById("loadingSpinner").style.display = "none";
//       document.getElementById("result").style.display = "block";
//       document.getElementById("aqiResult").style.display = "block";

//       // Set your actual result here
//       document.getElementById(
//         "result"
//       ).innerText = `Estimated Price: ₹${adjustedPrice.toLocaleString()} Lakhs`;
//       document.getElementById(
//         "aqiResult"
//       ).innerText = `AQI Data: ${aqiData.error}`;
//     }, 2000); // simulate 2 seconds delay
//   });

let locations = [];

async function loadLocations() {
  const response = await fetch("/columns.json");
  const data = await response.json();
  locations = data.data_columns.slice(3);
}

function filterLocations(input) {
  const searchTerm = input.toLowerCase();
  return locations.filter((loc) => loc.toLowerCase().includes(searchTerm));
}

function showDropdown(filteredLocations) {
  const dropdown = document.getElementById("locationList");
  dropdown.innerHTML = "";

  if (filteredLocations.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  filteredLocations.forEach((loc) => {
    const li = document.createElement("li");
    li.textContent = loc;
    li.addEventListener("click", () => {
      document.getElementById("locationSearch").value = loc;
      dropdown.style.display = "none";
    });
    dropdown.appendChild(li);
  });

  dropdown.style.display = "block";
}

function adjustPriceByAQI(estimatedPrice, aqi) {
  let adjustmentPercentage = 0;

  if (aqi > 0 && aqi <= 50) {
    adjustmentPercentage = 0;
  } else if (aqi > 50 && aqi <= 100) {
    adjustmentPercentage = -0.02; // -2%
  } else if (aqi > 100 && aqi <= 150) {
    adjustmentPercentage = -0.05; // -5%
  } else if (aqi > 150 && aqi <= 200) {
    adjustmentPercentage = -0.08; // -8%
  } else if (aqi > 200 && aqi <= 300) {
    adjustmentPercentage = -0.1; // -10%
  } else if (aqi > 300) {
    adjustmentPercentage = -0.15; // -15%
  }

  return estimatedPrice * (1 + adjustmentPercentage);
}

document
  .getElementById("locationSearch")
  .addEventListener("input", function () {
    const input = this.value;
    const filtered = filterLocations(input);
    showDropdown(filtered);
  });

window.addEventListener("click", function (e) {
  if (!document.getElementById("locationSearch").contains(e.target)) {
    document.getElementById("locationList").style.display = "none";
  }
});

document
  .getElementById("predictForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show spinner and hide previous results
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("aqiResult").style.display = "none";

    const sqft = parseFloat(document.getElementById("total_sqft").value);
    const bath = parseInt(document.getElementById("bath").value);
    const bhk = parseInt(document.getElementById("bhk").value);
    const location = document.getElementById("locationSearch").value;

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_sqft: sqft,
          bath: bath,
          bhk: bhk,
          location,
        }),
      });

      const result = await response.json();

      // Fetch AQI data
      const aqiResponse = await fetch(`/api/air-quality?location=${location}`);
      const aqiData = await aqiResponse.json();

      let adjustedPrice = result.estimated_price;

      if (!aqiData.error) {
        adjustedPrice = adjustPriceByAQI(result.estimated_price, aqiData.aqi);

        document.getElementById("aqiResult").innerHTML = `
        Air Quality Index (AQI): ${aqiData.aqi} (${aqiData.pollution_level})
      `;
      } else {
        document.getElementById(
          "aqiResult"
        ).textContent = `AQI Data: ${aqiData.error}`;
      }

      // Display the final adjusted result
      document.getElementById(
        "result"
      ).textContent = `Estimated Price: ₹${adjustedPrice.toLocaleString()} Lakhs`;
    } catch (err) {
      console.error("Prediction failed:", err);
      document.getElementById("result").textContent =
        "Failed to predict house price.";
      document.getElementById("aqiResult").textContent =
        "Failed to fetch AQI data.";
    } finally {
      // Hide spinner and show results
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("result").style.display = "block";
      document.getElementById("aqiResult").style.display = "block";
    }
  });

window.onload = loadLocations;
