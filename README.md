# TDDTask

## REQUIREMENTS
- Start a new match, assuming initial score 0 - 0 and addit it the scoreboard. 
    This should capture following parameters:
        - Home team
        - Away team
- Update score. This should receive a pair of absolute scores home team score and away team score
- Finish match currently in progress. This removes a match from the scoreboard
- Get a summary of matches in progress ordered by their total score. The matches with the same total score will be returned ordered by the most recently started match in the scoreboard.

Home team X - Away team Y

### NOTES
- I am using the home and away team for filtering because a team should not be playing more than one non-finished match