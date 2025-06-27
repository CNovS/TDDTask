import { Scoreboard} from './index';
describe('TDD task', () => {
    let component: Scoreboard;

    beforeEach(() => {
    component = new Scoreboard();
    });

    it('should exist scoreboard as empty array if no matches are started', () => {
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toEqual([]);
    });
    
    //Start
    it('should start in the scoreboard with 0 - 0 as score', () => {
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');    
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toEqual(expectedScoreboard)
    });

    it('should return an empty scoreboard if any team has an empty value when starting a match', () => {  
        component.startMatch('', 'Team B');    
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(0);
        expect(scoreboard).toEqual([]);
    });

    //Update
    it('should update the score of the match with the given score values', () => {  
        //TODO: Refactor
        component.startMatch('Team A', 'Team B');  
        const updatedMatch = { homeTeam: 'Team A', homeTeamScore: 2, awayTeam: 'Team B', awayTeamScore: 3 };
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toEqual([updatedMatch])
    });

    it('should not update the score of the match if no valid scores are passed', () => {
        const updatedMatch = { homeTeam: 'Team A', homeTeamScore: -1, awayTeam: 'Team B', awayTeamScore: 3 };
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toEqual(expectedScoreboard)
    });

    it('should not update the score of the match if no match is found with the given teams', () => {
        const updatedMatch = { homeTeam: 'X', homeTeamScore: 1, awayTeam: 'Team B', awayTeamScore: 2 };
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toEqual(expectedScoreboard)
    });

    //Finish
    it('should remove the finished match from the scoreboard', () => {
        component.startMatch('Team A', 'Team B');  
        component.finishMatch('Team A', 'Team B');
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(0);
        expect(scoreboard).toEqual([])

    });
    
    //Summary
    it.todo('should return the summary with the finished matches ordered by their total score');
    it.todo('should return all matches with the same total score, ordered by the most recently started one');
    it.todo('should return empty summary if no matches are finished');
    it.todo('should return empty summary if the match to finish does not exist');
});