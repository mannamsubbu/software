// src/utils.js
export function createPageUrl(pageName) {
  switch (pageName) {
    case "Dashboard": return "/";
    case "ReportFound": return "/report-found";
    case "BrowseFound": return "/browse-found";
    case "MyActivity": return "/my-activity";
    case "AdminDashboard": return "/admin";
    default: return "/";
  }
}
