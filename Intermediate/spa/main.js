function router(params) {
    const routes = [
        { path: '/', view: () => `<h1>به کوئرا خوش آمدید</h1>` },
        { path: '/bootcamp', view: () => `<h1>به بوت کمپ خوش آمدید</h1>` },
        { path: '/college', view: () => `<h1>به کالج خوش آمدید</h1>` },
        { path: '/juniora', view: () => `<h1>به جونیورا خوش آمدید</h1>` },
    ]

    const potentialRoutes = routes.map((item) => {
        return {
            route: item,
            isMatch: location.pathname === item.path
        }
    })
    let match = potentialRoutes.find((route) => route.isMatch)

    if (!match) {
        match = {
            route: { path: '/not-found', view: () => `<h1>not-found</h1>` },
            isMatch: true
        }
    }
    document.querySelector('main').innerHTML = match.route.view();
}

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('navlink')) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router();
})