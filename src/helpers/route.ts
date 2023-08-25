import routes from "@/config/routes";

function route(
    name: keyof typeof routes,
    params: Record<string, string> = {}
) {
    let url = routes[name]?.url;

    for (const prop in params) {
        if (Object.prototype.hasOwnProperty.call(params, prop)) {
            url = url.replace(`:${prop}`, params[prop]);
        }
    }

    return url;
}

export default route