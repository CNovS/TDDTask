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
        expect(scoreboard).toMatchObject(expectedScoreboard)
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
        expect(scoreboard).toMatchObject([updatedMatch])
    });

    it('should not update the score of the match if no valid scores are passed', () => {
        const updatedMatch = { homeTeam: 'Team A', homeTeamScore: -1, awayTeam: 'Team B', awayTeamScore: 3 };
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toMatchObject(expectedScoreboard)
    });

    it('should not update the score of the match if no match is found with the given teams', () => {
        const updatedMatch = { homeTeam: 'X', homeTeamScore: 1, awayTeam: 'Team B', awayTeamScore: 2 };
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toMatchObject(expectedScoreboard)
    });

    //Finish
    it('should remove the finished match from the scoreboard', () => {
        component.startMatch('Team A', 'Team B');  
        component.finishMatch('Team A', 'Team B');
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(0);
        expect(scoreboard).toEqual([])
    });

    it('should not remove any match if given one is not in the scoreboard', () => {
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.finishMatch('Team X', 'Team B');
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toMatchObject(expectedScoreboard);
    });

    it('should not remove any match if the given match names are not valid', () => {
        const expectedScoreboard = [{ homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 }]
        component.startMatch('Team A', 'Team B');  
        component.finishMatch('', 'Team B');
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toHaveLength(1);
        expect(scoreboard).toMatchObject(expectedScoreboard);
    });

    //Summary
    it('should return the summary with the finished match', () => {
        component.startMatch('Team A', 'Team B'); 
        const updatedMatch = { homeTeam: 'Team A', homeTeamScore: 2, awayTeam: 'Team B', awayTeamScore: 3 };
        component.updateMatchScore(updatedMatch);
        const scoreboard = component.getScoreboard();
        component.finishMatch('Team A', 'Team B');
        const summary = component.getSummary();
        expect(summary).toHaveLength(1);
        expect(summary).toMatchObject([updatedMatch]);
    });

    it('should return the summary with the finished matches ordered by their total score', () => {
        const updatedMatch = { homeTeam: 'Team C', homeTeamScore: 2, awayTeam: 'Team D', awayTeamScore: 3 };
        const nonUpdatedMatch = { homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 };
        component.startMatch('Team A', 'Team B');
        component.startMatch('Team C', 'Team D');
        component.updateMatchScore(updatedMatch);
        component.finishMatch('Team A', 'Team B');
        component.finishMatch('Team C', 'Team D');
        const summary = component.getSummary();
        expect(summary).toHaveLength(2);
        expect(summary[0]).toMatchObject(updatedMatch);
        expect(summary[1]).toMatchObject(nonUpdatedMatch);
    });

    it('should return all matches with the same total score, ordered by the most recently started one', () => {
        const updatedMatch = { homeTeam: 'Team C', homeTeamScore: 2, awayTeam: 'Team D', awayTeamScore: 3 };
        const nonUpdatedFirstMatch = { homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 };
        const nonUpdatedLastMatch = { homeTeam: 'Team E', homeTeamScore: 0, awayTeam: 'Team F', awayTeamScore: 0 };
        component.startMatch('Team A', 'Team B');
        component.startMatch('Team C', 'Team D');
        component.startMatch('Team E', 'Team F');
        component.finishMatch('Team E', 'Team F');
        component.updateMatchScore(updatedMatch);
        component.finishMatch('Team C', 'Team D');
        component.finishMatch('Team A', 'Team B');

        const summary = component.getSummary();
        expect(summary).toHaveLength(3);
        expect(summary[0]).toMatchObject(updatedMatch);
        expect(summary[1]).toMatchObject(nonUpdatedFirstMatch);
        expect(summary[2]).toMatchObject(nonUpdatedLastMatch);
    });
    
    it('should return empty summary if no matches are finished', () => {
        component.startMatch('Team A', 'Team B');
        const summary = component.getSummary();
        expect(summary).toHaveLength(0);
        expect(summary).toEqual([]);
    });

    it('should return empty summary if the match to finish does not exist', () => {
        component.startMatch('Team A', 'Team B');
        component.finishMatch('Team X', 'Team B');
        const summary = component.getSummary();
        expect(summary).toHaveLength(0);
        expect(summary).toEqual([]);
    });
});