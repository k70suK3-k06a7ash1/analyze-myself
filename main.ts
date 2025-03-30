import { Client, gql,cacheExchange, fetchExchange  } from "npm:urql";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_API_TOKEN = Deno.env.get("PAT");

const client =new  Client({
  url: GITHUB_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${GITHUB_API_TOKEN}`,
    },
  },
});

async function main() {
  const query = gql`
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result = await client.query(query, {});

    if (result.error) {
      console.error("Error fetching data:", result.error);
      return;
    }

    const commitPerDay = result.data.viewer.contributionsCollection.contributionCalendar.weeks.flatMap(e => e.contributionDays.map(e => [e.contributionCount, e.date]));

    console.log({ commitPerDay });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

main();