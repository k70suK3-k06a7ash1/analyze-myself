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
    contributionsCollection {
      contributionCalendar {
        totalContributions
       
        months {
          firstDay
          totalWeeks
        }
      }
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalRepositoryContributions
      totalRepositoriesWithContributedCommits
      totalRepositoriesWithContributedIssues
      totalRepositoriesWithContributedPullRequests
      totalRepositoriesWithContributedPullRequestReviews
    }
  }
}
  `;

  try {
    const data = await client.request(query);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();