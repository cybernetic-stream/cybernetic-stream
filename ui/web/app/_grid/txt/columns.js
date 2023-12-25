export const columns = [
  {
    field: "",
    width: 10000,
    renderCell: (params) => (
      <div>
        <a href={params.row.url} target="_blank" rel="noopener noreferrer">
          {formatUrl(params.row.url) + " "}
          <span className="text-[#AC9DF8]">{params.row.title + " "}</span>{" "}
          <span className="text-[#D898D8]">{params.row.snippet}</span>{" "}
        </a>
      </div>
    ),
  },
];

function formatUrl(url) {
  const urlObj = new URL(url);
  let hostname = urlObj.hostname;
  hostname = hostname.replace(/^www\./, "");
  let parts = hostname.split(".");
  parts.pop();
  hostname = parts.join(".");
  let path = urlObj.pathname;
  path = path.replace(/\/$/, ""); // Remove trailing slash
  path = path.replace(/\.html$/, ""); // Remove '.html'
  return `${hostname}${path}`;
}
