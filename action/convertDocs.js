import fetch from "node-fetch";

import fs from "fs";

import dateFns from "date-fns";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import sleep from "./sleep.js";

export default async function convertDocs(
  OWNER,
  REPO,
  TOKEN,
  BACKEND_URL,
  BACKEND_ACCESS_TOKEN
) {
  const docsDir = "docs-data";
  await fs.promises.mkdir(docsDir, { recursive: true });

  const pathsData = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/master?recursive=1`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.tree)
    .catch((error) => {
      console.log(error);
    });

  for (const filePath of pathsData) {
    if (
      filePath.path.startsWith("docs/") &&
      filePath.path.endsWith("README.md") &&
      filePath.path !== "docs/README.md" &&
      !filePath.path.endsWith(".png") &&
      !filePath.path.endsWith(".jpg") &&
      !filePath.path.endsWith(".jpeg") &&
      !filePath.path.endsWith(".gif") &&
      !filePath.path.endsWith(".svg")
    ) {
      await console.log(filePath.path);
      let path = filePath.path.replace("docs/", "");
      let jsonFileName = path.split("/")[0];

      let readmeText = await fetch(
        `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/${filePath.path}`,

        {
          method: "GET",
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        }
      )
        .then((res) => res.text())
        .catch((error) => console.log(error));

      let matterResult = matter(readmeText);
      let processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      let contentHtml = processedContent.toString();

      const packages = [];
      var js = "";
      var ts = "";
      var py = "";
      var sh = "";
      for (let item of matterResult.data.package) {
        packages.push({
          title: item,
        });
        if (item === "npm") {
          js = await fetch(
            `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/${filePath.path.replace(
              "README.md",
              "test.js"
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${TOKEN}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          ts = await fetch(
            `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/${filePath.path.replace(
              "README.md",
              "test.ts"
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${TOKEN}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));
        }
        if (item === "pip") {
          py = await fetch(
            `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/${filePath.path.replace(
              "README.md",
              "test.py"
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${TOKEN}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          sh = await fetch(
            `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/${filePath.path.replace(
              "README.md",
              "test.sh"
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${TOKEN}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));
        }

        const categories = [];
        for (let item of matterResult.data.category) {
          categories.push({
            title: item,
          });
        }

        // last updated (later)
        let last_updated = dateFns.format(new Date(), "yyyy-MM-dd");
        // contributors (later)
        // let contributors = [
        //   {
        //     username: "johndoe",
        //   },
        // ];

        let contributors = [];
        // get contributors from docs folder
        let contributors_data_docs = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath.path.replace(
            "README.md",
            ""
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${TOKEN}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => res.map((commit) => commit.author.login))
          .catch((error) => {
            console.log(error);
          });
        // remove duplicate contributors
        contributors_data_docs = [...new Set(contributors_data_docs)];
        for (let contributor of contributors_data_docs) {
          if (!contributors.includes(contributor)) {
            contributors.push(contributor);
          }
        }

        // get contributors from npm folder
        let contributors_data_npm = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath.path
            .replace("README.md", "")
            .replace("docs", "npm/src")}`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${TOKEN}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => res.map((commit) => commit.author.login))
          .catch((error) => {
            console.log(error);
          });

        // remove duplicate contributors
        contributors_data_npm = [...new Set(contributors_data_npm)];
        for (let contributor of contributors_data_docs) {
          if (!contributors.includes(contributor)) {
            contributors.push(contributor);
          }
        }

        // get contributors from pip folder
        let contributors_data_pip = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath.path
            .replace("/README.md", "")
            .replace("docs", "pip/codinasion_tools")
            .replace("-", "_")}.py`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${TOKEN}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => res.map((commit) => commit.author.login))
          .catch((error) => {
            console.log(error);
          });

        // remove duplicate contributors
        contributors_data_pip = [...new Set(contributors_data_pip)];
        for (let contributor of contributors_data_docs) {
          if (!contributors.includes(contributor)) {
            contributors.push(contributor);
          }
        }

        // remove duplicate contributors
        let all_contributors = [];
        for (let contributor of contributors) {
          if (!all_contributors.includes({ username: contributor })) {
            all_contributors.push({ username: contributor });
          }
        }

        let data = {
          package: packages,
          title: matterResult.data.title
            ? matterResult.data.title
            : jsonFileName,
          description: matterResult.data.description
            ? matterResult.data.description
            : "",
          slug: matterResult.data.slug ? matterResult.data.slug : jsonFileName,
          function: matterResult.data.function
            ? matterResult.data.function
            : "",
          category: categories,
          contentHtml,
          markdown: matterResult.content,
          js: js,
          ts: ts,
          py: py,
          sh: sh,
          contributors: all_contributors,
          last_updated: last_updated,
        };

        await fs.promises.writeFile(
          `${docsDir}/${jsonFileName}.json`,
          JSON.stringify(data, null, 2)
        );

        await console.log(`Created ${jsonFileName}.json`);

        await console.log("Sending tool data to backend...");
        await fetch(`${BACKEND_URL}/tools-data/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${BACKEND_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .catch((error) => console.log(error));

        // sleep for 5 seconds to avoid github api rate limit
        await sleep(5000);
      }
    }
  }
}
