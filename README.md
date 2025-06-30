# TDDTask

## REQUIREMENTS
- Start a new match, assuming initial score 0 - 0 and addit it the scoreboard. 
    This should capture following parameters:
        - Home team
        - Away team
- Update score. This should receive a pair of absolute scores home team score and away team score
- Finish match currently in progress. This removes a match from the scoreboard
- Get a summary of matches in progress ordered by their total score. The matches with the same total score will be returned ordered by the most recently started match in the scoreboard.

### NOTES
- I am using the home and away teams for filtering because a team should not be playing more than one unfinished match
- I decided not to include an ID because the exercise focused on building a simple library using TDD, though it could be useful for storing data in a database or distinguishing between multiple matches with the same score that started at the same time
- I decided to return the full array because I was not sure if parsing it into a string (`${homeTeam} ${homeTeamScore} - ${awayTeam} ${awayTeamScore}`) was required as part of the exercise, and this formatting could also be done in the component handling the UI
- I was unsure whether I should throw errors (e.g., missing team name, invalid score, not found team...) due to the simple nature of the exercise, so I ended up not including them throw errors (e.g., missing team name, invalid score, team not found) due to the simple nature of the exercise, so I ended up not including them.