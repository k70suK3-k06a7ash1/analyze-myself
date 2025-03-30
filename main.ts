import { GraphQLClient, gql } from "npm:graphql-request";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_API_TOKEN = Deno.env.get("PAT");
console.log({GITHUB_API_TOKEN})

const client = new GraphQLClient(GITHUB_API_URL, {
  headers: {
    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
  },
});

async function main() {
  const query = gql`
query {
  viewer {
    contributionsCollection{
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
    const data = await client.request(query);
    console.log(data.viewer.contributionsCollection.contributionCalendar.weeks);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();