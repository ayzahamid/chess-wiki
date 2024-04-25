# Chess Wikipedia

Chess Wikipedia is wiki of Chess Grandmasters as defined by Chess.com.

## Installation

Node Version v18.16.1

```bash
run npm install
```

## Shortcomings

- Currently, the API returns all data at once, which can lead to performance issues when dealing with a large amount of data. Pagination is not implemented, requiring the retrieval of all data in bulk. It is recommended to implement pagination to optimize response time by fetching minimal data as needed.
