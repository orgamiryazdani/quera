let routes = null;
let routeContainer = null;

function processRoutes() {
  const currentRoute = window.location.pathname;

  if (!routeContainer) return;

  if (routes[currentRoute]) {
    // Normal route without params
    routeContainer.innerHTML = routes[currentRoute]();
  } else {
    // Routes containing params
    // No match found, show 404 page:
    const routeMatch = findMatchingRoute(currentRoute);
    if (routeMatch) {
      const { route, params } = routeMatch;
      routeContainer.innerHTML = routes[route](params);
    } else {
      // No match found, show 404 page
      routeContainer.innerHTML = routes[404]();
    }
  }

  handleLinks();
}

function findMatchingRoute(currentPath) {
  // Split the current path into segments
  const currentSegments = currentPath.split('/').filter(Boolean);

  // Check each defined route for a match
  for (const route in routes) {

    const routeSegments = route.split('/').filter(Boolean);
    console.log(routeSegments);

    // Skip if segments length doesn't match
    if (routeSegments.length !== currentSegments.length) continue;

    const params = {};
    let isMatch = true;

    // Compare each segment
    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const pathSegment = currentSegments[i];

      // Check if this is a parameter segment
      if (routeSegment.startsWith(':')) {
        // Store the parameter value
        params[routeSegment.slice(1)] = pathSegment;
      } else if (routeSegment !== pathSegment) {
        // If segments don't match and it's not a parameter, this route doesn't match
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return { route, params };
    }
  }

  return null;
}

/* Add event listeners to each custom link */

function handleLinks() {
  const links = document.querySelectorAll("a[data-href]");
  // Handle link click events
  links.forEach((link) => {
    link.removeEventListener('click', (e) => handleLinkClick(e));
    link.addEventListener('click', (e) => handleLinkClick(e));
  })
}

function handleLinkClick(e) {
  e.preventDefault();
  if (e.currentTarget.dataset.href) {
    // Handle link click
    window.history.pushState(null, null, e.currentTarget.dataset.href);
    processRoutes();
  }
}

function handleRouteChange() {
  // handle route change when user clicks the browser's back and forward buttons
  window.onpopstate = processRoutes;
}

export function initializeRouter(routeList, container) {
  routes = routeList;
  routeContainer = container;

  processRoutes();
  handleRouteChange();
}