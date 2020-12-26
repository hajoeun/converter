const filenames = Deno.args;

for (const filename of filenames) {
  const text = await Deno.readTextFile(filename);

  const result = converter(text);
  await Deno.writeTextFile(filename.replace(".csv", ".json"), result);
}

function converter(csvText) {
  const [cColumns, ...cRows] = csvText.trim(/\s/g).split("\n");
  const columns = cColumns.split(",");
  const rows = cRows.map((row) => row.split(","));
  const json = rows.map((values) => (
    values.reduce((res, v, i) => {
      res[columns[i]] = v;
      return res;
    }, {})
  ));

  return JSON.stringify(json, null, "  ");
}
