const paramTemplate = '<input class="q-input" placeholder="Param Key" />';
const queryTemplate =
  '<input class="q-input" placeholder="Query Key" /><input class="q-input" placeholder="Query Value" />';
const baseUrl = "https://website.ir";

const addNewParam = () => {
  const paramInputs = document.querySelectorAll("#params-container .keyValue-box .q-input");

  let allValid = true;
  paramInputs.forEach(({ value }) => {
    if (value.trim() === '') {
      allValid = false;
    }
  });

  if (allValid) {
    const div = document.createElement("div");
    div.className = "keyValue-box";
    div.innerHTML = paramTemplate;
    params_container.appendChild(div);
  }
};

const addNewQuery = () => {
  const queryKeys = document.querySelectorAll(
    '#queries-container .keyValue-box .q-input[placeholder="Query Key"]'
  );

  let allValid = true;
  queryKeys.forEach(({ value }) => {
    if (value.trim() === '') {
      allValid = false;
    }
  });

  if (allValid) {
    const div = document.createElement("div");
    div.className = "keyValue-box";
    div.innerHTML = queryTemplate;
    queries_container.appendChild(div);
  }
};

const generateURL = () => {
  const paramInputs = document.querySelectorAll("#params-container .keyValue-box .q-input");
  const queryBoxes = document.querySelectorAll("#queries-container .keyValue-box");

  let newUrl = baseUrl;
  let queryString = "";

  const paramMap = new Map();

  paramInputs.forEach(({ value }) => {
    if (value.trim()) {
      paramMap.set(value.trim(), true);
    }
  });

  paramMap.forEach((_, key) => {
    newUrl += `/${key}`;
  });

  const queryMap = new Map();

  queryBoxes.forEach((box) => {
    const queryKey = box.querySelector('.q-input[placeholder="Query Key"]');
    const queryValue = box.querySelector('.q-input[placeholder="Query Value"]');

    if (queryKey && queryKey.value.trim() && queryValue && queryValue.value.trim()) {
      queryMap.set(queryKey.value.trim(), queryValue.value.trim());
    }
  });

  queryMap.forEach((value, key) => {
    if (queryString) {
      queryString += "&";
    }
    queryString += `${key}=${value}`;
  });

  if (queryString) {
    newUrl += `?${queryString}`;
  }

  renderUrl(newUrl);
};

const renderUrl = (url) => {
  const el = document.getElementById("url-container");
  el.innerHTML = `<p>${url}</p>`;
};

document.getElementById("param-submit").addEventListener("click", addNewParam);
document.getElementById("query-submit").addEventListener("click", addNewQuery);
document.getElementById("generate").addEventListener("click", generateURL);
const params_container = document.querySelector("#params-container");
const queries_container = document.querySelector("#queries-container");